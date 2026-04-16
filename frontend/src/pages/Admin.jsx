import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const TABS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'finance', label: 'Finance' },
  { id: 'menu', label: 'Menu' },
  { id: 'orders', label: 'Commandes' },
  { id: 'clients', label: 'Clients' },
  { id: 'hours', label: 'Horaires' }
];

const Admin = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [financeReport, setFinanceReport] = useState({ totalRevenue: 0, totalExpenses: 0, profit: 0, entries: [] });
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [openingHours, setOpeningHours] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({ name: '', category: 'Plat du jour', description: '', price: 0, image: '' });
  const [financeForm, setFinanceForm] = useState({ title: '', amount: 0, type: 'revenue', category: 'Général', note: '', date: '' });
  const [isLoading, setIsLoading] = useState(false);

  const fetchAdminData = async () => {
    setIsLoading(true);
    try {
      const [statsRes, financeRes, clientsRes, productsRes, ordersRes, openingHoursRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/finance'),
        api.get('/admin/clients'),
        api.get('/admin/products'),
        api.get('/orders/admin'),
        api.get('/admin/opening-hours')
      ]);
      setStats(statsRes.data);
      setFinanceReport({
        totalRevenue: financeRes.data.totalRevenue || 0,
        totalExpenses: financeRes.data.totalExpenses || 0,
        profit: financeRes.data.profit || 0,
        entries: financeRes.data.entries || [],
        categoryBreakdown: financeRes.data.categoryBreakdown || {}
      });
      setClients(clientsRes.data);
      setProducts(productsRes.data);
      setOrders(ordersRes.data);
      setOpeningHours(openingHoursRes.data);
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Impossible de charger les données administrateur.';
      console.error('Admin load error:', err);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('/auth');
      return;
    }
    if (!user.isAdmin) {
      navigate('/');
      return;
    }
    fetchAdminData();
  }, [user, authLoading, navigate]);

  const resetForm = () => {
    setEditingProduct(null);
    setProductForm({ name: '', category: 'Plat du jour', description: '', price: 0, image: '' });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setProductForm((current) => ({ ...current, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleProductSave = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        const response = await api.put(`/admin/products/${editingProduct._id}`, productForm);
        setProducts((current) => current.map((item) => (item._id === response.data._id ? response.data : item)));
        setMessage('Produit modifié avec succès.');
      } else {
        const response = await api.post('/admin/products', productForm);
        setProducts((current) => [response.data, ...current]);
        setMessage('Nouveau produit ajouté.');
      }
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l’enregistrement du produit.');
    }
  };

  const handleProductEdit = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      image: product.image
    });
    setActiveTab('menu');
  };

  const handleProductDelete = async (productId) => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce produit ?')) return;
    try {
      await api.delete(`/admin/products/${productId}`);
      setProducts((current) => current.filter((item) => item._id !== productId));
      setMessage('Produit supprimé.');
    } catch (err) {
      setError('Impossible de supprimer le produit.');
    }
  };

  const handleFinanceSave = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/admin/finance', financeForm);
      setFinanceReport((current) => ({
        ...current,
        entries: [response.data, ...current.entries],
        totalRevenue: current.totalRevenue + (response.data.type === 'revenue' ? response.data.amount : 0),
        totalExpenses: current.totalExpenses + (response.data.type === 'expense' ? response.data.amount : 0),
        profit: current.profit + (response.data.type === 'revenue' ? response.data.amount : -response.data.amount),
        categoryBreakdown: {
          ...current.categoryBreakdown,
          [response.data.category || 'Général']: {
            revenue: (current.categoryBreakdown?.[response.data.category]?.revenue || 0) + (response.data.type === 'revenue' ? response.data.amount : 0),
            expense: (current.categoryBreakdown?.[response.data.category]?.expense || 0) + (response.data.type === 'expense' ? response.data.amount : 0)
          }
        }
      }));
      setMessage('Entrée financière ajoutée.');
      setFinanceForm({ title: '', amount: 0, type: 'revenue', date: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l’ajout financier.');
    }
  };

  const handleFinanceDelete = async (entryId) => {
    if (!window.confirm('Supprimer cette entrée financière ?')) return;
    try {
      await api.delete(`/admin/finance/${entryId}`);
      setFinanceReport((current) => {
        const entry = current.entries.find((item) => item._id === entryId);
        if (!entry) return current;
        const updatedEntries = current.entries.filter((item) => item._id !== entryId);
        const category = entry.category || 'Général';
        const categoryData = current.categoryBreakdown?.[category] || { revenue: 0, expense: 0 };
        const updatedCategoryBreakdown = {
          ...current.categoryBreakdown,
          [category]: {
            revenue: categoryData.revenue - (entry.type === 'revenue' ? entry.amount : 0),
            expense: categoryData.expense - (entry.type === 'expense' ? entry.amount : 0)
          }
        };
        if (updatedCategoryBreakdown[category].revenue === 0 && updatedCategoryBreakdown[category].expense === 0) {
          delete updatedCategoryBreakdown[category];
        }
        return {
          ...current,
          entries: updatedEntries,
          totalRevenue: current.totalRevenue - (entry.type === 'revenue' ? entry.amount : 0),
          totalExpenses: current.totalExpenses - (entry.type === 'expense' ? entry.amount : 0),
          profit: current.profit - (entry.type === 'revenue' ? entry.amount : -entry.amount),
          categoryBreakdown: updatedCategoryBreakdown
        };
      });
      setMessage('Entrée financière supprimée.');
    } catch (err) {
      setError('Impossible de supprimer l’entrée.');
    }
  };

  const handleOrderUpdate = async (orderId, status) => {
    try {
      const response = await api.put(`/orders/${orderId}`, { status });
      setOrders((current) => current.map((item) => (item._id === response.data._id ? response.data : item)));
      await fetchAdminData();
      setMessage('Statut de la commande mis à jour.');
    } catch (err) {
      setError('Impossible de mettre à jour la commande.');
    }
  };

  const handleOpeningHourChange = (index, field, value) => {
    setOpeningHours((current) => current.map((item, i) => {
      if (i !== index) return item;
      return { ...item, [field]: field === 'closed' ? value : value };
    }));
  };

  const handleOpeningHoursSave = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put('/admin/opening-hours', { hours: openingHours });
      setOpeningHours(response.data);
      setMessage('Horaires d’ouverture enregistrés.');
    } catch (err) {
      setError(err.response?.data?.message || 'Impossible d’enregistrer les horaires.');
    }
  };

  const statusData = useMemo(() => {
    const pending = stats?.pending || 0;
    const confirmed = stats?.confirmed || 0;
    const delivered = stats?.delivered || 0;
    const total = pending + confirmed + delivered || 1;
    return [
      { label: 'En attente', count: pending, color: 'from-sadaOrange to-sadaRed' },
      { label: 'Confirmées', count: confirmed, color: 'from-sadaGreen to-sadaYellow' },
      { label: 'Livrées', count: delivered, color: 'from-slate-700 to-slate-900' }
    ].map((item) => ({
      ...item,
      width: `${Math.round((item.count / total) * 100)}%`
    }));
  }, [stats]);

  const monthlyRevenueData = useMemo(() => {
    if (!stats?.monthly) return [];
    return Object.entries(stats.monthly).slice(-6).map(([month, value]) => ({ month, value }));
  }, [stats]);

  const sortedOrders = useMemo(
    () => [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [orders]
  );

  if (!user?.isAdmin) {
    return (
      <section className="mx-auto max-w-4xl px-4 pt-10 sm:px-6">
        <div className="rounded-[2rem] bg-white p-10 shadow-sm dark:bg-slate-900 dark:border dark:border-slate-800">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Espace administrateur</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300">Vous devez être connecté en tant qu’administrateur pour accéder à ce tableau de bord.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 text-slate-900 dark:text-slate-100">
      <div className="mb-8 rounded-[2rem] bg-slate-900 p-10 text-white shadow-2xl dark:bg-slate-950">
        <h2 className="text-3xl font-bold">Espace administrateur</h2>
        <p className="mt-3 text-slate-200">Gérez le menu, suivez les commandes en direct et contrôlez les finances de SADA TRAITEUR.</p>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-full px-5 py-3 text-sm font-semibold transition ${activeTab === tab.id ? 'bg-sadaOrange text-white' : 'bg-white text-slate-700 shadow-sm hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {message && <div className="mb-6 rounded-3xl bg-sadaGreen/10 p-4 text-slate-900 dark:bg-slate-800 dark:text-slate-100">{message}</div>}
      {error && <div className="mb-6 rounded-3xl bg-sadaRed/10 p-4 text-slate-900 dark:bg-slate-800 dark:text-slate-100">{error}</div>}
      {isLoading && (
        <div className="mb-6 rounded-3xl bg-slate-100 p-4 text-slate-700 dark:bg-slate-800 dark:text-slate-100">Chargement des données administrateur…</div>
      )}

      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-4">
            <div className="rounded-3xl bg-gradient-to-br from-sadaOrange via-sadaYellow to-white p-6 shadow-xl dark:from-slate-800 dark:to-slate-900 dark:border dark:border-slate-700">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-700 dark:text-slate-300">Commandes</p>
              <p className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">{stats?.totalOrders ?? '-'}</p>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-sadaRed via-sadaOrange to-white p-6 shadow-xl dark:from-slate-800 dark:to-slate-900 dark:border dark:border-slate-700">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-700 dark:text-slate-300">Revenus</p>
              <p className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">{financeReport?.totalRevenue?.toFixed(2) ?? '-'} FCFA</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900 dark:border dark:border-slate-800">
              <p className="text-sm uppercase tracking-[0.24em] text-sadaRed">Clients</p>
              <p className="mt-3 text-4xl font-bold">{stats?.clients ?? '-'}</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900 dark:border dark:border-slate-800">
              <p className="text-sm uppercase tracking-[0.24em] text-sadaRed">Produits</p>
              <p className="mt-3 text-4xl font-bold">{stats?.products ?? '-'}</p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] bg-white p-8 shadow-xl dark:bg-slate-900 dark:border dark:border-slate-700">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Répartition des commandes</h3>
              <div className="mt-6 space-y-4">
                {statusData.map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                      <span>{item.label}</span>
                      <span>{item.count}</span>
                    </div>
                    <div className="h-4 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <div className={`h-full rounded-full bg-gradient-to-r ${item.color}`} style={{ width: item.width }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] bg-white p-8 shadow-xl dark:bg-slate-900 dark:border dark:border-slate-700">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Revenus mensuels</h3>
              <div className="mt-6 space-y-4">
                {monthlyRevenueData.length === 0 ? (
                  <p className="text-sm text-slate-500 dark:text-slate-400">Aucun historique mensuel disponible.</p>
                ) : (
                  monthlyRevenueData.map((item) => (
                    <div key={item.month} className="space-y-2">
                      <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                        <span>{item.month}</span>
                        <span>{item.value.toLocaleString('fr-FR')} FCFA</span>
                      </div>
                      <div className="h-4 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                        <div className="h-full rounded-full bg-sadaGreen" style={{ width: `${Math.min(100, Math.round((item.value / (Math.max(...monthlyRevenueData.map((row) => row.value)) || 1)) * 100))}%` }} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">

            <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900 dark:border dark:border-slate-800">
              <p className="text-sm uppercase tracking-[0.24em] text-sadaRed">En attente</p>
              <p className="mt-3 text-3xl font-semibold">{stats?.pending ?? '-'}</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900 dark:border dark:border-slate-800">
              <p className="text-sm uppercase tracking-[0.24em] text-sadaRed">Confirmées</p>
              <p className="mt-3 text-3xl font-semibold">{stats?.confirmed ?? '-'}</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900 dark:border dark:border-slate-800">
              <p className="text-sm uppercase tracking-[0.24em] text-sadaRed">Livrées</p>
              <p className="mt-3 text-3xl font-semibold">{stats?.delivered ?? '-'}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'hours' && (
        <div className="space-y-6">
          <div className="rounded-[2rem] bg-white p-8 shadow-sm dark:bg-slate-900 dark:border dark:border-slate-800">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Horaires d’ouverture</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Modifiez les heures d’ouverture et fermez les jours de repos directement depuis le tableau de bord.</p>
            <form onSubmit={handleOpeningHoursSave} className="mt-6 space-y-4">
              {openingHours.map((item, index) => (
                <div key={item.day} className="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950 sm:grid-cols-[1fr_1.2fr_1.2fr_0.9fr] items-center">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{item.day}</p>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Ouverture</label>
                    <input type="time" value={item.open} onChange={(e) => handleOpeningHourChange(index, 'open', e.target.value)} disabled={item.closed} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-sadaOrange dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Fermeture</label>
                    <input type="time" value={item.close} onChange={(e) => handleOpeningHourChange(index, 'close', e.target.value)} disabled={item.closed} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-sadaOrange dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
                  </div>
                  <div className="flex items-center gap-3">
                    <input id={`closed-${index}`} type="checkbox" checked={item.closed} onChange={(e) => handleOpeningHourChange(index, 'closed', e.target.checked)} className="h-5 w-5 rounded border-slate-300 text-sadaRed focus:ring-sadaRed" />
                    <label htmlFor={`closed-${index}`} className="text-sm text-slate-700 dark:text-slate-300">Fermé</label>
                  </div>
                </div>
              ))}
              <button type="submit" className="rounded-full bg-sadaOrange px-6 py-3 text-sm font-semibold text-white transition hover:bg-sadaRed">Enregistrer les horaires</button>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'menu' && (
        <div className="grid gap-8 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm dark:bg-slate-900 dark:border dark:border-slate-800">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Liste des plats</h3>
              <div className="mt-4 space-y-4">
                {products.map((product) => (
                  <div key={product._id} className="rounded-3xl border border-slate-200 p-4 shadow-sm transition hover:border-sadaOrange dark:border-slate-700 dark:bg-slate-950">
                    <div className="grid gap-4 sm:grid-cols-[110px_1fr] sm:items-center">
                      <div className="overflow-hidden rounded-3xl bg-slate-50">
                        <img src={product.image} alt={product.name} className="h-28 w-full object-cover" />
                      </div>
                      <div className="flex flex-col gap-4">
                        <div>
                          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{product.name}</p>
                          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{product.category}</p>
                          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{product.description}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-700 dark:bg-slate-800 dark:text-slate-200">{product.available ? 'En stock' : 'Indisponible'}</span>
                          <span className="rounded-full bg-sadaYellow/20 px-3 py-1 text-xs font-semibold text-sadaRed">{product.price.toLocaleString('fr-FR')} FCFA</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button onClick={() => handleProductEdit(product)} className="rounded-full bg-sadaOrange px-4 py-2 text-sm text-white transition hover:bg-sadaRed">Modifier</button>
                          <button onClick={() => handleProductDelete(product._id)} className="rounded-full bg-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">Supprimer</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] bg-white p-6 shadow-sm dark:bg-slate-900 dark:border dark:border-slate-800">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{editingProduct ? 'Modifier un plat' : 'Ajouter un plat'}</h3>
              <form onSubmit={handleProductSave} className="mt-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Nom</label>
                  <input value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} required className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sadaOrange dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Catégorie</label>
                  <select value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sadaOrange dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100">
                    <option>Plat du jour</option>
                    <option>Plat du soir</option>
                    <option>Spécialités</option>
                    <option>Jus locaux</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
                  <textarea value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} required className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sadaOrange dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" rows="4" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Prix (FCFA)</label>
                    <input value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })} type="number" min="0" step="0.01" required className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sadaOrange dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Image depuis votre PC</label>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none file:mr-4 file:rounded-full file:border-0 file:bg-sadaOrange file:px-4 file:py-2 file:text-sm file:text-white focus:border-sadaOrange dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Vous pouvez aussi coller une URL si vous ne souhaitez pas télécharger un fichier.</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Image URL</label>
                  <input value={productForm.image} onChange={(e) => setProductForm({ ...productForm, image: e.target.value })} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sadaOrange dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
                </div>
                {productForm.image && (
                  <div className="rounded-3xl border border-slate-200 p-3 dark:border-slate-700">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Aperçu de l’image</p>
                    <img src={productForm.image} alt="Aperçu produit" className="mt-3 h-48 w-full rounded-3xl object-cover" />
                  </div>
                )}
                <div className="rounded-[2rem] bg-slate-50 p-4 dark:bg-slate-950">
                  <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">Astuce</h4>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Utilisez le téléchargement pour choisir une image depuis votre PC ou collez un lien si l’image est déjà en ligne.</p>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button type="submit" className="rounded-full bg-sadaGreen px-6 py-3 text-sm font-semibold text-white transition hover:bg-sadaRed">{editingProduct ? 'Enregistrer' : 'Ajouter'}</button>
                  <button type="button" onClick={resetForm} className="rounded-full border border-slate-300 px-6 py-3 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">Annuler</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'finance' && (
        <div className="grid gap-8 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm dark:bg-slate-900 dark:border dark:border-slate-800">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Vue financière</h3>
              <div className="mt-6 grid gap-6 md:grid-cols-3">
                <div className="rounded-3xl bg-gradient-to-br from-sadaGreen via-sadaYellow to-white p-6 shadow-xl dark:from-slate-800 dark:to-slate-900 dark:border dark:border-slate-700">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-700 dark:text-slate-300">Recettes</p>
                  <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{financeReport.totalRevenue.toLocaleString('fr-FR')} FCFA</p>
                </div>
                <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-700 to-slate-800 p-6 shadow-xl dark:border dark:border-slate-700">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-200">Dépenses</p>
                  <p className="mt-3 text-3xl font-bold text-white">{financeReport.totalExpenses.toLocaleString('fr-FR')} FCFA</p>
                </div>
                <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900 dark:border dark:border-slate-800">
                  <p className="text-sm uppercase tracking-[0.24em] text-sadaRed">Profit</p>
                  <p className="mt-3 text-3xl font-bold">{financeReport.profit.toLocaleString('fr-FR')} FCFA</p>
                </div>
              </div>
              <div className="mt-6 rounded-3xl bg-slate-50 p-6 dark:bg-slate-950">
                <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">Évolution</h4>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900 dark:border dark:border-slate-800">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Total des flux</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{(financeReport.totalRevenue + financeReport.totalExpenses).toLocaleString('fr-FR')} FCFA</p>
                  </div>
                  <div className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900 dark:border dark:border-slate-800">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Nombre d’entrées</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{financeReport.entries.length}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900 dark:border dark:border-slate-800">
                <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">Résumé par catégorie</h4>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {Object.keys(financeReport.categoryBreakdown || {}).length === 0 ? (
                    <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-500 dark:bg-slate-950 dark:text-slate-400">Aucune catégorie enregistrée.</div>
                  ) : (
                    Object.entries(financeReport.categoryBreakdown).map(([category, values]) => (
                      <div key={category} className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{category}</p>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Recettes : {values.revenue.toLocaleString('fr-FR')} FCFA</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Dépenses : {values.expense.toLocaleString('fr-FR')} FCFA</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className="rounded-[2rem] bg-white p-6 shadow-sm dark:bg-slate-900 dark:border dark:border-slate-800">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Historique des flux</h3>
              <div className="mt-4 space-y-3">
                {financeReport.entries.length === 0 ? (
                  <p className="text-sm text-slate-500 dark:text-slate-400">Aucune entrée financière ajoutée pour le moment.</p>
                ) : (
                  financeReport.entries.map((entry) => (
                    <div key={entry._id} className="flex flex-col gap-2 rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-slate-100">{entry.title}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{new Date(entry.date).toLocaleDateString()}</p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${entry.type === 'revenue' ? 'bg-sadaGreen/20 text-sadaGreen' : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200'}`}>
                          {entry.type === 'revenue' ? 'Recette' : 'Dépense'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{entry.amount.toLocaleString('fr-FR')} FCFA</p>
                        <button onClick={() => handleFinanceDelete(entry._id)} className="rounded-full bg-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">Supprimer</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-sm dark:bg-slate-900 dark:border dark:border-slate-800">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Ajouter un flux</h3>
            <form onSubmit={handleFinanceSave} className="mt-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Titre</label>
                <input value={financeForm.title} onChange={(e) => setFinanceForm({ ...financeForm, title: e.target.value })} required className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sadaOrange dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Montant (FCFA)</label>
                  <input value={financeForm.amount} onChange={(e) => setFinanceForm({ ...financeForm, amount: Number(e.target.value) })} type="number" min="0" required className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sadaOrange dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Type</label>
                  <select value={financeForm.type} onChange={(e) => setFinanceForm({ ...financeForm, type: e.target.value })} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sadaOrange dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100">
                    <option value="revenue">Recette</option>
                    <option value="expense">Dépense</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Date</label>
                <input value={financeForm.date} onChange={(e) => setFinanceForm({ ...financeForm, date: e.target.value })} type="date" className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sadaOrange dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
              </div>
              <button type="submit" className="w-full rounded-full bg-sadaGreen px-6 py-3 text-sm font-semibold text-white transition hover:bg-sadaRed">Ajouter le flux</button>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="space-y-6">
          {sortedOrders.map((order) => (
            <div key={order._id} className="rounded-[2rem] bg-white p-6 shadow-sm dark:bg-slate-900 dark:border dark:border-slate-800">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Commande #{order._id.slice(-6)}</p>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{order.user?.name || 'Client'}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Total : {order.total.toLocaleString('fr-FR')} FCFA — Paiement : {order.paymentMethod}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">{order.status}</span>
                  <button onClick={() => handleOrderUpdate(order._id, order.status === 'pending' ? 'confirmed' : 'delivered')} className="rounded-full bg-sadaOrange px-4 py-2 text-sm text-white hover:bg-sadaRed">
                    {order.status === 'pending' ? 'Confirmer' : order.status === 'confirmed' ? 'Livrer' : 'Complété'}
                  </button>
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {order.items.map((item) => (
                  <div key={item.product} className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="h-16 w-16 rounded-3xl object-cover" />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">{item.name}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{item.quantity} × {item.price.toLocaleString('fr-FR')} FCFA</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'clients' && (
        <div className="grid gap-6 md:grid-cols-2">
          {clients.map((client) => (
            <div key={client._id} className="rounded-[2rem] bg-white p-6 shadow-sm dark:bg-slate-900 dark:border dark:border-slate-800">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{client.name}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{client.email}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{client.phone || 'Pas de téléphone'} • {client.address || 'Pas d’adresse'}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-500">Membre depuis {new Date(client.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Admin;

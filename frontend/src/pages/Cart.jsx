import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Cart = () => {
  const { items, total, removeProduct, updateProduct, clearCart } = useCart();
  const { user } = useAuth();
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const serviceCharge = 200;
  const totalWithService = total + serviceCharge;

  const handleOrder = async () => {
    if (!user) {
      setMessage('Veuillez vous connecter pour passer commande.');
      return;
    }
    if (items.length === 0) {
      setMessage('Votre panier est vide.');
      return;
    }
    try {
      await api.post('/orders', {
        items,
        subtotal: total,
        paymentMethod: 'Mobile Money'
      });
      clearCart();
      setMessage('Commande passée avec succès ! Vous pouvez suivre votre commande dans Suivi.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erreur lors de la commande.');
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 text-slate-950 dark:text-slate-100">
      <div className="rounded-[2rem] bg-slate-950/95 p-8 shadow-2xl ring-1 ring-slate-800 dark:bg-slate-900">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] bg-sadaSand p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-slate-950">Votre panier</h2>
              <p className="mt-3 text-sm text-slate-700">Finalisez votre commande sénégalaise avec mobile money ou choisissez la livraison. Vos plats préférés vous attendent.</p>
            </div>
            {items.length === 0 ? (
              <div className="rounded-[2rem] bg-white p-10 text-center shadow-lg">
                <p className="text-lg font-semibold text-slate-950">Panier vide</p>
                <p className="mt-3 text-sm text-slate-600">Ajoutez des plats depuis le menu pour lancer votre commande.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-lg sm:flex sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="h-24 w-24 rounded-[1.5rem] object-cover" />
                      <div>
                        <h3 className="text-xl font-semibold text-slate-950">{item.name}</h3>
                        <p className="mt-2 text-sm text-slate-600">{item.price.toLocaleString('fr-FR')} FCFA</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3 sm:mt-0">
                      <div className="flex items-center gap-3 rounded-full bg-slate-100 px-3 py-2">
                        <button onClick={() => updateProduct(item.product, Math.max(1, item.quantity - 1))} className="rounded-full bg-sadaTerre px-3 py-1 text-white">-</button>
                        <span className="w-10 text-center font-semibold text-slate-900">{item.quantity}</span>
                        <button onClick={() => updateProduct(item.product, item.quantity + 1)} className="rounded-full bg-sadaTerre px-3 py-1 text-white">+</button>
                      </div>
                      <button onClick={() => removeProduct(item.product)} className="rounded-full bg-sadaRed px-4 py-2 text-sm font-semibold text-white transition hover:bg-sadaTerre">Supprimer</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <aside className="space-y-6 rounded-[2rem] bg-sadaSand p-8 shadow-xl text-slate-950">
            <div className="rounded-[2rem] bg-white p-6 shadow-lg">
              <h3 className="text-2xl font-semibold">Résumé de la commande</h3>
              <div className="mt-6 space-y-4 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Total produits</span>
                  <span>{items.length} articles</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Montant panier</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Frais emporté</span>
                  <span>{serviceCharge.toFixed(2)} FCFA</span>
                </div>
                <div className="flex items-center justify-between text-lg font-semibold text-slate-950">
                  <span>Total final</span>
                  <span>{totalWithService.toFixed(2)} €</span>
                </div>
              </div>
            </div>
            <div className="rounded-[2rem] bg-white p-6 shadow-lg">
              <h3 className="text-2xl font-semibold">Préparation à emporter</h3>
              <div className="mt-5 space-y-4 text-sm text-slate-600">
                <div>
                  <label className="block text-sm font-medium text-slate-800">Téléphone WhatsApp</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+221 77 000 00 00" className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sadaOrange" />
                </div>
                <p className="text-sm text-slate-600">Votre commande sera prête à emporter. Présentez-vous au restaurant avec votre numéro de commande.</p>
              </div>
            </div>
            <button onClick={handleOrder} className="w-full rounded-full bg-sadaRed px-6 py-4 text-sm font-semibold text-white shadow-xl transition hover:bg-sadaTerre">
              Commander maintenant
            </button>
            {message && <p className="rounded-[2rem] bg-slate-950/10 p-4 text-sm text-slate-900">{message}</p>}
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Cart;

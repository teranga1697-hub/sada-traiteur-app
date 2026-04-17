import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const OrderStatus = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const response = await api.get('/orders');
        setOrders(response.data);
      } catch (err) {
        setError('Impossible de charger les commandes.');
      }
    };
    fetchOrders();
  }, [user]);

  const getProgress = (status) => {
    if (status === 'pending') return 33;
    if (status === 'confirmed') return 66;
    return 100;
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 text-slate-950 dark:text-slate-100">
      <div className="rounded-[2rem] bg-slate-950/95 p-10 shadow-2xl ring-1 ring-slate-800 dark:bg-slate-900">
        <div className="mb-8">
          <span className="inline-flex rounded-full bg-sadaYellow px-4 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-slate-950">Suivi</span>
          <h2 className="mt-4 text-4xl font-bold text-slate-100">Suivez votre commande en temps réel</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">Retrouvez l’état de chaque commande et soyez informé dès que votre plat est prêt.</p>
        </div>
        {user ? (
          orders.length === 0 ? (
            <div className="rounded-[2rem] bg-sadaSand p-10 text-slate-950 shadow-xl">
              <p className="text-lg font-semibold">Aucune commande pour le moment</p>
              <p className="mt-3 text-sm text-slate-600">Passez votre première commande via le menu pour commencer.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order._id} className="rounded-[2rem] bg-sadaSand p-6 shadow-xl">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.18em] text-slate-600">Commande #{order._id.slice(-6)}</p>
                      <h3 className="mt-2 text-2xl font-semibold text-slate-950">Statut : <span className="text-sadaRed">{order.status}</span></h3>
                    </div>
                    <div className="rounded-full bg-slate-950/90 px-4 py-2 text-sm font-semibold text-sadaYellow">Total : {order.total.toLocaleString('fr-FR')} FCFA</div>
                  </div>
                  <div className="mt-5 space-y-3 rounded-[1.5rem] bg-slate-100 p-4 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                    <p>Mode de paiement : <span className="font-semibold text-slate-950 dark:text-slate-100">{order.paymentMethod}</span></p>
                    {order.promoCode && <p>Code promo : <span className="font-semibold text-slate-950 dark:text-slate-100">{order.promoCode}</span></p>}
                    <p>Montant : <span className="font-semibold text-slate-950 dark:text-slate-100">{order.total.toLocaleString('fr-FR')} FCFA</span></p>
                    <p>Livraison : <span className="font-semibold text-slate-950 dark:text-slate-100">{order.deliveryZone}</span></p>
                  </div>
                  <div className="mt-5 h-4 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full rounded-full bg-gradient-to-r from-sadaOrange via-sadaRed to-sadaGreen" style={{ width: `${getProgress(order.status)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="rounded-[2rem] bg-sadaSand p-10 text-slate-950 shadow-xl">
            <p className="text-lg font-semibold">Connectez-vous pour voir votre historique</p>
            <p className="mt-3 text-sm text-slate-600">Vos commandes seront listées ici dès que vous serez connecté.</p>
          </div>
        )}
        {error && <p className="mt-4 rounded-[2rem] bg-sadaRed/10 p-4 text-sm text-slate-900">{error}</p>}
      </div>
    </section>
  );
};

export default OrderStatus;

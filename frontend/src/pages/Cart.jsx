import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Cart = () => {
  const { items, total, removeProduct, updateProduct, clearCart } = useCart();
  const { user } = useAuth();
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [orderType, setOrderType] = useState('pickup');
  const [deliveryZone, setDeliveryZone] = useState('Centre');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Wave');
  const [promoCode, setPromoCode] = useState('');
  const [promoRate, setPromoRate] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  const serviceCharge = 200;
  const deliveryFee = orderType === 'delivery' ? (deliveryZone === 'Banlieue' ? 500 : deliveryZone === 'Autre' ? 700 : 300) : 0;
  const discountAmount = total * promoRate;
  const totalWithService = total + serviceCharge + deliveryFee - discountAmount;

  const handleOrder = async () => {
    if (!user) {
      setMessage('Veuillez vous connecter pour passer commande.');
      return;
    }
    if (items.length === 0) {
      setMessage('Votre panier est vide.');
      return;
    }
    if (orderType === 'delivery' && deliveryAddress.trim().length === 0) {
      setMessage('Veuillez renseigner votre adresse de livraison.');
      return;
    }
    try {
      await api.post('/orders', {
        items,
        subtotal: total,
        paymentMethod,
        orderType,
        deliveryZone: orderType === 'delivery' ? deliveryZone : 'Aucun',
        deliveryAddress: orderType === 'delivery' ? deliveryAddress : 'Retrait / Emporté',
        promoCode: promoRate > 0 ? promoCode.trim().toUpperCase() : ''
      });
      clearCart();
      setMessage('Commande passée avec succès ! Vous pouvez suivre votre commande dans Suivi.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erreur lors de la commande.');
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 text-slate-950 dark:text-slate-100">
      <div className="rounded-[2rem] bg-rose-50/90 p-8 shadow-2xl ring-1 ring-rose-200">
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
                  <span>Frais de service</span>
                  <span>{serviceCharge.toFixed(2)} FCFA</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex items-center justify-between">
                    <span>Frais de livraison</span>
                    <span>{deliveryFee.toFixed(2)} FCFA</span>
                  </div>
                )}
                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-sadaGreen">
                    <span>Remise promo</span>
                    <span>-{discountAmount.toFixed(2)} €</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-lg font-semibold text-slate-950">
                  <span>Total final</span>
                  <span>{totalWithService.toFixed(2)} €</span>
                </div>
              </div>
            </div>
            <div className="rounded-[2rem] bg-white p-6 shadow-lg">
              <h3 className="text-2xl font-semibold">Paiement & promo</h3>
              <h3 className="text-2xl font-semibold">Livraison & retrait</h3>
              <div className="mt-5 space-y-4 text-sm text-slate-600">
                <div>
                  <p className="text-sm font-medium text-slate-800">Mode de paiement</p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {['Wave', 'Orange Money', 'Cash'].map((method) => (
                      <button
                        type="button"
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${paymentMethod === method ? 'bg-sadaOrange text-white' : 'bg-slate-100 text-slate-700'}`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-800">Code promo</label>
                  <div className="mt-2 flex gap-3">
                    <input
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="SADA10, WAVE5, ORANGE20"
                      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sadaOrange"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const code = promoCode.trim().toUpperCase();
                        const valid = { SADA10: 0.1, WAVE5: 0.05, ORANGE20: 0.2 };
                        if (!code) {
                          setPromoMessage('Veuillez entrer un code promo.');
                          setPromoRate(0);
                          return;
                        }
                        if (valid[code]) {
                          setPromoRate(valid[code]);
                          setPromoMessage(`Code appliqué : ${code} (-${valid[code] * 100}%)`);
                        } else {
                          setPromoRate(0);
                          setPromoMessage('Code promo invalide.');
                        }
                      }}
                      className="rounded-full bg-sadaRed px-4 py-3 text-sm font-semibold text-white transition hover:bg-sadaTerre"
                    >
                      Appliquer
                    </button>
                  </div>
                  {promoMessage && <p className="mt-2 text-sm text-slate-600">{promoMessage}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-800">Type de commande</label>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <button type="button" onClick={() => setOrderType('pickup')} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${orderType === 'pickup' ? 'bg-sadaOrange text-white' : 'bg-slate-100 text-slate-700'}`}>
                      Sur place
                    </button>
                    <button type="button" onClick={() => setOrderType('takeaway')} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${orderType === 'takeaway' ? 'bg-sadaOrange text-white' : 'bg-slate-100 text-slate-700'}`}>
                      À emporter
                    </button>
                    <button type="button" onClick={() => setOrderType('delivery')} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${orderType === 'delivery' ? 'bg-sadaOrange text-white' : 'bg-slate-100 text-slate-700'}`}>
                      Livraison
                    </button>
                  </div>
                </div>
                {orderType === 'delivery' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-800">Zone de livraison</label>
                      <select value={deliveryZone} onChange={(e) => setDeliveryZone(e.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sadaOrange">
                        <option value="Centre">Centre - 300 FCFA</option>
                        <option value="Banlieue">Banlieue - 500 FCFA</option>
                        <option value="Autre">Autre - 700 FCFA</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-800">Adresse de livraison</label>
                      <input value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} placeholder="Rue, quartier, numéro" className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sadaOrange" />
                    </div>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-slate-800">Téléphone WhatsApp</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+221 78 798 39 99" className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sadaOrange" />
                </div>
                <p className="text-sm text-slate-600">Paiement en ligne : Wave, Orange Money, ou paiement à la livraison selon votre choix.</p>
              </div>
            </div>
            <button onClick={handleOrder} className="w-full rounded-full bg-sadaRed px-6 py-4 text-sm font-semibold text-white shadow-xl transition hover:bg-sadaTerre">
              Commander maintenant
            </button>
            <a
              href={`https://wa.me/221787983999?text=${encodeURIComponent(
                `Bonjour, je souhaite commander : ${items
                  .map((item) => `${item.quantity} ${item.name}`)
                  .join(' + ')}${orderType === 'delivery' ? ` pour livraison à ${deliveryAddress}` : ''}`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Commander sur WhatsApp
            </a>
            {message && <p className="rounded-[2rem] bg-slate-950/10 p-4 text-sm text-slate-900">{message}</p>}
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Cart;

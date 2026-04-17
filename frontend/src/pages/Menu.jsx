import { useEffect, useMemo, useState } from 'react';
import api from '../services/api';
import MenuCard from '../components/MenuCard';
import Dish3D from '../components/Dish3D';

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [todayProducts, setTodayProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ productId: '', name: '', rating: 5, comment: '' });
  const [reviewMessage, setReviewMessage] = useState('');
  const [reviewError, setReviewError] = useState('');
  const [activeCategory, setActiveCategory] = useState('Plat du jour');

  useEffect(() => {
    const fetchData = async () => {
      const [productsRes, todayRes, reviewsRes] = await Promise.all([
        api.get('/products'),
        api.get('/products?today=true'),
        api.get('/reviews')
      ]);
      setProducts(productsRes.data);
      setTodayProducts(todayRes.data);
      setReviews(reviewsRes.data);
    };
    fetchData();
  }, []);

  const categories = useMemo(() => [...new Set(products.map((item) => item.category))], [products]);
  const displayed = useMemo(
    () => products.filter((item) => item.category === activeCategory),
    [products, activeCategory]
  );

  return (
    <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 text-slate-900 dark:text-slate-100">
      <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-sadaRed">Menu du restaurant</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950 dark:text-slate-100">Choisissez votre plat sénégalais</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                category === activeCategory ? 'bg-sadaOrange text-white' : 'bg-white text-slate-700 shadow-sm hover:bg-slate-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-8 rounded-[2rem] bg-slate-100 p-6 shadow-lg dark:bg-slate-900">
        <h3 className="text-xl font-semibold text-slate-950 dark:text-slate-100">Menu du jour</h3>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Les plats du jour sont automatiquement sélectionnés selon le jour de la semaine.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {todayProducts.length === 0 ? (
            <div className="rounded-3xl bg-white p-4 text-sm text-slate-700 dark:bg-slate-950 dark:text-slate-300">L’équipe prépare les plats du jour.</div>
          ) : (
            todayProducts.map((item) => (
              <div key={item._id} className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-950">
                <p className="font-semibold text-slate-900 dark:text-slate-100">{item.name}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
                <p className="mt-3 text-sm font-semibold text-sadaRed">{item.price.toLocaleString('fr-FR')} FCFA</p>
              </div>
            ))
          )}
        </div>
      </div>
      <Dish3D />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {displayed.map((product) => (
          <MenuCard key={product._id} product={product} />
        ))}
      </div>
      <div className="mt-12 rounded-[2rem] bg-white p-10 shadow-xl ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-100 dark:ring-slate-700">
        <h3 className="text-2xl font-semibold text-slate-950 dark:text-slate-100">Avis des clients</h3>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Laissez votre note et un commentaire sur l’un de nos plats.</p>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setReviewMessage('');
            setReviewError('');
            if (!reviewForm.productId || !reviewForm.name || !reviewForm.comment) {
              setReviewError('Veuillez remplir tous les champs pour laisser un avis.');
              return;
            }
            try {
              await api.post('/reviews', reviewForm);
              setReviewMessage('Merci ! Votre avis a bien été ajouté.');
              setReviewForm({ productId: '', name: '', rating: 5, comment: '' });
              const response = await api.get('/reviews');
              setReviews(response.data);
            } catch (err) {
              setReviewError(err.response?.data?.message || 'Impossible d’envoyer votre avis.');
            }
          }}
          className="mt-6 grid gap-4 lg:grid-cols-[0.95fr_0.9fr]"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Plat</label>
              <select
                value={reviewForm.productId}
                onChange={(e) => setReviewForm({ ...reviewForm, productId: e.target.value })}
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sadaOrange dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              >
                <option value="">Choisissez un plat</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Nom</label>
              <input
                value={reviewForm.name}
                onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sadaOrange dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Note</label>
              <select
                value={reviewForm.rating}
                onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sadaOrange dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              >
                {[5, 4, 3, 2, 1].map((value) => (
                  <option key={value} value={value}>
                    {value} étoiles
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Commentaire</label>
              <textarea
                value={reviewForm.comment}
                onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                rows="4"
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sadaOrange dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>
            <button type="submit" className="rounded-full bg-sadaGreen px-6 py-3 text-sm font-semibold text-white transition hover:bg-sadaJade">Envoyer mon avis</button>
            {reviewMessage && <p className="text-sm text-sadaGreen">{reviewMessage}</p>}
            {reviewError && <p className="text-sm text-sadaRed">{reviewError}</p>}
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Derniers avis</h4>
            {reviews.length === 0 ? (
              <p className="text-sm text-slate-600 dark:text-slate-400">Aucun avis pour l’instant. Soyez le premier à partager votre expérience.</p>
            ) : (
              <div className="space-y-4">
                {reviews.slice(0, 4).map((review) => (
                  <div key={review._id} className="rounded-3xl bg-slate-100 p-4 dark:bg-slate-950">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{review.name} · {review.rating} ⭐</p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{review.comment}</p>
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Plat: {review.product?.name || 'Inconnu'}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>
      </div>
      <div className="mt-12 rounded-[2rem] bg-sadaSand p-10 text-slate-950 shadow-xl ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-100 dark:ring-slate-700">
        <h3 className="text-2xl font-semibold">À la découverte de SADA</h3>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-700 dark:text-slate-400">
          Notre menu propose des recettes typiques : thieboudienne, yassa, mafé, poulet DG et des jus locaux comme le bissap, ditakh et bouille. Commandez en ligne, payez avec Mobile Money, et profitez d’une expérience culinaire authentique.
        </p>
      </div>
    </section>
  );
};

export default Menu;

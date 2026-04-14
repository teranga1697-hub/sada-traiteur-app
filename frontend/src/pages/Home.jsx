import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [openingHours, setOpeningHours] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [productsRes, hoursRes] = await Promise.all([
        api.get('/products'),
        api.get('/opening-hours')
      ]);
      setFeatured(productsRes.data.filter((item) => item.featured).slice(0, 3));
      setOpeningHours(hoursRes.data);
    };
    fetchData();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
      <div className="rounded-[2rem] bg-white/50 p-8 shadow-2xl backdrop-blur-xl dark:bg-slate-950/40 dark:ring-slate-700">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-sadaRed px-4 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-white">Cuisine du Sénégal</span>
            <h1 className="text-5xl font-black tracking-tight text-slate-950 sm:text-6xl dark:text-slate-100">SADA TRAITEUR</h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-700 dark:text-slate-300">Plongez dans les saveurs du Sénégal : thieboudienne, yassa, mafé et jus locaux préparés à partir d’ingrédients frais et d’épices maison.</p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/menu" className="rounded-full bg-sadaGreen px-7 py-4 text-sm font-semibold text-white shadow-xl transition hover:bg-sadaJade">
                Explorer le menu
              </Link>
              <Link to="/contact" className="rounded-full border border-sadaGreen px-7 py-4 text-sm font-semibold text-slate-950 transition hover:bg-sadaSand hover:text-slate-900 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800">
                Nous contacter
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[2rem] bg-sadaSand p-6 shadow-xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
                <p className="font-semibold text-slate-900 dark:text-slate-100">Authenticité sénégalaise</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Chaque plat est préparé avec soin selon des recettes familiales traditionnelles.</p>
              </div>
              <div className="rounded-[2rem] bg-sadaSand p-6 shadow-xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
                <p className="font-semibold text-slate-900 dark:text-slate-100">Ambiance chaleureuse</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Une expérience conviviale et gourmande, idéale pour partager un repas en famille.</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-[2rem] bg-slate-950/95 p-8 shadow-2xl text-white dark:bg-slate-900/95">
              <h2 className="text-xl font-semibold">Spécialités du jour</h2>
              <p className="mt-3 text-sm text-slate-200">Nos plats les plus populaires, sélectionnés avec soin pour une expérience gustative authentique.</p>
              <div className="mt-6 grid gap-4">
              {featured.length === 0 ? (
                <div className="rounded-3xl bg-slate-900/70 p-4 text-sm text-slate-200">Chargement des spécialités...</div>
              ) : (
                featured.map((product) => (
                  <div key={product._id} className="rounded-3xl bg-slate-900/80 p-4 backdrop-blur-sm transition hover:-translate-y-1">
                    <h3 className="font-semibold text-slate-100">{product.name}</h3>
                    <p className="mt-1 text-sm text-slate-300 line-clamp-2">{product.description}</p>
                    <span className="mt-3 inline-flex rounded-full bg-sadaYellow px-3 py-1 text-sm font-semibold text-slate-900">{product.price.toFixed(2)} €</span>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700">
            <img src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Plat sénégalais thieboudienne" className="h-96 w-full object-cover" />
          </div>
        </div>
      </div>
    </div>
      <div className="mt-16 rounded-[2rem] bg-slate-50/90 p-8 shadow-xl ring-1 ring-slate-200 dark:bg-slate-900/90 dark:ring-slate-700">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Horaires d’ouverture</h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {openingHours.length === 0 ? (
            <div className="rounded-3xl bg-white p-6 text-sm text-slate-600 shadow-sm dark:bg-slate-950 dark:text-slate-300">Chargement des horaires...</div>
          ) : (
            openingHours.map((item) => (
              <div key={item.day} className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-950 dark:border dark:border-slate-800">
                <p className="font-semibold text-slate-900 dark:text-slate-100">{item.day}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  {item.closed ? 'Fermé' : `${item.open} – ${item.close}`}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-[2rem] bg-sadaSand p-8 shadow-xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
          <h3 className="text-xl font-semibold text-slate-950 dark:text-slate-100">À emporter ou sur place</h3>
          <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-400">Savourez nos recettes chez vous ou retrouvez-nous au restaurant pour une adresse conviviale et pleine de vie.</p>
        </div>
        <div className="rounded-[2rem] bg-sadaSand p-8 shadow-xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
          <h3 className="text-xl font-semibold text-slate-950 dark:text-slate-100">Mobile Money</h3>
          <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-400">Un paiement simple et moderne avec Mobile Money, pour une commande fluide et rapide.</p>
        </div>
        <div className="rounded-[2rem] bg-sadaSand p-8 shadow-xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
          <h3 className="text-xl font-semibold text-slate-950 dark:text-slate-100">Service professionnel</h3>
          <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-400">Un tableau de bord administratif complet pour suivre les commandes, les finances et les clients.</p>
        </div>
      </div>
    </section>
  );
};

export default Home;

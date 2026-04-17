import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [todayMenu, setTodayMenu] = useState([]);
  const [openingHours, setOpeningHours] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [productsRes, todayRes, hoursRes] = await Promise.all([
        api.get('/products'),
        api.get('/products?today=true'),
        api.get('/opening-hours')
      ]);
      setFeatured(productsRes.data.filter((item) => item.featured).slice(0, 3));
      setTodayMenu(todayRes.data);
      setOpeningHours(hoursRes.data);
    };
    fetchData();
  }, []);

  const todayName = new Date().toLocaleDateString('fr-FR', { weekday: 'long' });
  const isWeekend = ['samedi', 'dimanche'].includes(todayName.toLowerCase());

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
            <div className="rounded-[2rem] border border-sadaGreen/20 bg-sadaGreen/10 px-6 py-4 text-slate-950 shadow-lg">
              <p className="text-sm uppercase tracking-[0.24em] text-sadaGreen">Notification</p>
              <p className="mt-3 text-base font-semibold">Menu du jour disponible 🔥</p>
              <p className="mt-2 text-sm text-slate-700">Découvrez le menu spécial de {todayName} et commandez rapidement sur WhatsApp.</p>
              {isWeekend && <p className="mt-2 text-sm text-slate-700">Promo du week-end active : profitez de livraisons plus rapides et d’offres exclusives.</p>}
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
                <div className="rounded-3xl bg-rose-50/90 p-4 text-sm text-slate-950">Chargement des spécialités...</div>
              ) : (
                featured.map((product) => (
                  <div key={product._id} className="rounded-3xl bg-rose-50/90 p-4 backdrop-blur-sm transition hover:-translate-y-1">
                    <h3 className="font-semibold text-slate-950">{product.name}</h3>
                    <p className="mt-1 text-sm text-slate-300 line-clamp-2">{product.description}</p>
                    <span className="mt-3 inline-flex rounded-full bg-sadaYellow px-3 py-1 text-sm font-semibold text-slate-900">{product.price.toFixed(2)} €</span>
                  </div>
                ))
              )}
            </div>
            <div className="mt-6 rounded-[2rem] bg-slate-900/80 p-6 text-slate-100">
              <h3 className="text-lg font-semibold">Menu du {todayName}</h3>
              {todayMenu.length === 0 ? (
                <p className="mt-3 text-sm text-slate-300">Aucun plat spécial n’est encore défini pour aujourd’hui.</p>
              ) : (
                <div className="mt-4 space-y-3">
                  {todayMenu.map((item) => (
                    <div key={item._id} className="rounded-3xl bg-rose-50/90 p-4">
                      <p className="font-semibold">{item.name}</p>
                      <p className="mt-1 text-sm text-slate-400">{item.price.toFixed(2)} €</p>
                    </div>
                  ))}
                </div>
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
      <div className="mt-10 rounded-[2rem] bg-white/90 p-8 shadow-2xl ring-1 ring-slate-200 dark:bg-slate-950/80 dark:ring-slate-700">
        <h3 className="text-2xl font-bold text-slate-950 dark:text-slate-100">Nos réseaux sociaux</h3>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Découvrez nos dernières vidéos et inspirations TikTok / Instagram directement depuis la page d’accueil.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <a href="https://www.tiktok.com/@sadatraiteur" target="_blank" rel="noreferrer" className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 p-6 transition hover:border-sadaOrange hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800">
            <div className="h-40 rounded-3xl bg-slate-900/80" />
            <h4 className="mt-4 text-lg font-semibold text-slate-950 dark:text-slate-100">TikTok</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Nos recettes, coulisses et offres spéciales.</p>
          </a>
          <a href="https://www.instagram.com/sadatraiteur/" target="_blank" rel="noreferrer" className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 p-6 transition hover:border-sadaOrange hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800">
            <div className="h-40 rounded-3xl bg-slate-900/80" />
            <h4 className="mt-4 text-lg font-semibold text-slate-950 dark:text-slate-100">Instagram</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Nos plats, événements et avis clients.</p>
          </a>
          <a href="https://whatsapp.com/channel/0029Vb6VAFyADTOEZK0BYp2s" target="_blank" rel="noreferrer" className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 p-6 transition hover:border-sadaOrange hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800">
            <div className="h-40 rounded-3xl bg-slate-900/80" />
            <h4 className="mt-4 text-lg font-semibold text-slate-950 dark:text-slate-100">Chaîne WhatsApp</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Rejoignez notre chaîne pour recevoir les offres et commander directement.</p>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;

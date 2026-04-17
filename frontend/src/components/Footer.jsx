import { Facebook, Instagram, MapPin, Mail, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Footer = () => {
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setLatestProducts(response.data.slice(-3).reverse());
      } catch (error) {
        console.error('Impossible de charger les produits', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <footer className="bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-5 rounded-[1.5rem] border border-slate-800/70 bg-slate-900/90 p-6 shadow-lg backdrop-blur-sm">
            <p className="text-[11px] uppercase tracking-[0.35em] text-sadaRed">Nous suivre</p>
            <h2 className="text-2xl font-bold text-sadaYellow">SADA TRAITEUR</h2>
            <p className="text-sm leading-6 text-slate-300">
              Retrouvez-nous sur les réseaux sociaux pour découvrir les nouveautés, les promos et les plats du jour.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-700/80 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 transition hover:border-sadaYellow hover:text-sadaYellow"
              >
                <Facebook className="h-4 w-4" />
                Facebook
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-700/80 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 transition hover:border-sadaYellow hover:text-sadaYellow"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </a>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-800/70 bg-slate-900/90 p-6 shadow-lg backdrop-blur-sm">
            <p className="text-[11px] uppercase tracking-[0.35em] text-sadaRed">Navigation</p>
            <div className="mt-5 grid gap-2 text-sm text-slate-300">
              <Link to="/" className="transition hover:text-sadaYellow">Accueil</Link>
              <Link to="/menu" className="transition hover:text-sadaYellow">Menu</Link>
              <Link to="/cart" className="transition hover:text-sadaYellow">Panier</Link>
              <Link to="/contact" className="transition hover:text-sadaYellow">Contact</Link>
              <Link to="/order-status" className="transition hover:text-sadaYellow">Suivi de commande</Link>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-800/70 bg-slate-900/90 p-6 shadow-lg backdrop-blur-sm">
            <p className="text-[11px] uppercase tracking-[0.35em] text-sadaRed">Nos derniers plats</p>
            <div className="mt-5 space-y-3">
              {latestProducts.length === 0 ? (
                <div className="rounded-2xl bg-slate-950/90 p-4 text-sm text-slate-400">Chargement des plats...</div>
              ) : (
                latestProducts.map((product) => (
                  <div key={product._id} className="rounded-2xl bg-slate-950/90 p-4">
                    <p className="font-semibold text-slate-100">{product.name}</p>
                    <p className="text-sm text-slate-400">{product.description || 'Plat savoureux'} · {product.price ? `${product.price.toFixed(0)} FCFA` : 'Prix indisponible'}</p>
                  </div>
                ))
              )}
            </div>
            <div className="mt-6 space-y-3 rounded-2xl bg-slate-950/90 p-5 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 text-sadaYellow" />
                <p>Dakar, Sénégal</p>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-4 w-4 text-sadaYellow" />
                <p>+221 78 798 39 99</p>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-4 w-4 text-sadaYellow" />
                <p>contact@sadatraiteur.sn</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[1.5rem] border border-slate-800/60 bg-slate-900/85 px-5 py-4 text-center text-sm text-slate-400 shadow-lg">
          © 2026 SADA TRAITEUR. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

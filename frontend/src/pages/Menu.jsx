import { useEffect, useMemo, useState } from 'react';
import api from '../services/api';
import MenuCard from '../components/MenuCard';

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Plat du jour');

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get('/products');
      setProducts(response.data);
    };
    fetchProducts();
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
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {displayed.map((product) => (
          <MenuCard key={product._id} product={product} />
        ))}
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

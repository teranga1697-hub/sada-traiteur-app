import { PlusCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const MenuCard = ({ product }) => {
  const { addProduct } = useCart();
  const handleAdd = () => {
    addProduct({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
  };

  const imageUrl = product.image || 'https://images.unsplash.com/photo-1529059991320-4ca51b89f989?auto=format&fit=crop&w=900&q=80';

  return (
    <div className="group overflow-hidden rounded-[2rem] border border-sadaTerre/20 bg-sadaSand shadow-xl transition hover:-translate-y-1 hover:shadow-2xl dark:bg-slate-900 dark:border-slate-700">
      <div className="relative overflow-hidden">
        <img src={imageUrl} alt={product.name} className="h-52 w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-sadaGreen/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">{product.category}</span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-slate-950 dark:text-slate-100">{product.name}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">{product.description}</p>
        <div className="mt-6 flex items-center justify-between gap-4">
          <span className="text-2xl font-bold text-sadaRed">{product.price.toFixed(2)} €</span>
          <button onClick={handleAdd} className="inline-flex items-center gap-2 rounded-full bg-sadaRed px-4 py-2 text-sm font-semibold text-white transition hover:bg-sadaTerre">
            <PlusCircle className="h-4 w-4" /> Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;

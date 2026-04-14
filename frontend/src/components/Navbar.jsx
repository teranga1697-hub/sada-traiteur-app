import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { ShoppingCart, LogOut, Moon, SunMedium, MapPin, Clock4, Phone } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-sadaRed text-sadaSand">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 text-xs uppercase tracking-[0.24em] sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <span className="inline-flex items-center gap-2 font-semibold">
              <MapPin className="h-4 w-4" /> Dakar, Sénégal
            </span>
            <span className="inline-flex items-center gap-2 font-semibold">
              <Clock4 className="h-4 w-4" /> 11h-15h / 18h-22h
            </span>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <span className="inline-flex items-center gap-2 font-semibold">
              <Phone className="h-4 w-4" /> +221 77 683 81 55
            </span>
            <Link to="/contact" className="inline-flex rounded-full border border-sadaSand/40 bg-sadaSand/10 px-4 py-2 font-semibold text-sadaSand transition hover:bg-sadaSand/20">
              Réserver une table
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-slate-950/95 text-slate-100 shadow-xl shadow-slate-900/20 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3 text-lg font-extrabold uppercase tracking-[0.24em] text-sadaYellow">
            <img src={logo} alt="SADA Traiteur logo" className="h-16 w-16 rounded-full bg-white/10 p-3" />
            SADA TRAITEUR
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <NavLink to="/" className={({ isActive }) => isActive ? 'text-sadaYellow font-semibold' : 'text-slate-300 hover:text-sadaYellow'}>
              Accueil
            </NavLink>
            <NavLink to="/menu" className={({ isActive }) => isActive ? 'text-sadaYellow font-semibold' : 'text-slate-300 hover:text-sadaYellow'}>
              Menu
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-sadaYellow font-semibold' : 'text-slate-300 hover:text-sadaYellow'}>
              Contact
            </NavLink>
            <NavLink to="/order-status" className={({ isActive }) => isActive ? 'text-sadaYellow font-semibold' : 'text-slate-300 hover:text-sadaYellow'}>
              Suivi
            </NavLink>
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-200 transition hover:border-sadaYellow hover:text-sadaYellow">
              {theme === 'dark' ? <SunMedium className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link to="/cart" className="relative inline-flex items-center gap-2 rounded-full bg-sadaYellow px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-sadaSand">
              <ShoppingCart className="h-4 w-4" /> Panier
              {items.length > 0 && (
                <span className="absolute -right-2 -top-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-sadaRed text-[10px] text-white">
                  {items.length}
                </span>
              )}
            </Link>
            {user ? (
              <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200">
                {user.isAdmin && (
                  <Link to="/admin" className="rounded-full bg-sadaGreen px-3 py-2 text-sm font-semibold text-white transition hover:bg-sadaJade">
                    Admin
                  </Link>
                )}
                <span>{user.name}</span>
                <button onClick={logout} className="rounded-full p-1 text-slate-300 transition hover:bg-slate-800 hover:text-white">
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link to="/auth" className="rounded-full border border-sadaYellow px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-sadaYellow hover:text-slate-950">
                Connexion
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

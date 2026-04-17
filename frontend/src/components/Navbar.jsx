import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { ShoppingCart, LogOut, Moon, SunMedium, MapPin, Clock4, Phone, MessageSquare } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      <div className="bg-sadaYellow/90 text-sadaText">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 text-xs uppercase tracking-[0.24em] sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-sadaText shadow-sm">
              <MapPin className="h-4 w-4" /> Dakar, Sénégal
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-sadaText shadow-sm">
              <Clock4 className="h-4 w-4" /> 11h-15h / 18h-22h
            </span>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-sadaText shadow-sm">
              <Phone className="h-4 w-4" /> +221 78 798 39 99
            </span>
            <a
              href="https://whatsapp.com/channel/0029Vb6VAFyADTOEZK0BYp2s"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-sadaOrange px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-sadaRed"
            >
              <MessageSquare className="h-4 w-4" /> Chaîne WhatsApp
            </a>
            <Link to="/contact" className="inline-flex rounded-full border border-sadaBorder bg-white px-4 py-2 text-sm font-semibold text-sadaText transition hover:bg-sadaCream">
              Réserver une table
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-white/95 text-sadaText shadow-xl shadow-sadaGreen/10 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3 text-lg font-extrabold uppercase tracking-[0.24em] text-sadaOrange">
            <img src={logo} alt="SADA Traiteur logo" className="h-16 w-16 rounded-full bg-sadaPalm p-3" />
            SADA TRAITEUR
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <NavLink to="/" className={({ isActive }) => isActive ? 'text-sadaOrange font-semibold' : 'text-slate-500 transition hover:text-sadaOrange'}>
              Accueil
            </NavLink>
            <NavLink to="/menu" className={({ isActive }) => isActive ? 'text-sadaOrange font-semibold' : 'text-slate-500 transition hover:text-sadaOrange'}>
              Menu
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-sadaOrange font-semibold' : 'text-slate-500 transition hover:text-sadaOrange'}>
              Contact
            </NavLink>
            <NavLink to="/order-status" className={({ isActive }) => isActive ? 'text-sadaOrange font-semibold' : 'text-slate-500 transition hover:text-sadaOrange'}>
              Suivi
            </NavLink>
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-sadaBorder bg-white text-sadaText transition hover:border-sadaOrange hover:text-sadaOrange">
              {theme === 'dark' ? <SunMedium className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link to="/cart" className="relative inline-flex items-center gap-2 rounded-full bg-sadaOrange px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-sadaRed">
              <ShoppingCart className="h-4 w-4" /> Panier
              {items.length > 0 && (
                <span className="absolute -right-2 -top-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-sadaRed text-[10px] text-white">
                  {items.length}
                </span>
              )}
            </Link>
            {user ? (
              <div className="flex items-center gap-2 rounded-full border border-sadaBorder bg-white px-3 py-2 text-sm text-sadaText">
                {user.isAdmin && (
                  <Link to="/admin" className="rounded-full bg-sadaGreen px-3 py-2 text-sm font-semibold text-white transition hover:bg-sadaJade">
                    Admin
                  </Link>
                )}
                <span>{user.name}</span>
                <button onClick={logout} className="rounded-full p-1 text-slate-500 transition hover:bg-sadaPink hover:text-sadaText">
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link to="/auth" className="rounded-full border border-sadaOrange px-4 py-3 text-sm font-semibold text-sadaOrange transition hover:bg-sadaOrange hover:text-white">
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

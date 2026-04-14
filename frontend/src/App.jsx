import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import OrderStatus from './pages/OrderStatus';
import Admin from './pages/Admin';
import { useAuth } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';

function App() {
  const { user } = useAuth();
  const { theme } = useTheme();

  const backgroundStyle = {
    backgroundImage:
      "linear-gradient(rgba(15,23,42,0.85), rgba(15,23,42,0.85)), url('https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1600')",
    backgroundAttachment: 'fixed'
  };

  return (
    <div
      className={`${theme === 'dark' ? 'dark bg-slate-950 text-slate-100' : 'bg-white text-slate-900'} min-h-screen bg-cover bg-center`}
      style={backgroundStyle}
    >
      <Navbar />
      <main className="pb-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/order-status" element={<OrderStatus />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

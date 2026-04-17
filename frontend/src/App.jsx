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
import { useTheme } from './context/ThemeContext';

function App() {
  const { theme } = useTheme();

  const backgroundStyle = {
    backgroundImage:
      'radial-gradient(circle at top left, rgba(0, 133, 63, 0.16), transparent 28%), radial-gradient(circle at bottom right, rgba(239, 51, 64, 0.16), transparent 30%), radial-gradient(circle at 30% 70%, rgba(244, 196, 48, 0.18), transparent 18%)',
    backgroundAttachment: 'fixed'
  };

  return (
    <div
      className={`${theme === 'dark' ? 'dark bg-slate-950 text-slate-100' : 'bg-sadaPalm text-sadaText'} min-h-screen bg-cover bg-center transition-colors duration-500`}
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

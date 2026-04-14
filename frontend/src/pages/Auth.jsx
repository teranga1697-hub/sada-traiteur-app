import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', address: '', adminCode: '' });
  const [message, setMessage] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      if (isRegister) {
        await register(form);
      } else {
        await login(form.email, form.password);
      }
      navigate('/');
    } catch (error) {
      const apiMessage = error.response?.data?.message;
      setMessage(apiMessage || error.message || 'Erreur d’authentification');
    }
  };

  return (
    <section className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 text-slate-950 dark:text-slate-100">
      <div className="rounded-[2rem] bg-sadaSand/95 p-10 shadow-2xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
        <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-950/80 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-sadaRed">Espace authentique</p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900 dark:text-slate-100">{isRegister ? 'Créer un compte admin' : 'Connexion'}</h1>
          </div>
          <button onClick={() => setIsRegister((current) => !current)} className="rounded-full bg-sadaGreen px-5 py-2 text-sm font-semibold text-white transition hover:bg-sadaJade">
            {isRegister ? 'Déjà inscrit ?' : 'Créer un compte'}
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {isRegister && (
            <div>
              <label className="block text-sm font-medium text-slate-700">Nom complet</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sadaOrange" />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" required className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sadaOrange" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Mot de passe</label>
            <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} type="password" required className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sadaOrange" />
          </div>
          {isRegister && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700">Téléphone WhatsApp</label>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sadaOrange" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Adresse</label>
                <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sadaOrange" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Code administrateur (optionnel)</label>
                <input value={form.adminCode} onChange={(e) => setForm({ ...form, adminCode: e.target.value })} type="password" placeholder="Laissez vide pour un compte client" className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sadaOrange" />
              </div>
            </>
          )}
          <button type="submit" className="w-full rounded-full bg-sadaRed px-6 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-sadaTerre">
            {isRegister ? 'S’inscrire' : 'Se connecter'}
          </button>
          {message && <p className="rounded-3xl bg-sadaRed/10 p-4 text-sm text-slate-900">{message}</p>}
        </form>
      </div>
    </section>
  );
};

export default Auth;

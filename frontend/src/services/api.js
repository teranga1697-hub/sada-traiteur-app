import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_URL || '/api';
const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const saved = localStorage.getItem('sadaUser');
  if (saved) {
    const { token } = JSON.parse(saved);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    if (
      status === 401 &&
      ['Token non fourni', 'Token invalide', 'Token expiré', 'Utilisateur introuvable'].includes(message)
    ) {
      localStorage.removeItem('sadaUser');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export default api;

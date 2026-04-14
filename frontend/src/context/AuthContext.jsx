import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('sadaUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('sadaUser');
    if (saved && !user) {
      setUser(JSON.parse(saved));
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const payload = { token: response.data.token, ...response.data.user };
      localStorage.setItem('sadaUser', JSON.stringify(payload));
      setUser(payload);
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/auth/register', payload);
      const result = { token: response.data.token, ...response.data.user };
      localStorage.setItem('sadaUser', JSON.stringify(result));
      setUser(result);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('sadaUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

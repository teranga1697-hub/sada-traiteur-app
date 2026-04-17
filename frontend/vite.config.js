import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
const base = process.env.NODE_ENV === 'production' ? '/sada-traiteur-app/' : '/';

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: backendUrl,
        changeOrigin: true
      }
    }
  }
});

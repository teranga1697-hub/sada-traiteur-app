# SADA TRAITEUR APP

Application web complète pour le restaurant sénégalais **Sada Traiteur**.

## Structure du projet

- `frontend/` : application React + Tailwind CSS
- `backend/` : API Node.js + Express + MongoDB

## Installation

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Mettre vos variables MongoDB et JWT
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Docker (recommandé)

```bash
docker compose up --build
```

Ensuite, ouvrez :
- Frontend : `http://localhost:5173`
- Backend : `http://localhost:5000`

## Déploiement

### Frontend

- Build de production : `cd frontend && npm run build`
- Sur Vercel / Netlify / Cloudflare Pages, utilisez le dossier `dist` comme output.
- Si votre API est hébergée séparément, définissez `VITE_BACKEND_URL=https://api.votre-domaine.com`.

### Backend

- Hébergez le backend sur Render / Railway / Fly / Cloud Run / un VPS.
- Définissez les variables d’environnement :
  - `PORT=5000`
  - `MONGO_URI=<URI MongoDB>`
  - `JWT_SECRET=<secret>`
  - `ADMIN_SECRET=<secret>`
  - `FRONTEND_URL=https://votre-frontend.app`

### Déploiement Docker de production

Le frontend peut aussi être empaqueté en image Docker de production avec `frontend/Dockerfile.prod`.
- Build : `docker build -f frontend/Dockerfile.prod -t sada-traiteur-frontend .`
- Exécution : `docker run -p 80:80 sada-traiteur-frontend`

Pour démarrer l’ensemble du projet en production avec Docker Compose :

```bash
docker compose -f docker-compose.prod.yml up --build
```

Variables utiles :
- `VITE_BACKEND_URL` : `http://localhost:5000` ou l’URL de votre API
- `JWT_SECRET`, `ADMIN_SECRET`, `FRONTEND_URL`

> Dans l’environnement de production, `VITE_BACKEND_URL` permet de pointer le frontend vers un backend externe.

## Fonctionnalités

- Menu dynamique (jour, soir, spécialités, jus locaux)
- Authentification JWT
- Panier, commande en ligne et suivi de commande
- Tableau de bord administrateur avec commandes, revenus, gestion du menu
- Notifications de commande et export financier
- Design responsive avec thème africain

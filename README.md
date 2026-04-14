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

## Fonctionnalités

- Menu dynamique (jour, soir, spécialités, jus locaux)
- Authentification JWT
- Panier, commande en ligne et suivi de commande
- Tableau de bord administrateur avec commandes, revenus, gestion du menu
- Notifications de commande et export financier
- Design responsive avec thème africain

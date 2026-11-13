# Orbit Real Estate

**L'immobilier d'exception. De la vision à la clé.**

Application web single-page pour l'agence immobilière de prestige **Orbit Real Estate**, opérant à Marrakech, Casablanca et Rabat.

## Stack

- **React 18** + **Vite 6**
- **Tailwind CSS v4** (design system custom via `@theme`)
- **Lucide React** (icônes)
- Typographies : **Fraunces** (titres éditoriaux) & **Manrope** (corps de texte)

## Fonctionnalités

- Navigation par onglets fluide, sans rechargement (transition de page animée)
- Hero cinématique avec recherche rapide (type · localisation · budget) et indicateur FOMO temps réel
- Catalogue filtrable (catégories, ville, budget) avec modale détaillée immersive
- Tunnel de **visite privée en 2 étapes** : choix du bien / consultation → créneau → confirmation
  - Génération d'un **code de dossier unique** (`ORB-2026-XXXX`)
  - Ajout à **Google Calendar** (lien formaté) + téléchargement **`.ics`** (Apple Calendar)
- Bouton **WhatsApp sticky** pour un contact direct avec l'agent
- Révélation au scroll (IntersectionObserver), compteurs animés, grain photographique subtil

## Installation

```bash
npm install
npm run dev       # développement (http://localhost:5173)
npm run build     # build de production
npm run preview   # prévisualisation du build
```

## Déploiement (Vercel)

1. Poussez ce dossier sur un dépôt Git.
2. Importez le dépôt sur [vercel.com](https://vercel.com).
3. Framework preset : **Vite** (détection automatique). Aucune configuration supplémentaire requise.

## Structure

```
src/
  App.jsx              # Routing par onglets, état global, modales
  data.js              # Biens, coordonnées, catégories, images
  lib.js               # Formatage prix, génération agenda (.ics / Google)
  index.css            # Design system Tailwind v4 + animations
  components/
    Navbar / Hero / Home / Portfolio / PropertyCard / PropertyModal
    Services / Investors / Contact / VisitModal / Footer / WhatsAppButton
    ui.jsx             # Reveal, CountUp, Button, Badge, Logo, Eyebrow
```

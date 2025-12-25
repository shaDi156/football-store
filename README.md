# Football Jersey Store (Vite + React)

A simple football jersey catalog with search, ordering, and mock auth—all running fully in the browser via localStorage. Built with Vite and React.

## Features
- Browse a grid of jerseys with pricing and photos.
- Search products instantly from the navbar.
- Place an order with quantity, contact, address, and payment method; orders are saved per product in `localStorage`.
- Basic login/sign-up modals that log activity to a lightweight in-browser store.

## Tech Stack
- React (components under `src/components/`)
- Vite tooling (see `vite.config.js`)
- Local storage mock DB (`src/lib/fakeDb.js`)

## Getting Started
```bash
npm install
npm run dev
```
Then open the printed local URL (usually http://localhost:5173).

## Project Structure
- `src/App.jsx` – root layout wiring navbar and product grid.
- `src/components/Navbar.jsx` – brand header, search box, login/sign-up modals.
- `src/components/Products.jsx` – product catalog and order modal.
- `src/lib/fakeDb.js` – localStorage-backed mock persistence for orders and users.
- `src/assets/` – product and brand imagery.

## Notes
- Data persists locally in the browser only; clear site storage to reset.
- No backend required.

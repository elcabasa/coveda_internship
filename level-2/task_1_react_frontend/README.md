# Level 2 Task 1: React Frontend

A React + Tailwind CSS product inventory frontend built with reusable components, API calls, loading states, reducer-based state management, and a persistent light/dark theme system.

## Tech Stack

- React
- Vite
- Tailwind CSS
- lucide-react icons

## Objectives Covered

- Set up a modern React project with Vite
- Used functional components
- Managed app state with `useReducer`, `useState`, `useMemo`, and effects
- Implemented API calls for create, read, update, and delete operations
- Added loading, success, validation, and error states
- Created reusable UI components
- Styled the app with Tailwind CSS and theme variables

## Features

- Fetches products from the existing Products API
- Shows loading skeletons while products load
- Adds, edits, deletes, searches, and refreshes products
- Uses reusable components for forms, cards, stats, modals, search, and notifications
- Handles API errors with dismissible toast messages
- Includes a full-app light/dark theme toggle
- Saves the selected theme in browser `localStorage`
- Restores the saved theme when the user returns

## Theme Toggle

The theme switch is in the header. It supports:

- Light mode
- Dark mode
- Browser persistence through `localStorage`
- Full app color changes for backgrounds, cards, borders, buttons, inputs, modals, and text

The saved key is:

```text
stockroom-theme
```

Theme colors are controlled in `src/index.css` using CSS variables on:

```css
:root
:root[data-theme='dark']
```

## Project Structure

```text
task_1_react_frontend/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── src/
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── components/
    │   ├── EmptyState.jsx
    │   ├── Header.jsx
    │   ├── ProductCard.jsx
    │   ├── ProductForm.jsx
    │   ├── ProductGrid.jsx
    │   ├── ProductModal.jsx
    │   ├── ProductSkeleton.jsx
    │   ├── SearchBar.jsx
    │   ├── StatsGrid.jsx
    │   ├── ThemeToggle.jsx
    │   └── Toast.jsx
    └── services/
        └── products.js
```

## Run Locally

```bash
npm install
npm run dev
```

The app runs at `http://127.0.0.1:5173/`.

By default, it connects to:

```text
https://coveda-internship.onrender.com/api/products
```

To use a local backend instead, create a `.env` file:

```text
VITE_PRODUCTS_API_URL=http://localhost:3000/api/products
```

## Build

```bash
npm run build
```

## Notes

If the theme does not appear to update after code changes, hard refresh the browser with `Ctrl + F5` so the latest Vite bundle and CSS are loaded.

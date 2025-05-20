# Patient Portal

**Patient Portal** – A Vite + React web app for managing patient records entirely in‑browser with embedded SQL, styled with Tailwind CSS, and synchronized across tabs via the BroadcastChannel API.

## 🚀 Overview

Patient Portal is a front‑end–only application that lets users register new patients (name, age, gender), run arbitrary SQL queries via a textarea, and view results in a responsive, scrollable table. All changes persist in IndexedDB, and multiple open tabs stay in sync in real time using the BroadcastChannel API.

## 🛠 Tech Stack

- **Vite & React** for fast HMR development and a modern component model
- **@electric-sql/pglite** (WASM Postgres) for a zero‑backend SQL engine in the browser
- **Tailwind CSS** for utility‑first, responsive styling
- **BroadcastChannel API** to broadcast “refresh” messages across tabs
- **Netlify** (or GitHub Pages) for static hosting

## 🔧 Prerequisites

- Node .js ≥ 14 & npm installed
- Modern browser with IndexedDB & BroadcastChannel support

## 📦 Installation

```bash
# 1. Clone the repo
git clone <your-repo-url> && cd patient-portal

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Visit http://localhost:5173 to see the app live with HMR.

## 📁 Folder Structure

```
/public
  └─ _redirects      # (Optional) Netlify SPA fallback
/src
  ├─ App.jsx         # Main application logic & forms
  ├─ TableData.jsx   # Render patient table & SQL results
  ├─ main.jsx        # Vite entrypoint (imports index.css)
  └─ index.css       # Tailwind directives
index.html           # HTML shell
package.json         # Scripts & dependencies
tailwind.config.js   # Tailwind config
postcss.config.js    # PostCSS config
vite.config.js       # Vite config
README.md            # This file
```

## 🔨 Configuration

```
await db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    age INTEGER,
    gender TEXT
  );
`);
```

## ⚙️ Available Scripts

- `npm run dev` — start dev server with HMR
- `npm run build` — bundle app to `dist/`
- `npm run serve` — preview production build (requires `serve` pkg)

## 🎯 Usage

1. **Add Patient**: Fill in name, age, gender → “Add”
2. **Run SQL**: Enter any `SELECT ...` → “Run”
3. **Clear All**: Deletes all records
4. **Multi‑Tab**: All tabs auto‑sync on changes

## 🖥 Deployment

### Netlify

- Connect GitHub repo, set build to `npm run build`, publish to `dist`
- Add `public/_redirects`:
  ```
  /* /index.html 200
  ```

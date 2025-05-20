// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Create the broadcast channel
const CHANNEL_NAME = 'db-sync-channel';
export const broadcastChannel = new BroadcastChannel(CHANNEL_NAME);

// Import the worker via Vite’s `?worker` syntax :contentReference[oaicite:4]{index=4}
import PGWorker from './pglite-worker.js?worker';

import { PGliteWorker } from '@electric-sql/pglite/worker';  // Worker proxy API :contentReference[oaicite:5]{index=5}

const workerInstance = new PGWorker({ type: 'module', name: 'pglite-worker' });
export const db = new PGliteWorker(workerInstance);

// Render your app
ReactDOM.createRoot(document.getElementById('root')).render(<App />);

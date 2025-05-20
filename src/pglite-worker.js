// src/my-pglite-worker.js
import { PGlite } from '@electric-sql/pglite';
import { worker }  from '@electric-sql/pglite/worker';

const DATA_DIR = 'idb://patientDatabase';

worker({
  async init() {
    // Opens (or creates) a persisted DB at IndexedDB URL
    const db = new PGlite(DATA_DIR, { relaxedDurability: true });
    await db.waitReady;
    // Ensure your schema exists
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT,
        age INTEGER,
        gender TEXT
      );
    `);
    return db;
  },
});

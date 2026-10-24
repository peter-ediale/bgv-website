import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const JSON_DB = path.join(DATA_DIR, 'orders.json');

// Try to use better-sqlite3 when available; fall back to a simple JSON file store for local dev
let db: any = null;
try {
  // Use indirect require to avoid static bundler resolution when native module isn't present
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  const Database = eval("require")('better-sqlite3');
  const DB_PATH = path.join(process.cwd(), 'data', 'orders.db');
  db = new Database(DB_PATH);

  // initialize orders table
  db.prepare(
    `CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      items TEXT,
      total INTEGER,
      customer TEXT,
      status TEXT,
      createdAt TEXT,
      paidAt TEXT
    )`
  ).run();
} catch (err) {
  // fallback: ensure data dir and json file exist
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(JSON_DB)) fs.writeFileSync(JSON_DB, JSON.stringify([]));
}

function readJsonDB(): any[] {
  try {
    const raw = fs.readFileSync(JSON_DB, 'utf-8');
    return JSON.parse(raw || '[]');
  } catch (e) {
    return [];
  }
}

function writeJsonDB(rows: any[]) {
  fs.writeFileSync(JSON_DB, JSON.stringify(rows, null, 2));
}

export function insertOrder(order: any) {
  if (db) {
    const stmt = db.prepare('INSERT INTO orders (id, items, total, customer, status, createdAt) VALUES (?, ?, ?, ?, ?, ?)');
    return stmt.run(order.id, JSON.stringify(order.items), order.total, JSON.stringify(order.customer), order.status, order.createdAt);
  }

  const rows = readJsonDB();
  rows.unshift({ ...order });
  writeJsonDB(rows);
  return { changes: 1 };
}

export function updateOrderStatus(id: string, status: string) {
  if (db) {
    const stmt = db.prepare('UPDATE orders SET status = ?, paidAt = ? WHERE id = ?');
    return stmt.run(status, status === 'paid' ? new Date().toISOString() : null, id);
  }

  const rows = readJsonDB();
  const idx = rows.findIndex((r) => r.id === id);
  if (idx === -1) return { changes: 0 };
  rows[idx].status = status;
  rows[idx].paidAt = status === 'paid' ? new Date().toISOString() : null;
  writeJsonDB(rows);
  return { changes: 1 };
}

export function getOrders() {
  if (db) {
    const stmt = db.prepare('SELECT * FROM orders ORDER BY createdAt DESC');
    return stmt.all().map((r: any) => ({ ...r, items: JSON.parse(r.items), customer: JSON.parse(r.customer) }));
  }

  const rows = readJsonDB();
  return rows.map((r) => ({ ...r }));
}

export function getOrder(id: string) {
  if (db) {
    const stmt = db.prepare('SELECT * FROM orders WHERE id = ?');
    const r = stmt.get(id);
    if (!r) return null;
    return { ...r, items: JSON.parse(r.items), customer: JSON.parse(r.customer) };
  }

  const rows = readJsonDB();
  return rows.find((r) => r.id === id) || null;
}

export default db;

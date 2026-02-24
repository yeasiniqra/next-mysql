// lib/db.js
import mysql from 'mysql2/promise';

const config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'my_blog',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
};

let pool;

// Reuse pool across lambda invocations / serverless cold starts
// so we don't exhaust DB connections on platforms like Vercel.
if (globalThis.__mysqlPool) {
  pool = globalThis.__mysqlPool;
} else {
  pool = mysql.createPool(config);
  globalThis.__mysqlPool = pool;
}

export async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

export default pool;

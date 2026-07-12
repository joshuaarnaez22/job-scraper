/**
 * Apply RLS SQL after schema changes.
 * Run: npx tsx prisma/apply-rls.ts
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import pg from 'pg';

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL is not set');
  }

  const sqlPath = path.join(__dirname, 'sql', 'rls.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  const client = new pg.Client({ connectionString: url });
  await client.connect();
  try {
    await client.query(sql);
    console.log('✅ RLS policies applied');
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error('❌ Failed to apply RLS:', err);
  process.exit(1);
});

import 'dotenv/config';
import pg from 'pg';

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not set');
  const client = new pg.Client({ connectionString: url });
  await client.connect();
  await client.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public;');
  await client.end();
  console.log('✅ public schema wiped');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

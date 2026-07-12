/**
 * Run Stripe CLI listen against the JobScout test key in .env.local
 * (avoids forwarding events from a different logged-in Stripe account).
 */

import { config } from 'dotenv';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';

config({ path: resolve(process.cwd(), '.env.local') });
config({ path: resolve(process.cwd(), '.env') });

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error('STRIPE_SECRET_KEY missing in .env.local');
  process.exit(1);
}

const child = spawn(
  'stripe',
  [
    'listen',
    '--forward-to',
    'localhost:3000/api/billing/webhook',
    '--api-key',
    key,
  ],
  { stdio: 'inherit' }
);

child.on('exit', (code) => process.exit(code ?? 1));

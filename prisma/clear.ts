/**
 * Clear all data from the database
 * Run with: npx tsx prisma/clear.ts
 *
 * Phase 0 note: wiping is the supported path when migrating off singleton
 * "default" SearchConfig / UserProfile rows.
 */

import 'dotenv/config';
import { prisma } from '../src/lib/db';
import { withServiceRls } from '../src/lib/rls';

async function clearDatabase() {
  console.log('🗑️  Clearing database...');

  const deleted = await withServiceRls(async (tx) =>
    Promise.all([
      tx.generatedEmail.deleteMany(),
      tx.userJob.deleteMany(),
      tx.job.deleteMany(),
      tx.scrapeLog.deleteMany(),
      tx.siteConfig.deleteMany(),
      tx.searchConfig.deleteMany(),
      tx.userProfile.deleteMany(),
      tx.subscription.deleteMany(),
      tx.user.deleteMany(),
    ])
  );

  console.log('✅ Cleared:');
  console.log(`   - ${deleted[0].count} generated emails`);
  console.log(`   - ${deleted[1].count} user jobs`);
  console.log(`   - ${deleted[2].count} jobs`);
  console.log(`   - ${deleted[3].count} scrape logs`);
  console.log(`   - ${deleted[4].count} site configs`);
  console.log(`   - ${deleted[5].count} search configs`);
  console.log(`   - ${deleted[6].count} user profiles`);
  console.log(`   - ${deleted[7].count} subscriptions`);
  console.log(`   - ${deleted[8].count} users`);

  console.log('\n🎉 Database cleared! Sign in again to seed a fresh user.');
}

clearDatabase()
  .catch((error) => {
    console.error('❌ Error clearing database:', error);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });

/**
 * Clear all data from the database
 * Run with: npx tsx prisma/clear.ts
 */

import 'dotenv/config';
import { prisma } from '../src/lib/db';

async function clearDatabase() {
  console.log('🗑️  Clearing database...');

  // Delete in order to respect foreign key constraints
  const deleted = await prisma.$transaction([
    prisma.generatedEmail.deleteMany(),
    prisma.job.deleteMany(),
    prisma.scrapeLog.deleteMany(),
    prisma.siteConfig.deleteMany(),
    prisma.searchConfig.deleteMany(),
  ]);

  console.log('✅ Cleared:');
  console.log(`   - ${deleted[0].count} generated emails`);
  console.log(`   - ${deleted[1].count} jobs`);
  console.log(`   - ${deleted[2].count} scrape logs`);
  console.log(`   - ${deleted[3].count} site configs`);
  console.log(`   - ${deleted[4].count} search configs`);

  console.log('\n🎉 Database cleared! Ready for fresh scrape.');
}

clearDatabase()
  .catch((error) => {
    console.error('❌ Error clearing database:', error);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });

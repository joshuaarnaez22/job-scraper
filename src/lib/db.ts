/**
 * Database clients
 *
 * - prisma: default client (use inside withUserRls / withServiceRls)
 * - Prefer withUserRls for user-facing routes and withServiceRls for cron
 *
 * Optional DATABASE_URL_SERVICE: separate Neon role with BYPASSRLS.
 * If unset, service helpers set app.role = 'service' on the same connection
 * (requires FORCE RLS policies that allow that role — see prisma/sql/rls.sql).
 */

import { PrismaClient, type Prisma } from '@/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  servicePrisma: PrismaClient | undefined;
};

function createPrismaClient(connectionString: string): PrismaClient {
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  return url;
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient(getDatabaseUrl());

export const servicePrisma =
  globalForPrisma.servicePrisma ??
  createPrismaClient(process.env.DATABASE_URL_SERVICE || getDatabaseUrl());

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
  globalForPrisma.servicePrisma = servicePrisma;
}

export type TxClient = Prisma.TransactionClient;

export default prisma;

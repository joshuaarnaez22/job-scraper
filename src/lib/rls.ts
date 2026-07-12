/**
 * Postgres RLS helpers
 * Sets session variables consumed by policies in prisma/sql/rls.sql
 */

import { prisma, servicePrisma, type TxClient } from './db';

type RlsTxOptions = {
  /** Interactive transaction timeout (ms). Default 30s for scrape batches. */
  timeout?: number;
  maxWait?: number;
};

export async function withUserRls<T>(
  userId: string,
  fn: (tx: TxClient) => Promise<T>,
  options?: RlsTxOptions
): Promise<T> {
  return prisma.$transaction(
    async (tx) => {
      await tx.$executeRaw`SELECT set_config('app.current_user_id', ${userId}, true)`;
      await tx.$executeRaw`SELECT set_config('app.role', 'user', true)`;
      return fn(tx);
    },
    {
      maxWait: options?.maxWait ?? 10_000,
      timeout: options?.timeout ?? 15_000,
    }
  );
}

export async function withServiceRls<T>(
  fn: (tx: TxClient) => Promise<T>,
  options?: RlsTxOptions
): Promise<T> {
  return servicePrisma.$transaction(
    async (tx) => {
      await tx.$executeRaw`SELECT set_config('app.role', 'service', true)`;
      await tx.$executeRaw`SELECT set_config('app.current_user_id', '', true)`;
      return fn(tx);
    },
    {
      maxWait: options?.maxWait ?? 10_000,
      timeout: options?.timeout ?? 30_000,
    }
  );
}

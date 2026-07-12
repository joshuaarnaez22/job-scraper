/**
 * Postgres RLS helpers
 * Sets session variables consumed by policies in prisma/sql/rls.sql
 */

import { prisma, servicePrisma, type TxClient } from './db';

export async function withUserRls<T>(
  userId: string,
  fn: (tx: TxClient) => Promise<T>
): Promise<T> {
  return prisma.$transaction(async (tx) => {
    await tx.$executeRaw`SELECT set_config('app.current_user_id', ${userId}, true)`;
    await tx.$executeRaw`SELECT set_config('app.role', 'user', true)`;
    return fn(tx);
  });
}

export async function withServiceRls<T>(
  fn: (tx: TxClient) => Promise<T>
): Promise<T> {
  return servicePrisma.$transaction(async (tx) => {
    await tx.$executeRaw`SELECT set_config('app.role', 'service', true)`;
    await tx.$executeRaw`SELECT set_config('app.current_user_id', '', true)`;
    return fn(tx);
  });
}

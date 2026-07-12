import { auth } from '@clerk/nextjs/server';

/**
 * Resource-level auth (Clerk recommended).
 * Signed-out users are redirected to sign-in.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await auth.protect();
  return children;
}

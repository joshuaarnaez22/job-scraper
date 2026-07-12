import { auth } from '@clerk/nextjs/server';
import { DashboardShell } from '@/components/DashboardShell';

/**
 * Resource-level auth (Clerk recommended).
 * Shared chrome: sidebar + scrape controls for all /dashboard/* routes.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await auth.protect();
  return <DashboardShell>{children}</DashboardShell>;
}

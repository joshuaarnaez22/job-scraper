import { clerkMiddleware } from '@clerk/nextjs/server';

/**
 * Next.js 16+: proxy.ts (formerly middleware.ts).
 * Clerk session/cookie handling only — do NOT gate routes with createRouteMatcher.
 * Protect pages/APIs at the resource (see dashboard/layout.tsx, requireCurrentUser).
 */
export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Clerk Frontend API proxy path
    '/__clerk/:path*',
  ],
};

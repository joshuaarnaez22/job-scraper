'use client';

import { Suspense } from 'react';
import BillingPageClient from './BillingPageClient';

export default function DashboardBillingPage() {
  return (
    <Suspense
      fallback={
        <div className="p-4 md:p-6">
          <div className="pixel-border bg-card p-8 text-center font-retro text-xs">
            LOADING…
          </div>
        </div>
      }
    >
      <BillingPageClient />
    </Suspense>
  );
}

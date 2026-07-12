'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/** Optional alias → landing pricing section */
export default function PricingAliasPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/#pricing');
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center font-retro text-xs">
      LOADING PRICING…
    </div>
  );
}

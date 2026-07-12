import Link from 'next/link';
import { BrandLogo } from '@/components/BrandLogo';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex h-14 items-center border-b-4 border-foreground bg-card px-4 md:px-8">
        <Link href="/">
          <BrandLogo size={24} />
        </Link>
      </header>
      <main className="mx-auto max-w-2xl flex-1 px-4 py-12 md:px-8">
        <h1 className="font-retro text-sm mb-6">{`> PRIVACY`}</h1>
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            JobScout stores your account email (via Clerk), search preferences,
            profile/CV data you upload, and job matches tied to your account.
          </p>
          <p>
            Payment data is handled by Stripe — we store customer and
            subscription IDs, not full card numbers.
          </p>
          <p>
            We use AI providers (DeepSeek, Mistral) to score jobs and draft cover
            letters when you enable those features. Do not put secrets in your
            profile you would not want processed by those APIs.
          </p>
          <p>
            This is a personal/hobby SaaS stub. Contact the operator if you need
            data deleted.
          </p>
        </div>
        <Link
          href="/"
          className="inline-block mt-8 font-retro text-[10px] underline"
        >
          ← BACK
        </Link>
      </main>
    </div>
  );
}

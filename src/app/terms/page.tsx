import Link from 'next/link';
import { BrandLogo } from '@/components/BrandLogo';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex h-14 items-center border-b-4 border-foreground bg-card px-4 md:px-8">
        <Link href="/">
          <BrandLogo size={24} />
        </Link>
      </header>
      <main className="mx-auto max-w-2xl flex-1 px-4 py-12 md:px-8">
        <h1 className="font-retro text-sm mb-6">{`> TERMS`}</h1>
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            JobScout is provided as-is for personal job search. Scraped listings
            belong to their source sites; we do not guarantee completeness or
            accuracy of third-party job data.
          </p>
          <p>
            Paid plans renew monthly via Stripe until canceled. Quotas (sites,
            AI matching, cover letters) follow your plan. Abuse, scraping
            beyond fair use, or reselling access may result in account
            termination.
          </p>
          <p>
            You are responsible for applications you send and for content in
            your profile and CVs.
          </p>
          <p>This stub is not legal advice — replace before a public launch.</p>
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

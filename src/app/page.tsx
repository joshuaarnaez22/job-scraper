import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { BrandLogo } from '@/components/BrandLogo';
import { PLANS, type PlanId } from '@/config/plans';

const STEPS = [
  {
    n: '01',
    title: 'SCRAPE',
    body: 'We pull listings from job boards on a shared schedule — once for everyone.',
  },
  {
    n: '02',
    title: 'MATCH',
    body: 'Your keywords and filters (plus optional AI) score what fits you.',
  },
  {
    n: '03',
    title: 'ALERT',
    body: 'Get a digest when new matches land — no tab babysitting.',
  },
  {
    n: '04',
    title: 'APPLY',
    body: 'Generate a tailored cover letter from your profile and CV.',
  },
] as const;

const PLAN_ORDER: PlanId[] = ['free', 'pro', 'pro_plus'];

export default async function Home() {
  const { userId } = await auth();
  if (userId) {
    redirect('/dashboard');
  }

  return (
    <div className="landing-root min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b-4 border-foreground bg-card/95 px-4 md:px-8 backdrop-blur-sm">
        <Link href="/" className="flex items-center">
          <BrandLogo size={28} />
        </Link>
        <div className="flex items-center gap-2">
            <Link
              href="/pricing"
              className="hidden sm:inline-block font-retro text-[10px] text-muted-foreground hover:text-foreground px-2"
            >
              PRICING
            </Link>
          <Show when="signed-out">
            <SignInButton mode="redirect" forceRedirectUrl="/dashboard">
              <button
                type="button"
                className="retro-btn px-3 py-1.5 bg-secondary border-2 border-foreground font-retro text-[10px]"
              >
                SIGN IN
              </button>
            </SignInButton>
            <SignUpButton mode="redirect" forceRedirectUrl="/dashboard">
              <button
                type="button"
                className="retro-btn px-3 py-1.5 bg-primary text-primary-foreground font-retro text-[10px]"
              >
                SIGN UP
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </header>

      {/* Hero — one composition */}
      <section className="relative flex flex-1 flex-col justify-center overflow-hidden border-b-4 border-foreground px-4 py-16 md:px-8 md:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-accent/40 blur-3xl md:h-96 md:w-96"
          aria-hidden
        />
        <div className="relative mx-auto w-full max-w-3xl">
          <BrandLogo
            size={64}
            wordmarkClassName="font-retro text-2xl md:text-4xl leading-relaxed tracking-wide"
            className="flex-col items-start gap-5 md:gap-6"
          />
          <h1 className="mt-8 max-w-xl font-retro text-sm leading-relaxed md:text-base md:leading-loose">
            Jobs that match you — not the other way around.
          </h1>
          <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
            Multi-board scraping, smart filters, and AI cover letters in one
            retro dashboard.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <SignUpButton mode="redirect" forceRedirectUrl="/dashboard">
              <button
                type="button"
                className="retro-btn px-6 py-3 bg-accent text-accent-foreground font-retro text-xs"
              >
                START FREE
              </button>
            </SignUpButton>
            <a
              href="#how"
              className="retro-btn px-6 py-3 bg-secondary border-2 border-foreground font-retro text-xs inline-flex items-center"
            >
              HOW IT WORKS
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how"
        className="border-b-4 border-foreground bg-card px-4 py-14 md:px-8 md:py-20"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="font-retro text-xs md:text-sm mb-2">{`> HOW IT WORKS`}</h2>
          <p className="text-sm text-muted-foreground mb-10 max-w-lg">
            Shared scrape pool → personal matches. Less noise, more signal.
          </p>
          <ol className="space-y-0 border-t-2 border-foreground">
            {STEPS.map((step) => (
              <li
                key={step.n}
                className="grid grid-cols-[auto_1fr] gap-4 border-b-2 border-foreground py-5 md:gap-8 md:py-6"
              >
                <span className="font-retro text-[10px] text-primary pt-0.5">
                  {step.n}
                </span>
                <div>
                  <div className="font-retro text-[11px] mb-2">{step.title}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Demo — stylized job list */}
      <section
        id="demo"
        className="border-b-4 border-foreground px-4 py-14 md:px-8 md:py-20"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="font-retro text-xs md:text-sm mb-2">{`> DEMO`}</h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-lg">
            Your dashboard looks like this — matches ranked, ready to apply.
          </p>
          <div className="pixel-border bg-card overflow-hidden">
            <div className="flex items-center justify-between border-b-2 border-foreground bg-primary px-3 py-2 text-primary-foreground">
              <span className="font-retro text-[10px]">{`> JOBS`}</span>
              <span className="font-retro text-[9px] opacity-80">3 NEW</span>
            </div>
            <ul>
              {[
                {
                  title: 'Senior Next.js Developer',
                  company: 'Remote Labs',
                  meta: 'OnlineJobs · ₱80k–120k · AI 92%',
                },
                {
                  title: 'Full-Stack Engineer',
                  company: 'Pacific Soft',
                  meta: 'OnlineJobs · PHP 60k+ · AI 88%',
                },
                {
                  title: 'React Native Contractor',
                  company: 'Northwind PH',
                  meta: 'OnlineJobs · Contract · AI 81%',
                },
              ].map((job, i) => (
                <li
                  key={job.title}
                  className={`px-3 py-3 md:px-4 ${
                    i < 2 ? 'border-b-2 border-dashed border-foreground/20' : ''
                  }`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-sm font-medium">{job.title}</span>
                    <span className="font-retro text-[8px] text-accent-foreground bg-accent px-1.5 py-0.5">
                      NEW
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {job.company}
                  </div>
                  <div className="font-retro text-[8px] text-muted-foreground mt-2 leading-relaxed">
                    {job.meta}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="border-b-4 border-foreground px-4 py-14 md:px-8 md:py-20"
      >
        <div className="mx-auto max-w-4xl">
          <h2 className="font-retro text-xs md:text-sm mb-2">{`> PRICING`}</h2>
          <p className="text-sm text-muted-foreground mb-10 max-w-lg">
            Start free. Upgrade when you want more boards and AI cover letters.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {PLAN_ORDER.map((id) => {
              const plan = PLANS[id];
              const featured = id === 'pro';
              return (
                <div
                  key={id}
                  className={`pixel-border bg-card p-5 flex flex-col gap-4 ${
                    featured ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <div>
                    <div className="font-retro text-[11px]">{plan.label}</div>
                    <div className="mt-2 text-lg font-medium">{plan.priceLabel}</div>
                    <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                      {plan.description}
                    </p>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 flex-1">
                    <li>· {plan.maxSites} site{plan.maxSites === 1 ? '' : 's'}</li>
                    <li>· AI matching: {plan.aiMatching ? 'yes' : 'no'}</li>
                    <li>
                      · Cover letters:{' '}
                      {plan.coverLettersPerMonth === 0
                        ? 'none'
                        : `${plan.coverLettersPerMonth}/mo`}
                    </li>
                  </ul>
                  <SignUpButton
                    mode="redirect"
                    forceRedirectUrl={
                      id === 'free' ? '/dashboard' : '/dashboard/billing'
                    }
                  >
                    <button
                      type="button"
                      className={`retro-btn w-full px-3 py-2.5 font-retro text-[10px] ${
                        featured
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-secondary border-2 border-foreground'
                      }`}
                    >
                      {id === 'free' ? 'START FREE' : `GET ${plan.label.toUpperCase()}`}
                    </button>
                  </SignUpButton>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="bg-card px-4 py-8 md:px-8">
        <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <BrandLogo size={20} wordmarkClassName="font-retro text-[10px]" />
          <nav className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="/pricing" className="hover:text-foreground">
              Pricing
            </Link>
          </nav>
          <p className="text-[10px] text-muted-foreground font-retro">
            © {new Date().getFullYear()} JOBSCOUT
          </p>
        </div>
      </footer>
    </div>
  );
}

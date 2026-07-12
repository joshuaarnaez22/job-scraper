import { redirect } from 'next/navigation';
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { BrandLogo } from '@/components/BrandLogo';

export default async function Home() {
  const { userId } = await auth();
  if (userId) {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-14 items-center justify-between border-b-4 border-foreground bg-card px-4 md:px-6">
        <BrandLogo size={28} />
        <div className="flex items-center gap-2">
          <Show when="signed-out">
            <SignInButton mode="redirect" forceRedirectUrl="/dashboard">
              <button className="retro-btn px-3 py-1.5 bg-secondary border-2 border-foreground font-retro text-[10px]">
                SIGN IN
              </button>
            </SignInButton>
            <SignUpButton mode="redirect" forceRedirectUrl="/dashboard">
              <button className="retro-btn px-3 py-1.5 bg-primary text-primary-foreground font-retro text-[10px]">
                SIGN UP
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-6 p-6 text-center">
        <BrandLogo
          size={72}
          wordmarkClassName="font-retro text-xl md:text-2xl leading-relaxed"
          className="flex-col gap-4"
        />
        <p className="max-w-md text-sm text-muted-foreground">
          Multi-site job scraping with AI matching and cover letters. Sign up to
          open your dashboard.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <SignUpButton mode="redirect" forceRedirectUrl="/dashboard">
            <button className="retro-btn px-6 py-3 bg-accent text-accent-foreground font-retro text-xs">
              START FREE
            </button>
          </SignUpButton>
          <SignInButton mode="redirect" forceRedirectUrl="/dashboard">
            <button className="retro-btn px-6 py-3 bg-secondary border-2 border-foreground font-retro text-xs">
              SIGN IN
            </button>
          </SignInButton>
        </div>
      </main>
    </div>
  );
}

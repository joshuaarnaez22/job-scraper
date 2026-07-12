'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { useQueryClient } from '@tanstack/react-query';
import { BrandLogo } from '@/components/BrandLogo';
import { ScrapeStatusModal } from '@/components/ScrapeStatusModal';

const navItems = [
  { href: '/dashboard', label: 'JOBS', match: (path: string) => path === '/dashboard' },
  {
    href: '/dashboard/profile',
    label: 'PROFILE',
    match: (path: string) => path.startsWith('/dashboard/profile'),
  },
  {
    href: '/dashboard/settings',
    label: 'SETTINGS',
    match: (path: string) => path.startsWith('/dashboard/settings'),
  },
  {
    href: '/dashboard/billing',
    label: 'BILLING',
    match: (path: string) => path.startsWith('/dashboard/billing'),
  },
] as const;

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrapeModalOpen, setIsScrapeModalOpen] = useState(false);

  const handleScrapeComplete = () => {
    queryClient.invalidateQueries({ queryKey: ['jobs'] });
    queryClient.invalidateQueries({ queryKey: ['stats'] });
  };

  const navClass = (active: boolean) =>
    `w-full text-left px-3 py-2 text-xs font-retro border-2 transition-all block ${
      active
        ? 'bg-primary text-primary-foreground border-primary translate-x-1'
        : 'bg-secondary border-foreground/20 hover:border-foreground hover:translate-x-1'
    }`;

  return (
    <div className="flex min-h-screen">
      <aside className="hidden md:flex md:w-56 md:flex-col md:fixed md:inset-y-0 border-r-4 border-foreground bg-card">
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex h-14 items-center border-b-4 border-foreground px-4">
            <Link href="/" className="flex items-center gap-2">
              <BrandLogo size={24} wordmarkClassName="font-retro text-sm" />
            </Link>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map((item) => {
              const active = item.match(pathname);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={navClass(active)}
                >
                  {`> ${item.label}`}
                </Link>
              );
            })}
          </nav>

          <div className="border-t-4 border-foreground p-3 space-y-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsScrapeModalOpen(true)}
              className="retro-btn w-full px-3 py-2.5 bg-accent text-accent-foreground font-retro text-[11px] leading-none"
            >
              RUN SCRAPE
            </button>
            <div
              role="button"
              tabIndex={0}
              onClick={(e) => {
                const trigger = e.currentTarget.querySelector<HTMLElement>(
                  '.cl-userButtonTrigger'
                );
                if (
                  trigger &&
                  trigger !== e.target &&
                  !trigger.contains(e.target as Node)
                ) {
                  trigger.click();
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.currentTarget.querySelector<HTMLElement>('.cl-userButtonTrigger')?.click();
                }
              }}
              className="flex w-full items-center gap-3 border-2 border-foreground bg-secondary px-3 py-2 text-left transition-colors hover:bg-muted cursor-pointer"
            >
              <UserButton
                appearance={{
                  elements: {
                    rootBox: 'shrink-0',
                    avatarBox: 'h-8 w-8 rounded-none border-2 border-foreground',
                    userButtonTrigger: 'focus:shadow-none',
                  },
                }}
              />
              <div className="min-w-0 flex-1 pointer-events-none">
                <div className="font-retro text-[9px] text-muted-foreground leading-none">
                  ACCOUNT
                </div>
                <div className="text-[10px] text-foreground/70 truncate mt-1">
                  Manage profile
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex h-14 items-center gap-4 border-b-4 border-foreground bg-card px-4">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 border-2 border-foreground hover:bg-muted"
          aria-label="Open menu"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <BrandLogo size={22} wordmarkClassName="font-retro text-xs" />
        <div className="ml-auto flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsScrapeModalOpen(true)}
            className="retro-btn px-3 py-1.5 bg-accent text-accent-foreground font-retro text-[10px] leading-none"
          >
            SCRAPE
          </button>
          <UserButton
            appearance={{
              elements: {
                rootBox: 'shrink-0',
                avatarBox: 'h-8 w-8 rounded-none border-2 border-foreground',
              },
            }}
          />
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-background/90"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed inset-y-0 left-0 w-56 bg-card border-r-4 border-foreground p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="font-retro text-sm mb-6">{`> MENU`}</div>
            <nav className="space-y-2">
              {navItems.map((item) => {
                const active = item.match(pathname);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={navClass(active)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      <main className="flex-1 md:pl-56">
        <div className="pt-14 md:pt-0">{children}</div>
      </main>

      <ScrapeStatusModal
        isOpen={isScrapeModalOpen}
        onClose={() => setIsScrapeModalOpen(false)}
        onComplete={handleScrapeComplete}
      />
    </div>
  );
}

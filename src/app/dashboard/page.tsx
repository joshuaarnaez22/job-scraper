'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { JobList } from '@/components/JobList';
import { FilterPanel, type FilterState } from '@/components/FilterPanel';
import { StatsOverview } from '@/components/StatsCard';
import { ProfileForm, type UserProfileData } from '@/components/ProfileForm';
import { CoverLetterModal } from '@/components/CoverLetterModal';
import type { JobData } from '@/components/JobCard';

type ActiveView = 'jobs' | 'profile' | 'settings';

function DashboardSkeleton() {
  return (
    <div className="flex min-h-screen animate-pulse">
      <aside className="hidden md:flex md:w-56 md:flex-col md:fixed md:inset-y-0 border-r-4 border-foreground bg-card" />
      <main className="flex-1 md:pl-56 p-6">
        <div className="h-20 bg-muted mb-6" />
        <div className="h-32 bg-muted mb-6" />
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <div className="h-96 bg-muted" />
          <div className="h-96 bg-muted" />
        </div>
      </main>
    </div>
  );
}

function getFiltersFromParams(searchParams: URLSearchParams): FilterState {
  return {
    search: searchParams.get('search') || '',
    site: searchParams.get('site') || '',
    status: searchParams.get('status') || '',
    days: searchParams.get('days') || '',
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortOrder: searchParams.get('sortOrder') || 'desc',
  };
}

function filtersToParams(filters: FilterState): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.search) params.set('search', filters.search);
  if (filters.site) params.set('site', filters.site);
  if (filters.status) params.set('status', filters.status);
  if (filters.days) params.set('days', filters.days);
  if (filters.sortBy !== 'createdAt') params.set('sortBy', filters.sortBy);
  if (filters.sortOrder !== 'desc') params.set('sortOrder', filters.sortOrder);
  return params;
}

async function fetchJobs(filters: FilterState, page: number) {
  const params = new URLSearchParams();
  if (filters.search) params.set('search', filters.search);
  if (filters.site) params.set('site', filters.site);
  if (filters.status) params.set('status', filters.status);
  if (filters.days) params.set('days', filters.days);
  params.set('sortBy', filters.sortBy);
  params.set('sortOrder', filters.sortOrder);
  params.set('page', String(page));

  const response = await fetch(`/api/jobs?${params}`);
  return response.json();
}

async function fetchStats() {
  const [totalRes, newRes, appliedRes, settingsRes] = await Promise.all([
    fetch('/api/jobs?limit=1'),
    fetch('/api/jobs?status=new&limit=1'),
    fetch('/api/jobs?status=applied&limit=1'),
    fetch('/api/settings'),
  ]);

  const [total, newJobs, applied, settings] = await Promise.all([
    totalRes.json(),
    newRes.json(),
    appliedRes.json(),
    settingsRes.json(),
  ]);

  const sites = new Set<string>();
  if (total.jobs) {
    total.jobs.forEach((job: JobData) => sites.add(job.site));
  }
  if (settings.enabledSites) {
    settings.enabledSites.forEach((site: string) => sites.add(site));
  }

  return {
    stats: {
      totalJobs: total.pagination?.total || 0,
      newJobs: newJobs.pagination?.total || 0,
      appliedJobs: applied.pagination?.total || 0,
      sitesEnabled: settings.enabledSites?.length || 0,
    },
    availableSites: Array.from(sites).sort(),
  };
}

async function fetchProfile() {
  const response = await fetch('/api/profile');
  return response.json();
}

function DashboardContent() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(() => {
    const p = searchParams.get('page');
    return p ? parseInt(p) : 1;
  });

  const filters = getFiltersFromParams(searchParams);

  const setFilters = useCallback((newFilters: FilterState) => {
    const params = filtersToParams(newFilters);
    params.set('page', '1');
    router.push(`/dashboard?${params.toString()}`, { scroll: false });
  }, [router]);

  const [selectedJob, setSelectedJob] = useState<JobData | null>(null);
  const [isCoverLetterOpen, setIsCoverLetterOpen] = useState(false);
  const [activeView, setActiveView] = useState<ActiveView>('jobs');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync page changes to URL
  useEffect(() => {
    const params = filtersToParams(filters);
    if (page > 1) params.set('page', String(page));
    router.push(`/dashboard?${params.toString()}`, { scroll: false });
  }, [page]);

  // Queries
  const { data: jobsData, isLoading: isLoadingJobs } = useQuery({
    queryKey: ['jobs', filters, page],
    queryFn: () => fetchJobs(filters, page),
  });

  const { data: statsData } = useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats,
  });

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });

  // Mutations
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      await fetch(`/api/jobs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });

  const saveProfileMutation = useMutation({
    mutationFn: async (data: UserProfileData) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to save profile');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  const scrapeMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/cron/scrape', { method: 'POST' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      alert(`Scrape complete! Found ${data.newJobs} new jobs.`);
    },
    onError: (error) => {
      alert(`Scrape failed: ${error.message}`);
    },
  });

  const handleStatusChange = (id: string, status: string) => {
    updateStatusMutation.mutate({ id, status });
  };

  const handleGenerateCoverLetter = (job: JobData) => {
    setSelectedJob(job);
    setIsCoverLetterOpen(true);
  };

  const navItems = [
    { id: 'jobs' as const, label: 'JOBS' },
    { id: 'profile' as const, label: 'PROFILE' },
    { id: 'settings' as const, label: 'SETTINGS' },
  ];

  const activeFiltersCount = [filters.search, filters.site, filters.status, filters.days].filter(Boolean).length;
  const jobs = jobsData?.jobs || [];
  const pagination = jobsData?.pagination || { page: 1, totalPages: 1, total: 0 };
  const stats = statsData?.stats || { totalJobs: 0, newJobs: 0, appliedJobs: 0, sitesEnabled: 0 };
  const availableSites = statsData?.availableSites || [];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:w-56 md:flex-col md:fixed md:inset-y-0 border-r-4 border-foreground bg-card">
        <div className="flex flex-col flex-1 min-h-0">
          {/* Logo */}
          <div className="flex h-14 items-center border-b-4 border-foreground px-4">
            <a href="/" className="flex items-center gap-2">
              <span className="font-retro text-sm">JOBSCOUT</span>
            </a>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full text-left px-3 py-2 text-xs font-retro border-2 transition-all ${
                  activeView === item.id
                    ? 'bg-primary text-primary-foreground border-primary translate-x-1'
                    : 'bg-secondary border-foreground/20 hover:border-foreground hover:translate-x-1'
                }`}
              >
                {`> ${item.label}`}
              </button>
            ))}
          </nav>

          {/* Scrape Button */}
          <div className="border-t-4 border-foreground p-4">
            <button
              onClick={() => scrapeMutation.mutate()}
              disabled={scrapeMutation.isPending}
              className="retro-btn w-full px-4 py-2 bg-accent text-accent-foreground font-retro text-xs disabled:opacity-50"
            >
              {scrapeMutation.isPending ? 'LOADING...' : 'RUN SCRAPE'}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex h-14 items-center gap-4 border-b-4 border-foreground bg-card px-4">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 border-2 border-foreground hover:bg-muted"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="font-retro text-xs">JOBSCOUT</span>
        <div className="ml-auto">
          <button
            onClick={() => scrapeMutation.mutate()}
            disabled={scrapeMutation.isPending}
            className="retro-btn px-3 py-1 bg-accent text-accent-foreground font-retro text-[10px]"
          >
            {scrapeMutation.isPending ? '...' : 'SCRAPE'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/90" onClick={() => setMobileMenuOpen(false)}>
          <div className="fixed inset-y-0 left-0 w-56 bg-card border-r-4 border-foreground p-4" onClick={(e) => e.stopPropagation()}>
            <div className="font-retro text-sm mb-6">{`> MENU`}</div>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs font-retro border-2 ${
                    activeView === item.id
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-secondary border-foreground/20'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:pl-56">
        <div className="pt-14 md:pt-0">
          {/* Jobs View */}
          {activeView === 'jobs' && (
            <div className="p-4 md:p-6 space-y-6">
              {/* Header */}
              <div className="pixel-border bg-card p-4">
                <h1 className="font-retro text-lg">{`> JOBS`}</h1>
                <p className="text-sm text-muted-foreground mt-1">Browse and manage scraped jobs</p>
              </div>

              {/* Stats */}
              <StatsOverview stats={stats} />

              {/* Mobile Filter Toggle */}
              <div className="lg:hidden">
                <button
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="retro-btn w-full px-4 py-2 bg-secondary flex items-center justify-between"
                >
                  <span className="flex items-center gap-2 text-xs font-retro">
                    FILTERS
                    {activeFiltersCount > 0 && (
                      <span className="px-2 py-0.5 bg-primary text-primary-foreground text-[10px]">
                        {activeFiltersCount}
                      </span>
                    )}
                  </span>
                  <span className="font-retro text-xs">{showMobileFilters ? '[-]' : '[+]'}</span>
                </button>
              </div>

              {/* Content Grid */}
              <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
                {/* Filters */}
                <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block`}>
                  <FilterPanel
                    filters={filters}
                    onFilterChange={(newFilters) => {
                      setFilters(newFilters);
                      setShowMobileFilters(false);
                    }}
                    availableSites={availableSites}
                  />
                </div>

                {/* Job List */}
                <div className="space-y-4">
                  <JobList
                    jobs={jobs}
                    onStatusChange={handleStatusChange}
                    onGenerateCoverLetter={handleGenerateCoverLetter}
                    isLoading={isLoadingJobs}
                  />

                  {/* Pagination */}
                  {pagination.totalPages > 1 && (
                    <div className="pixel-border bg-card p-4 flex flex-wrap items-center justify-between gap-4">
                      <span className="text-xs font-retro text-muted-foreground">
                        PAGE {pagination.page}/{pagination.totalPages}
                      </span>
                      <div className="flex gap-2">
                        <button
                          disabled={page === 1}
                          onClick={() => setPage((p) => p - 1)}
                          className="retro-btn px-4 py-2 bg-secondary text-xs disabled:opacity-50"
                        >
                          PREV
                        </button>
                        <button
                          disabled={page === pagination.totalPages}
                          onClick={() => setPage((p) => p + 1)}
                          className="retro-btn px-4 py-2 bg-secondary text-xs disabled:opacity-50"
                        >
                          NEXT
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Profile View */}
          {activeView === 'profile' && (
            <div className="p-4 md:p-6">
              <div className="mx-auto max-w-2xl">
                <div className="pixel-border bg-card p-4 mb-6">
                  <h1 className="font-retro text-lg">{`> PROFILE`}</h1>
                  <p className="text-sm text-muted-foreground mt-1">Manage your profile for cover letters</p>
                </div>
                {profile && (
                  <ProfileForm
                    initialData={profile}
                    onSave={async (data) => {
                      await saveProfileMutation.mutateAsync(data);
                    }}
                  />
                )}
              </div>
            </div>
          )}

          {/* Settings View */}
          {activeView === 'settings' && (
            <div className="p-4 md:p-6">
              <div className="mx-auto max-w-2xl">
                <div className="pixel-border bg-card p-4 mb-6">
                  <h1 className="font-retro text-lg">{`> SETTINGS`}</h1>
                  <p className="text-sm text-muted-foreground mt-1">Configure search preferences</p>
                </div>
                <div className="pixel-border bg-card p-8 text-center">
                  <div className="font-retro text-4xl mb-4 text-muted-foreground">WIP</div>
                  <h3 className="font-retro text-sm mb-2">COMING SOON</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure via API at{' '}
                    <code className="px-2 py-1 bg-muted border-2 border-foreground/20 text-xs font-mono">
                      /api/settings
                    </code>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <CoverLetterModal
        job={selectedJob}
        isOpen={isCoverLetterOpen}
        onClose={() => {
          setIsCoverLetterOpen(false);
          setSelectedJob(null);
        }}
      />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}

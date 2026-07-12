'use client';

import { useState, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { JobList } from '@/components/JobList';
import { FilterPanel, type FilterState } from '@/components/FilterPanel';
import { StatsOverview } from '@/components/StatsCard';
import { CoverLetterModal } from '@/components/CoverLetterModal';
import type { JobData } from '@/components/JobCard';

function DashboardSkeleton() {
  return (
    <div className="p-4 md:p-6 animate-pulse space-y-6">
      <div className="h-20 bg-muted" />
      <div className="h-32 bg-muted" />
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <div className="h-96 bg-muted" />
        <div className="h-96 bg-muted" />
      </div>
    </div>
  );
}

function getFiltersFromParams(searchParams: URLSearchParams): FilterState {
  return {
    search: searchParams.get('search') || '',
    site: searchParams.get('site') || 'onlinejobs',
    status: searchParams.get('status') || '',
    days: searchParams.get('days') || '',
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortOrder: searchParams.get('sortOrder') || 'desc',
  };
}

function filtersToParams(filters: FilterState): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.search) params.set('search', filters.search);
  if (filters.site && filters.site !== 'onlinejobs') params.set('site', filters.site);
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

function JobsContent() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters = getFiltersFromParams(searchParams);
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1);

  const pushFilters = useCallback(
    (nextFilters: FilterState, nextPage: number) => {
      const params = filtersToParams(nextFilters);
      if (nextPage > 1) params.set('page', String(nextPage));
      const qs = params.toString();
      const href = qs ? `/dashboard?${qs}` : '/dashboard';
      const current = searchParams.toString()
        ? `/dashboard?${searchParams.toString()}`
        : '/dashboard';
      if (href === current) return;
      router.replace(href, { scroll: false });
    },
    [router, searchParams]
  );

  const setFilters = useCallback(
    (newFilters: FilterState) => {
      pushFilters(newFilters, 1);
    },
    [pushFilters]
  );

  const setPage = useCallback(
    (updater: number | ((current: number) => number)) => {
      const next = typeof updater === 'function' ? updater(page) : updater;
      pushFilters(filters, Math.max(1, next));
    },
    [filters, page, pushFilters]
  );

  const [selectedJob, setSelectedJob] = useState<JobData | null>(null);
  const [isCoverLetterOpen, setIsCoverLetterOpen] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { data: jobsData, isLoading: isLoadingJobs } = useQuery({
    queryKey: ['jobs', filters, page],
    queryFn: () => fetchJobs(filters, page),
  });

  const { data: statsData } = useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats,
  });

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

  const activeFiltersCount = [
    filters.search,
    filters.site,
    filters.status,
    filters.days,
  ].filter(Boolean).length;
  const jobs = jobsData?.jobs || [];
  const pagination = jobsData?.pagination || {
    page: 1,
    totalPages: 1,
    total: 0,
  };
  const stats = statsData?.stats || {
    totalJobs: 0,
    newJobs: 0,
    appliedJobs: 0,
    sitesEnabled: 0,
  };

  return (
    <>
      <div className="p-4 md:p-6 space-y-6">
        <div className="pixel-border bg-card p-4">
          <h1 className="font-retro text-lg">{`> JOBS`}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Browse and manage scraped jobs
          </p>
        </div>

        <StatsOverview stats={stats} />

        <div className="lg:hidden">
          <button
            type="button"
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
            <span className="font-retro text-xs">
              {showMobileFilters ? '[-]' : '[+]'}
            </span>
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block`}>
            <FilterPanel
              filters={filters}
              onFilterChange={(newFilters) => {
                setFilters(newFilters);
                setShowMobileFilters(false);
              }}
            />
          </div>

          <div className="space-y-4">
            <JobList
              jobs={jobs}
              onStatusChange={(id, status) =>
                updateStatusMutation.mutate({ id, status })
              }
              onGenerateCoverLetter={(job) => {
                setSelectedJob(job);
                setIsCoverLetterOpen(true);
              }}
              isLoading={isLoadingJobs}
            />

            {pagination.totalPages > 1 && (
              <div className="pixel-border bg-card p-4 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs font-retro text-muted-foreground">
                  PAGE {pagination.page}/{pagination.totalPages}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="retro-btn px-4 py-2 bg-secondary text-xs disabled:opacity-50"
                  >
                    PREV
                  </button>
                  <button
                    type="button"
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

      <CoverLetterModal
        job={selectedJob}
        isOpen={isCoverLetterOpen}
        onClose={() => {
          setIsCoverLetterOpen(false);
          setSelectedJob(null);
        }}
      />
    </>
  );
}

export default function DashboardJobsPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <JobsContent />
    </Suspense>
  );
}

'use client';

import { useEffect, useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

interface ScrapeStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (result: { newJobs: number; error?: string }) => void;
}

interface StreamedJob {
  id: string;
  externalId: string;
  site: string;
  title: string;
  company: string;
  salary?: string;
  url: string;
  jobType?: string;
  postedAt?: string;
}

const DATE_OPTIONS = [
  { value: '1', label: '24 HOURS' },
  { value: '3', label: '3 DAYS' },
  { value: '7', label: '1 WEEK' },
  { value: '14', label: '2 WEEKS' },
];

export function ScrapeStatusModal({ isOpen, onClose, onComplete }: ScrapeStatusModalProps) {
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [daysPosted, setDaysPosted] = useState('7');
  const [fetchFullDetails, setFetchFullDetails] = useState(false);
  const [jobs, setJobs] = useState<StreamedJob[]>([]);
  const [currentSite, setCurrentSite] = useState<string | null>(null);
  const [stats, setStats] = useState({ totalFound: 0, newJobs: 0, filtered: 0, duplicates: 0 });
  const [error, setError] = useState<string | null>(null);
  const jobsContainerRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setJobs([]);
      setCurrentSite(null);
      setStats({ totalFound: 0, newJobs: 0, filtered: 0, duplicates: 0 });
      setError(null);
    } else {
      // Close SSE connection when modal closes
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    }
  }, [isOpen]);

  // Auto-scroll to bottom when new jobs arrive
  useEffect(() => {
    if (jobsContainerRef.current) {
      jobsContainerRef.current.scrollTop = jobsContainerRef.current.scrollHeight;
    }
  }, [jobs]);

  const runScrape = () => {
    setStatus('running');
    setJobs([]);
    setStats({ totalFound: 0, newJobs: 0, filtered: 0, duplicates: 0 });
    setError(null);

    const params = new URLSearchParams();
    if (daysPosted) params.set('daysPosted', daysPosted);
    if (fetchFullDetails) params.set('fetchFullDetails', 'true');

    const eventSource = new EventSource(`/api/cron/scrape/stream?${params}`);
    eventSourceRef.current = eventSource;

    eventSource.addEventListener('start', (e) => {
      const data = JSON.parse(e.data);
      console.log('[Scrape] Started:', data);
    });

    eventSource.addEventListener('site-start', (e) => {
      const data = JSON.parse(e.data);
      setCurrentSite(data.site);
    });

    eventSource.addEventListener('site-complete', (e) => {
      const data = JSON.parse(e.data);
      console.log('[Scrape] Site complete:', data.site);
    });

    eventSource.addEventListener('job', (e) => {
      const job = JSON.parse(e.data) as StreamedJob;
      setJobs((prev) => [...prev, job]);
      setStats((prev) => ({
        ...prev,
        totalFound: prev.totalFound + 1,
        newJobs: prev.newJobs + 1,
      }));
    });

    eventSource.addEventListener('job-filtered', (e) => {
      setStats((prev) => ({
        ...prev,
        totalFound: prev.totalFound + 1,
        filtered: prev.filtered + 1,
      }));
    });

    eventSource.addEventListener('job-duplicate', (e) => {
      setStats((prev) => ({
        ...prev,
        totalFound: prev.totalFound + 1,
        duplicates: prev.duplicates + 1,
      }));
    });

    eventSource.addEventListener('complete', (e) => {
      const data = JSON.parse(e.data);
      setStats({
        totalFound: data.totalFound,
        newJobs: data.newJobs,
        filtered: data.filtered,
        duplicates: data.totalFound - data.newJobs - data.filtered,
      });
      setStatus('success');
      setCurrentSite(null);
      eventSource.close();
      onComplete({ newJobs: data.newJobs });
    });

    eventSource.addEventListener('error', (e: Event) => {
      const messageEvent = e as MessageEvent;
      if (messageEvent.data) {
        try {
          const data = JSON.parse(messageEvent.data);
          setError(data.message);
        } catch {
          setError('Connection lost');
        }
      } else {
        setError('Connection lost');
      }
      setStatus('error');
      eventSource.close();
    });

    eventSource.onerror = () => {
      if (status === 'running') {
        setError('Connection lost');
        setStatus('error');
      }
      eventSource.close();
    };
  };

  const handleClose = () => {
    if (status === 'running') return;
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg p-0 gap-0 border-4 border-foreground bg-card !rounded-none max-h-[90vh] flex flex-col">
        <DialogTitle className="sr-only">Job Scraper</DialogTitle>

        {/* Header */}
        <div className="px-4 py-3 border-b-4 border-foreground bg-primary text-primary-foreground shrink-0">
          <h2 className="font-retro text-sm">{`> SCRAPER`}</h2>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {/* Idle State - Configuration */}
          {status === 'idle' && (
            <>
              <div className="text-center mb-6">
                <div className="font-retro text-4xl text-primary mb-4">{`[>>]`}</div>
                <p className="font-retro text-xs mb-2">READY TO SCRAPE</p>
                <p className="text-sm text-muted-foreground">
                  Configure options and start scraping
                </p>
              </div>

              {/* Date Range Selector */}
              <div className="mb-6">
                <p className="text-[10px] font-retro text-muted-foreground mb-2">JOBS POSTED WITHIN:</p>
                <div className="grid grid-cols-2 gap-2">
                  {DATE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setDaysPosted(option.value)}
                      className={`px-2 py-2 text-[10px] font-retro border-2 transition-colors ${
                        daysPosted === option.value
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-secondary border-foreground/20 hover:border-foreground'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fetch Full Details Toggle */}
              <div className="mb-6">
                <button
                  onClick={() => setFetchFullDetails(!fetchFullDetails)}
                  className={`w-full px-4 py-3 text-left border-2 transition-colors flex items-center justify-between ${
                    fetchFullDetails
                      ? 'bg-primary/10 border-primary'
                      : 'bg-secondary border-foreground/20 hover:border-foreground'
                  }`}
                >
                  <div>
                    <p className="text-xs font-retro">FETCH FULL DETAILS</p>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {fetchFullDetails
                        ? 'Slower - fetches each job page for complete description'
                        : 'Faster - uses listing data only (recommended)'}
                    </p>
                  </div>
                  <div
                    className={`w-10 h-6 border-2 border-foreground relative transition-colors ${
                      fetchFullDetails ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-4 h-4 bg-foreground transition-all ${
                        fetchFullDetails ? 'left-4' : 'left-0.5'
                      }`}
                    />
                  </div>
                </button>
              </div>

              {/* Site Info */}
              <div className="mb-6">
                <p className="text-[10px] font-retro text-muted-foreground mb-2">TARGET SITE:</p>
                <div className="flex justify-center">
                  <div className="px-6 py-3 border-2 border-foreground/20 bg-muted/30 text-center">
                    <div className="font-retro text-sm">ONLINEJOBS.PH</div>
                  </div>
                </div>
              </div>

              {/* Start Button */}
              <div className="text-center">
                <button
                  onClick={runScrape}
                  className="retro-btn px-8 py-3 bg-accent text-accent-foreground font-retro text-xs"
                >
                  START SCRAPE
                </button>
              </div>
            </>
          )}

          {/* Running State */}
          {status === 'running' && (
            <>
              {/* Stats Bar */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                <div className="p-2 border-2 border-foreground/20 text-center">
                  <p className="font-retro text-lg text-primary">{stats.newJobs}</p>
                  <p className="text-[8px] font-retro text-muted-foreground">NEW</p>
                </div>
                <div className="p-2 border-2 border-foreground/20 text-center">
                  <p className="font-retro text-lg">{stats.duplicates}</p>
                  <p className="text-[8px] font-retro text-muted-foreground">DUPES</p>
                </div>
                <div className="p-2 border-2 border-foreground/20 text-center">
                  <p className="font-retro text-lg">{stats.filtered}</p>
                  <p className="text-[8px] font-retro text-muted-foreground">FILTERED</p>
                </div>
                <div className="p-2 border-2 border-foreground/20 text-center">
                  <p className="font-retro text-lg">{stats.totalFound}</p>
                  <p className="text-[8px] font-retro text-muted-foreground">TOTAL</p>
                </div>
              </div>

              {/* Current Activity */}
              <div className="flex items-center gap-3 mb-4 p-3 border-2 border-primary bg-primary/10">
                <div className="font-retro text-xl animate-spin">@</div>
                <div>
                  <p className="text-xs font-retro">SCRAPING...</p>
                  {currentSite && (
                    <p className="text-[10px] text-muted-foreground">{currentSite.toUpperCase()}</p>
                  )}
                </div>
              </div>

              {/* Live Job Feed */}
              <div className="mb-4">
                <p className="text-[10px] font-retro text-muted-foreground mb-2">LIVE FEED:</p>
                <div
                  ref={jobsContainerRef}
                  className="h-48 overflow-y-auto border-2 border-foreground/20 bg-muted/30"
                >
                  {jobs.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground text-xs">
                      Waiting for jobs...
                    </div>
                  ) : (
                    <div className="divide-y divide-foreground/10">
                      {jobs.map((job, idx) => (
                        <div key={job.id || idx} className="p-2 hover:bg-muted/50">
                          <p className="text-xs font-medium truncate">{job.title}</p>
                          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                            <span>{job.company}</span>
                            {job.salary && (
                              <>
                                <span>•</span>
                                <span className="text-primary">{job.salary}</span>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs text-muted-foreground font-retro animate-pulse">
                  PLEASE WAIT...
                </p>
              </div>
            </>
          )}

          {/* Success State */}
          {status === 'success' && (
            <>
              <div className="text-center mb-6">
                <div className="font-retro text-4xl text-[#6bcb77]">{`[OK]`}</div>
              </div>

              <div className="text-center mb-6">
                <p className="font-retro text-xs text-[#6bcb77] mb-2">COMPLETE!</p>
                <p className="text-sm text-muted-foreground">
                  Found <span className="font-retro text-foreground">{stats.newJobs}</span> new jobs
                </p>
              </div>

              {/* Final Stats */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                <div className="p-2 border-2 border-[#6bcb77] bg-[#6bcb77]/10 text-center">
                  <p className="font-retro text-lg text-[#6bcb77]">{stats.newJobs}</p>
                  <p className="text-[8px] font-retro text-muted-foreground">NEW</p>
                </div>
                <div className="p-2 border-2 border-foreground/20 text-center">
                  <p className="font-retro text-lg">{stats.duplicates}</p>
                  <p className="text-[8px] font-retro text-muted-foreground">DUPES</p>
                </div>
                <div className="p-2 border-2 border-foreground/20 text-center">
                  <p className="font-retro text-lg">{stats.filtered}</p>
                  <p className="text-[8px] font-retro text-muted-foreground">FILTERED</p>
                </div>
                <div className="p-2 border-2 border-foreground/20 text-center">
                  <p className="font-retro text-lg">{stats.totalFound}</p>
                  <p className="text-[8px] font-retro text-muted-foreground">TOTAL</p>
                </div>
              </div>

              {/* Jobs Found List */}
              {jobs.length > 0 && (
                <div className="mb-4">
                  <p className="text-[10px] font-retro text-muted-foreground mb-2">NEW JOBS FOUND:</p>
                  <div className="h-32 overflow-y-auto border-2 border-foreground/20 bg-muted/30">
                    <div className="divide-y divide-foreground/10">
                      {jobs.map((job, idx) => (
                        <a
                          key={job.id || idx}
                          href={job.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-2 hover:bg-muted/50"
                        >
                          <p className="text-xs font-medium truncate">{job.title}</p>
                          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                            <span>{job.company}</span>
                            {job.salary && (
                              <>
                                <span>•</span>
                                <span className="text-primary">{job.salary}</span>
                              </>
                            )}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="text-center">
                <button
                  onClick={handleClose}
                  className="retro-btn px-6 py-2 bg-primary text-primary-foreground font-retro text-xs"
                >
                  VIEW JOBS
                </button>
              </div>
            </>
          )}

          {/* Error State */}
          {status === 'error' && (
            <>
              <div className="text-center mb-6">
                <div className="font-retro text-4xl text-destructive">{`[!!]`}</div>
              </div>

              <div className="text-center mb-6">
                <p className="font-retro text-xs text-destructive mb-2">FAILED</p>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>

              {/* Show any jobs that were found before error */}
              {jobs.length > 0 && (
                <div className="mb-4">
                  <p className="text-[10px] font-retro text-muted-foreground mb-2">
                    JOBS FOUND BEFORE ERROR: {jobs.length}
                  </p>
                </div>
              )}

              <div className="text-center">
                <button
                  onClick={handleClose}
                  className="retro-btn px-6 py-2 bg-primary text-primary-foreground font-retro text-xs"
                >
                  CLOSE
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t-2 border-dashed border-foreground/20 bg-muted/30 shrink-0">
          <p className="text-[10px] text-muted-foreground text-center font-retro">
            {status === 'idle' && 'JOBS STREAM IN REAL-TIME AS THEY ARE FOUND'}
            {status === 'running' && 'DO NOT CLOSE THIS WINDOW'}
            {(status === 'success' || status === 'error') && 'SCRAPE SESSION ENDED'}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

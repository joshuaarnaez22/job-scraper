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

interface StatusLog {
  site: string;
  status: string;
  jobsFound: number;
  newJobs: number;
  error: string | null;
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
  const [logs, setLogs] = useState<StatusLog[]>([]);
  const [stats, setStats] = useState({ newJobs: 0, sitesDone: 0 });
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'queued' | 'sync'>('queued');
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setLogs([]);
      setStats({ newJobs: 0, sitesDone: 0 });
      setError(null);
      setMode('queued');
    } else if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  const stopPolling = () => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  };

  const runScrape = async () => {
    setStatus('running');
    setLogs([]);
    setStats({ newJobs: 0, sitesDone: 0 });
    setError(null);

    try {
      const res = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ daysPosted: Number(daysPosted) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to start scrape');

      // Sync / fallback finished immediately
      if (!data.queued) {
        setMode('sync');
        setStats({
          newJobs: data.newCatalogJobs ?? data.userMatchesCreated ?? 0,
          sitesDone: data.results?.length ?? 0,
        });
        setLogs(
          (data.results || []).map(
            (r: {
              site: string;
              jobsFound: number;
              newJobs: number;
              error?: string;
            }) => ({
              site: r.site,
              status: r.error ? 'error' : 'success',
              jobsFound: r.jobsFound,
              newJobs: r.newJobs,
              error: r.error ?? null,
            })
          )
        );
        setStatus(data.error ? 'error' : 'success');
        onComplete({ newJobs: data.newCatalogJobs ?? data.userMatchesCreated ?? 0 });
        return;
      }

      setMode('queued');
      const since = data.enqueuedAt || new Date().toISOString();
      let ticks = 0;

      pollRef.current = setInterval(async () => {
        ticks += 1;
        try {
          const statusRes = await fetch(
            `/api/scrape?since=${encodeURIComponent(since)}`
          );
          const statusData = await statusRes.json();
          if (statusData.logs) {
            setLogs(statusData.logs);
            setStats({
              newJobs: statusData.newJobs ?? 0,
              sitesDone: statusData.logs.length,
            });
          }

          // Complete once we have logs, or after ~3 minutes
          if (statusData.complete || ticks >= 36) {
            stopPolling();
            if (statusData.hasError && statusData.newJobs === 0) {
              setStatus('error');
              setError('Scrape finished with errors');
              onComplete({ newJobs: 0, error: 'Scrape finished with errors' });
            } else {
              setStatus('success');
              onComplete({ newJobs: statusData.newJobs ?? 0 });
            }
          }
        } catch {
          // keep polling
        }
      }, 5000);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Scrape failed');
    }
  };

  const handleClose = () => {
    if (status === 'running') return;
    stopPolling();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg p-0 gap-0 border-4 border-foreground bg-card !rounded-none max-h-[90vh] flex flex-col">
        <DialogTitle className="sr-only">Job Scraper</DialogTitle>

        <div className="px-4 py-3 border-b-4 border-foreground bg-primary text-primary-foreground shrink-0">
          <h2 className="font-retro text-sm">{`> SCRAPER`}</h2>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {status === 'idle' && (
            <>
              <div className="text-center mb-6">
                <div className="font-retro text-4xl text-primary mb-4">{`[>>]`}</div>
                <p className="font-retro text-xs mb-2">READY TO SCRAPE</p>
                <p className="text-sm text-muted-foreground">
                  Queues a background job via Inngest (Tier-1 sites)
                </p>
              </div>

              <div className="mb-6">
                <p className="text-[10px] font-retro text-muted-foreground mb-2">
                  JOBS POSTED WITHIN:
                </p>
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

              <div className="mb-6">
                <p className="text-[10px] font-retro text-muted-foreground mb-2">
                  TIER-1 SITES:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['ONLINEJOBS', 'REMOTEOK', 'UPWORK'].map((s) => (
                    <div
                      key={s}
                      className="px-3 py-2 border-2 border-foreground/20 bg-muted/30 font-retro text-[10px]"
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>

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

          {status === 'running' && (
            <>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="p-2 border-2 border-foreground/20 text-center">
                  <p className="font-retro text-lg text-primary">{stats.newJobs}</p>
                  <p className="text-[8px] font-retro text-muted-foreground">NEW</p>
                </div>
                <div className="p-2 border-2 border-foreground/20 text-center">
                  <p className="font-retro text-lg">{stats.sitesDone}</p>
                  <p className="text-[8px] font-retro text-muted-foreground">SITE LOGS</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4 p-3 border-2 border-primary bg-primary/10">
                <div className="font-retro text-xl animate-spin">@</div>
                <div>
                  <p className="text-xs font-retro">
                    {mode === 'queued' ? 'QUEUED / RUNNING...' : 'RUNNING...'}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Polling scrape status
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-[10px] font-retro text-muted-foreground mb-2">
                  SITE STATUS:
                </p>
                <div className="h-40 overflow-y-auto border-2 border-foreground/20 bg-muted/30">
                  {logs.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground text-xs">
                      Waiting for workers...
                    </div>
                  ) : (
                    <div className="divide-y divide-foreground/10">
                      {logs.map((log, idx) => (
                        <div key={`${log.site}-${idx}`} className="p-2">
                          <p className="text-xs font-medium">
                            {log.site.toUpperCase()} — {log.status}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            found {log.jobsFound} / new {log.newJobs}
                            {log.error ? ` / ${log.error}` : ''}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="text-center mb-6">
                <div className="font-retro text-4xl text-[#6bcb77]">{`[OK]`}</div>
                <p className="font-retro text-xs text-[#6bcb77] mt-4 mb-2">COMPLETE!</p>
                <p className="text-sm text-muted-foreground">
                  Matched{' '}
                  <span className="font-retro text-foreground">{stats.newJobs}</span>{' '}
                  new jobs
                </p>
              </div>
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

          {status === 'error' && (
            <>
              <div className="text-center mb-6">
                <div className="font-retro text-4xl text-destructive">{`[!!]`}</div>
                <p className="font-retro text-xs text-destructive mt-4 mb-2">FAILED</p>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
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

        <div className="px-4 py-2 border-t-2 border-dashed border-foreground/20 bg-muted/30 shrink-0">
          <p className="text-[10px] text-muted-foreground text-center font-retro">
            {status === 'idle' && 'BACKGROUND QUEUE VIA INNGEST'}
            {status === 'running' && 'DO NOT CLOSE THIS WINDOW'}
            {(status === 'success' || status === 'error') && 'SCRAPE SESSION ENDED'}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

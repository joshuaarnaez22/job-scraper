'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PAID_PLANS, PLANS, type PlanId } from '@/config/plans';

type BillingSnapshot = {
  plan: PlanId;
  limits: (typeof PLANS)[PlanId];
  subscriptionStatus: string;
  periodEnd: string | null;
  coverLettersUsed: number;
  coverLettersRemaining: number | null;
  stripeConfigured: boolean;
};

export default function BillingPageClient() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const success = searchParams.get('success') === '1';
  const canceled = searchParams.get('canceled') === '1';
  const [syncing, setSyncing] = useState(success);
  const [syncNote, setSyncNote] = useState<string | null>(
    success ? 'Confirming subscription with Stripe…' : null
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ['billing'],
    queryFn: async () => {
      const res = await fetch('/api/billing');
      if (!res.ok) throw new Error('Failed to load billing');
      return res.json() as Promise<BillingSnapshot>;
    },
  });

  useEffect(() => {
    if (!success) return;

    let cancelled = false;

    (async () => {
      setSyncing(true);
      setSyncNote('Confirming subscription with Stripe…');
      try {
        const res = await fetch('/api/billing/sync', { method: 'POST' });
        const body = await res.json();
        if (!res.ok) throw new Error(body.error || 'Sync failed');
        if (cancelled) return;
        queryClient.setQueryData(['billing'], body);
        await queryClient.invalidateQueries({ queryKey: ['billing'] });
        if (body.plan && body.plan !== 'free') {
          setSyncNote(`You're on ${body.limits?.label ?? body.plan}.`);
        } else {
          setSyncNote(
            'Checkout recorded, but no active subscription yet. Try SYNC NOW.'
          );
        }
      } catch (err) {
        if (!cancelled) {
          setSyncNote(
            err instanceof Error ? err.message : 'Could not sync plan from Stripe'
          );
        }
      } finally {
        if (!cancelled) setSyncing(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [success, queryClient]);

  const checkout = useMutation({
    mutationFn: async (plan: PlanId) => {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || 'Checkout failed');
      return body as { url: string };
    },
    onSuccess: ({ url }) => {
      window.location.href = url;
    },
  });

  const portal = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/billing/portal', { method: 'POST' });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || 'Portal failed');
      return body as { url: string };
    },
    onSuccess: ({ url }) => {
      window.location.href = url;
    },
  });

  const actionError =
    checkout.error instanceof Error
      ? checkout.error.message
      : portal.error instanceof Error
        ? portal.error.message
        : null;

  return (
    <div className="p-4 md:p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="pixel-border bg-card p-4">
          <h1 className="font-retro text-lg">{`> BILLING`}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Plans, quotas, and Stripe subscription management
          </p>
        </div>

        {success && (
          <div className="pixel-border bg-card p-4 text-sm text-green-700 space-y-3">
            <p>
              {syncing
                ? 'Confirming subscription with Stripe…'
                : syncNote || 'Checkout complete.'}
            </p>
            <button
              type="button"
              className="retro-btn px-4 py-2 bg-accent text-accent-foreground font-retro text-[10px] disabled:opacity-50 cursor-pointer"
              disabled={syncing}
              onClick={async () => {
                setSyncing(true);
                try {
                  const res = await fetch('/api/billing/sync', { method: 'POST' });
                  const body = await res.json();
                  if (!res.ok) throw new Error(body.error || 'Sync failed');
                  queryClient.setQueryData(['billing'], body);
                  await queryClient.invalidateQueries({ queryKey: ['billing'] });
                  setSyncNote(
                    body.plan !== 'free'
                      ? `You're on ${body.limits?.label ?? body.plan}.`
                      : 'Still on Free — no active Stripe subscription found.'
                  );
                } catch (err) {
                  setSyncNote(
                    err instanceof Error ? err.message : 'Sync failed'
                  );
                } finally {
                  setSyncing(false);
                }
              }}
            >
              {syncing ? 'SYNCING…' : 'REFRESH PLAN'}
            </button>
          </div>
        )}
        {canceled && (
          <div className="pixel-border bg-card p-4 text-sm text-muted-foreground">
            Checkout canceled.
          </div>
        )}

        {isLoading && !data && (
          <div className="pixel-border bg-card p-8 text-center font-retro text-xs">
            LOADING…
          </div>
        )}
        {error && (
          <div className="pixel-border bg-card p-4 text-sm text-destructive">
            Failed to load billing.
          </div>
        )}

        {data && (
          <>
            <div className="pixel-border bg-card p-4 space-y-3">
              <h2 className="font-retro text-xs pb-2 border-b-2 border-dashed border-foreground/20">
                CURRENT PLAN
              </h2>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <div className="font-retro text-sm">{data.limits.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Status: {data.subscriptionStatus}
                    {data.periodEnd && (
                      <>
                        {' '}
                        · renews/ends{' '}
                        {new Date(data.periodEnd).toLocaleDateString()}
                      </>
                    )}
                  </div>
                </div>
                <div className="font-retro text-xs">{data.limits.priceLabel}</div>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                <li>Up to {data.limits.maxSites} site(s)</li>
                <li>AI matching: {data.limits.aiMatching ? 'yes' : 'no'}</li>
                <li>
                  Cover letters this month: {data.coverLettersUsed}
                  {data.limits.coverLettersPerMonth > 0
                    ? ` / ${data.limits.coverLettersPerMonth}`
                    : ' (upgrade required)'}
                </li>
              </ul>
              {data.plan !== 'free' && (
                <button
                  type="button"
                  disabled={portal.isPending || !data.stripeConfigured}
                  onClick={() => portal.mutate()}
                  className="retro-btn px-4 py-2 bg-secondary border-2 border-foreground font-retro text-[10px] disabled:opacity-50"
                >
                  {portal.isPending ? 'OPENING…' : 'MANAGE SUBSCRIPTION'}
                </button>
              )}
              {!data.stripeConfigured && (
                <p className="text-xs text-amber-700">
                  Stripe env vars not set yet (STRIPE_SECRET_KEY, STRIPE_PRICE_PRO,
                  STRIPE_PRICE_PRO_PLUS, STRIPE_WEBHOOK_SECRET).
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {(Object.keys(PLANS) as PlanId[]).map((planId) => {
                const plan = PLANS[planId];
                const current = data.plan === planId;
                const paid = PAID_PLANS.includes(planId);
                return (
                  <div
                    key={planId}
                    className={`pixel-border bg-card p-4 flex flex-col gap-3 ${
                      current ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <div>
                      <div className="font-retro text-xs">{plan.label}</div>
                      <div className="text-sm mt-1">{plan.priceLabel}</div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {plan.description}
                      </p>
                    </div>
                    {current ? (
                      <span className="font-retro text-[10px] text-muted-foreground">
                        CURRENT
                      </span>
                    ) : paid ? (
                      <button
                        type="button"
                        disabled={checkout.isPending || !data.stripeConfigured}
                        onClick={() => checkout.mutate(planId)}
                        className="retro-btn mt-auto px-3 py-2 bg-accent text-accent-foreground font-retro text-[10px] disabled:opacity-50"
                      >
                        {checkout.isPending && checkout.variables === planId
                          ? 'REDIRECTING…'
                          : 'UPGRADE'}
                      </button>
                    ) : (
                      <span className="text-xs text-muted-foreground mt-auto">
                        Default plan
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {actionError && (
              <p className="text-sm text-destructive">{actionError}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

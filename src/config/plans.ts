/**
 * SaaS plan definitions and quotas (Phase 2b)
 */

export type PlanId = 'free' | 'pro' | 'pro_plus';

export type PlanLimits = {
  /** Max job boards a user may enable (intersected with sites.ts) */
  maxSites: number;
  /** Cover letters / improve calls per calendar month */
  coverLettersPerMonth: number;
  /** DeepSeek relevance scoring during match */
  aiMatching: boolean;
  label: string;
  priceLabel: string;
  description: string;
};

export const PLANS: Record<PlanId, PlanLimits> = {
  free: {
    maxSites: 1,
    coverLettersPerMonth: 0,
    aiMatching: false,
    label: 'Free',
    priceLabel: '$0',
    description: '1 site, daily digest, no AI cover letters',
  },
  pro: {
    maxSites: 5,
    coverLettersPerMonth: 20,
    aiMatching: true,
    label: 'Pro',
    priceLabel: '$15/mo',
    description: 'Up to 5 sites, AI scoring, 20 cover letters/mo',
  },
  pro_plus: {
    maxSites: 99,
    coverLettersPerMonth: 100,
    aiMatching: true,
    label: 'Pro+',
    priceLabel: '$29/mo',
    description: 'All sites, AI scoring, 100 cover letters/mo',
  },
};

export const PAID_PLANS: PlanId[] = ['pro', 'pro_plus'];

export function isPlanId(value: string): value is PlanId {
  return value === 'free' || value === 'pro' || value === 'pro_plus';
}

export function normalizePlan(plan: string | null | undefined): PlanId {
  if (plan && isPlanId(plan)) return plan;
  return 'free';
}

export function getPlanLimits(plan: string | null | undefined): PlanLimits {
  return PLANS[normalizePlan(plan)];
}

/** Stripe Price ID → plan (from env) */
export function planFromStripePriceId(priceId: string | null | undefined): PlanId | null {
  if (!priceId) return null;
  if (priceId === process.env.STRIPE_PRICE_PRO) return 'pro';
  if (priceId === process.env.STRIPE_PRICE_PRO_PLUS) return 'pro_plus';
  return null;
}

export function stripePriceIdForPlan(plan: PlanId): string | null {
  if (plan === 'pro') return process.env.STRIPE_PRICE_PRO || null;
  if (plan === 'pro_plus') return process.env.STRIPE_PRICE_PRO_PLUS || null;
  return null;
}

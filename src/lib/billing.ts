/**
 * Billing helpers: quotas, usage, plan sync
 */

import {
  getPlanLimits,
  normalizePlan,
  type PlanId,
  type PlanLimits,
} from '@/config/plans';
import type { User } from '@/generated/prisma';
import { withServiceRls, withUserRls } from './rls';

export type BillingSnapshot = {
  plan: PlanId;
  limits: PlanLimits;
  subscriptionStatus: string;
  periodEnd: string | null;
  coverLettersUsed: number;
  coverLettersRemaining: number | null;
  stripeConfigured: boolean;
};

function monthStartUtc(d = new Date()): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1));
}

export async function countCoverLettersThisMonth(userId: string): Promise<number> {
  return withUserRls(userId, async (tx) => {
    return tx.generatedEmail.count({
      where: {
        userId,
        createdAt: { gte: monthStartUtc() },
      },
    });
  });
}

export async function getBillingSnapshot(user: User): Promise<BillingSnapshot> {
  const plan = normalizePlan(user.plan);
  const limits = getPlanLimits(plan);

  const sub = await withUserRls(user.id, async (tx) => {
    return tx.subscription.findUnique({ where: { userId: user.id } });
  });

  const used = await countCoverLettersThisMonth(user.id);
  const remaining =
    limits.coverLettersPerMonth <= 0
      ? 0
      : Math.max(0, limits.coverLettersPerMonth - used);

  return {
    plan,
    limits,
    subscriptionStatus: sub?.status ?? 'inactive',
    periodEnd: sub?.periodEnd?.toISOString() ?? null,
    coverLettersUsed: used,
    coverLettersRemaining:
      limits.coverLettersPerMonth === 0 && plan === 'free'
        ? 0
        : remaining,
    stripeConfigured: Boolean(
      process.env.STRIPE_SECRET_KEY &&
        process.env.STRIPE_PRICE_PRO &&
        process.env.STRIPE_PRICE_PRO_PLUS
    ),
  };
}

export class QuotaExceededError extends Error {
  code = 'QUOTA_EXCEEDED' as const;
  constructor(
    message: string,
    public readonly upgradeRequired: boolean = true
  ) {
    super(message);
    this.name = 'QuotaExceededError';
  }
}

/** Throws QuotaExceededError if the user cannot generate another cover letter. */
export async function assertCoverLetterQuota(user: User): Promise<void> {
  const limits = getPlanLimits(user.plan);
  if (limits.coverLettersPerMonth <= 0) {
    throw new QuotaExceededError(
      'Cover letters require Pro. Upgrade to generate AI applications.',
      true
    );
  }
  const used = await countCoverLettersThisMonth(user.id);
  if (used >= limits.coverLettersPerMonth) {
    throw new QuotaExceededError(
      `Monthly cover letter limit reached (${limits.coverLettersPerMonth}). Upgrade or wait until next month.`,
      true
    );
  }
}

/** Clamp enabledSites and AI flags to the user's plan. */
export function applyPlanGatesToSettings(
  plan: string | null | undefined,
  body: {
    enabledSites?: string[];
    useAIMatching?: boolean;
  }
): { enabledSites?: string[]; useAIMatching?: boolean; warnings: string[] } {
  const limits = getPlanLimits(plan);
  const warnings: string[] = [];
  const out: { enabledSites?: string[]; useAIMatching?: boolean } = {};

  if (body.enabledSites !== undefined) {
    if (body.enabledSites.length > limits.maxSites) {
      out.enabledSites = body.enabledSites.slice(0, limits.maxSites);
      warnings.push(
        `Plan allows ${limits.maxSites} site(s). Extra sites were removed.`
      );
    } else {
      out.enabledSites = body.enabledSites;
    }
  }

  if (body.useAIMatching !== undefined) {
    if (body.useAIMatching && !limits.aiMatching) {
      out.useAIMatching = false;
      warnings.push('AI matching requires Pro. It was turned off.');
    } else {
      out.useAIMatching = body.useAIMatching;
    }
  }

  return { ...out, warnings };
}

export async function syncUserPlan(
  userId: string,
  data: {
    plan: PlanId;
    status: string;
    stripeCustomerId?: string | null;
    stripeSubId?: string | null;
    periodEnd?: Date | null;
  }
): Promise<void> {
  await withServiceRls(async (tx) => {
    await tx.user.update({
      where: { id: userId },
      data: {
        plan: data.plan,
        ...(data.stripeCustomerId !== undefined
          ? { stripeCustomerId: data.stripeCustomerId }
          : {}),
      },
    });

    await tx.subscription.upsert({
      where: { userId },
      create: {
        userId,
        plan: data.plan,
        status: data.status,
        stripeSubId: data.stripeSubId ?? null,
        periodEnd: data.periodEnd ?? null,
      },
      update: {
        plan: data.plan,
        status: data.status,
        stripeSubId: data.stripeSubId ?? null,
        periodEnd: data.periodEnd ?? null,
      },
    });
  });
}

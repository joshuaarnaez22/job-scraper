/**
 * POST /api/billing/sync
 * Pull active Stripe subscription for the current user and update plan.
 * Used after Checkout return (success=1) when webhooks are delayed/misrouted.
 */

import { NextResponse } from 'next/server';
import { planFromStripePriceId, type PlanId } from '@/config/plans';
import { AuthRequiredError, requireCurrentUser } from '@/lib/auth-user';
import { getBillingSnapshot, syncUserPlan } from '@/lib/billing';
import { withServiceRls } from '@/lib/rls';
import { getStripe, isStripeConfigured } from '@/lib/stripe';

export async function POST() {
  try {
    if (!isStripeConfigured()) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 });
    }

    const user = await requireCurrentUser();
    const stripe = getStripe();

    if (!user.stripeCustomerId) {
      const snapshot = await getBillingSnapshot(user);
      return NextResponse.json({ synced: false, reason: 'no_customer', ...snapshot });
    }

    const subs = await stripe.subscriptions.list({
      customer: user.stripeCustomerId,
      status: 'all',
      limit: 10,
    });

    const active = subs.data.find(
      (s) => s.status === 'active' || s.status === 'trialing' || s.status === 'past_due'
    );

    if (!active) {
      await syncUserPlan(user.id, {
        plan: 'free',
        status: 'inactive',
        stripeCustomerId: user.stripeCustomerId,
        stripeSubId: null,
        periodEnd: null,
      });
      const fresh = await withServiceRls(async (tx) =>
        tx.user.findUniqueOrThrow({ where: { id: user.id } })
      );
      const snapshot = await getBillingSnapshot(fresh);
      return NextResponse.json({ synced: true, ...snapshot });
    }

    const price = active.items.data[0]?.price;
    const priceId = typeof price === 'string' ? price : price?.id;
    const plan: PlanId =
      planFromStripePriceId(priceId) ||
      (active.metadata?.plan as PlanId | undefined) ||
      'pro';

    const statusMap: Record<string, string> = {
      active: 'active',
      trialing: 'active',
      past_due: 'past_due',
    };
    const status = statusMap[active.status] ?? active.status;

    const periodEndTs =
      (active as { current_period_end?: number }).current_period_end ??
      active.items.data[0]?.current_period_end;

    await syncUserPlan(user.id, {
      plan,
      status,
      stripeCustomerId: user.stripeCustomerId,
      stripeSubId: active.id,
      periodEnd:
        typeof periodEndTs === 'number' ? new Date(periodEndTs * 1000) : null,
    });

    const fresh = await withServiceRls(async (tx) =>
      tx.user.findUniqueOrThrow({ where: { id: user.id } })
    );
    const snapshot = await getBillingSnapshot(fresh);
    return NextResponse.json({ synced: true, ...snapshot });
  } catch (error) {
    if (error instanceof AuthRequiredError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[API] billing sync:', error);
    return NextResponse.json({ error: 'Failed to sync billing' }, { status: 500 });
  }
}

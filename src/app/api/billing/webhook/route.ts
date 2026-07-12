/**
 * POST /api/billing/webhook — Stripe webhooks (no Clerk auth)
 */

import { NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { planFromStripePriceId, type PlanId } from '@/config/plans';
import { syncUserPlan } from '@/lib/billing';
import { withServiceRls } from '@/lib/rls';
import { getStripe } from '@/lib/stripe';

export const runtime = 'nodejs';

async function resolveUserId(event: {
  customer?: string | Stripe.Customer | Stripe.DeletedCustomer | null;
  metadata?: Stripe.Metadata | null;
  client_reference_id?: string | null;
}): Promise<string | null> {
  if (event.metadata?.userId) return event.metadata.userId;
  if (event.client_reference_id) return event.client_reference_id;

  const customerId =
    typeof event.customer === 'string'
      ? event.customer
      : event.customer && !('deleted' in event.customer && event.customer.deleted)
        ? event.customer.id
        : null;

  if (!customerId) return null;

  return withServiceRls(async (tx) => {
    const user = await tx.user.findFirst({
      where: { stripeCustomerId: customerId },
      select: { id: true },
    });
    return user?.id ?? null;
  });
}

function priceIdFromSubscription(sub: Stripe.Subscription): string | null {
  const item = sub.items.data[0];
  const price = item?.price;
  return typeof price === 'string' ? price : price?.id ?? null;
}

function periodEndFromSubscription(sub: Stripe.Subscription): Date | null {
  const end = sub.items.data[0]?.current_period_end ?? sub.billing_cycle_anchor;
  // Prefer subscription-level current_period_end when present on older API shapes
  const legacy = (sub as { current_period_end?: number }).current_period_end;
  const ts = legacy ?? end;
  return typeof ts === 'number' ? new Date(ts * 1000) : null;
}

async function applySubscription(
  userId: string,
  sub: Stripe.Subscription,
  fallbackPlan?: PlanId
): Promise<void> {
  const priceId = priceIdFromSubscription(sub);
  const plan =
    planFromStripePriceId(priceId) ||
    (sub.metadata?.plan as PlanId | undefined) ||
    fallbackPlan ||
    'pro';

  const statusMap: Record<string, string> = {
    active: 'active',
    trialing: 'active',
    past_due: 'past_due',
    canceled: 'canceled',
    unpaid: 'past_due',
    incomplete: 'inactive',
    incomplete_expired: 'canceled',
    paused: 'inactive',
  };

  const status = statusMap[sub.status] ?? sub.status;
  const planForUser: PlanId =
    status === 'active' || status === 'past_due' ? plan : 'free';

  await syncUserPlan(userId, {
    plan: planForUser,
    status,
    stripeSubId: sub.id,
    periodEnd: periodEndFromSubscription(sub),
    stripeCustomerId:
      typeof sub.customer === 'string' ? sub.customer : sub.customer.id,
  });
}

export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error('[Stripe] STRIPE_WEBHOOK_SECRET missing');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });
  }

  const stripe = getStripe();
  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  const rawBody = await request.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    console.error('[Stripe] signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode !== 'subscription') break;

        const userId = await resolveUserId(session);
        if (!userId || !session.subscription) break;

        const subId =
          typeof session.subscription === 'string'
            ? session.subscription
            : session.subscription.id;
        const sub = await stripe.subscriptions.retrieve(subId);
        const metaPlan = session.metadata?.plan as PlanId | undefined;
        await applySubscription(userId, sub, metaPlan);
        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        const userId = await resolveUserId(sub);
        if (!userId) break;

        if (event.type === 'customer.subscription.deleted') {
          await syncUserPlan(userId, {
            plan: 'free',
            status: 'canceled',
            stripeSubId: sub.id,
            periodEnd: periodEndFromSubscription(sub),
          });
        } else {
          await applySubscription(userId, sub);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId =
          typeof invoice.customer === 'string'
            ? invoice.customer
            : invoice.customer?.id;
        if (!customerId) break;

        const userId = await withServiceRls(async (tx) => {
          const u = await tx.user.findFirst({
            where: { stripeCustomerId: customerId },
            select: { id: true },
          });
          return u?.id ?? null;
        });
        if (!userId) break;

        await withServiceRls(async (tx) => {
          await tx.subscription.updateMany({
            where: { userId },
            data: { status: 'past_due' },
          });
        });
        break;
      }

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[Stripe] webhook handler error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}

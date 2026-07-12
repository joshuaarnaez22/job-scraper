/**
 * POST /api/billing/checkout — Stripe Checkout for Pro / Pro+
 * Body: { plan: 'pro' | 'pro_plus' }
 */

import { NextRequest, NextResponse } from 'next/server';
import { isPlanId, stripePriceIdForPlan, type PlanId } from '@/config/plans';
import { AuthRequiredError, requireCurrentUser } from '@/lib/auth-user';
import { withServiceRls } from '@/lib/rls';
import { appBaseUrl, getStripe, isStripeConfigured } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    if (!isStripeConfigured()) {
      return NextResponse.json(
        {
          error:
            'Stripe is not configured. Set STRIPE_SECRET_KEY, STRIPE_PRICE_PRO, STRIPE_PRICE_PRO_PLUS.',
        },
        { status: 503 }
      );
    }

    const user = await requireCurrentUser();
    const body = await request.json().catch(() => ({}));
    const plan = body.plan as string;

    if (!isPlanId(plan) || plan === 'free') {
      return NextResponse.json(
        { error: 'Choose plan "pro" or "pro_plus"' },
        { status: 400 }
      );
    }

    const priceId = stripePriceIdForPlan(plan as PlanId);
    if (!priceId) {
      return NextResponse.json({ error: 'Price not configured for plan' }, { status: 503 });
    }

    const stripe = getStripe();
    let customerId = user.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { userId: user.id, clerkId: user.clerkId },
      });
      customerId = customer.id;
      await withServiceRls(async (tx) => {
        await tx.user.update({
          where: { id: user.id },
          data: { stripeCustomerId: customerId },
        });
      });
    }

    const base = appBaseUrl();
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${base}/dashboard/billing?success=1`,
      cancel_url: `${base}/dashboard/billing?canceled=1`,
      client_reference_id: user.id,
      metadata: { userId: user.id, plan },
      subscription_data: {
        metadata: { userId: user.id, plan },
      },
      allow_promotion_codes: true,
    });

    if (!session.url) {
      return NextResponse.json({ error: 'Checkout session missing URL' }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    if (error instanceof AuthRequiredError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[API] checkout:', error);
    return NextResponse.json({ error: 'Failed to start checkout' }, { status: 500 });
  }
}

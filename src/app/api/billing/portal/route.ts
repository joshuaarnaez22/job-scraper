/**
 * POST /api/billing/portal — Stripe Customer Portal
 */

import { NextResponse } from 'next/server';
import { AuthRequiredError, requireCurrentUser } from '@/lib/auth-user';
import { appBaseUrl, getStripe, isStripeConfigured } from '@/lib/stripe';

export async function POST() {
  try {
    if (!isStripeConfigured()) {
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 503 }
      );
    }

    const user = await requireCurrentUser();
    if (!user.stripeCustomerId) {
      return NextResponse.json(
        { error: 'No billing account yet. Subscribe to a plan first.' },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${appBaseUrl()}/dashboard/billing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    if (error instanceof AuthRequiredError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[API] portal:', error);
    return NextResponse.json({ error: 'Failed to open billing portal' }, { status: 500 });
  }
}

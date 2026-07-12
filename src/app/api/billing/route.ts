/**
 * GET /api/billing — current plan, quotas, usage
 */

import { NextResponse } from 'next/server';
import { AuthRequiredError, requireCurrentUser } from '@/lib/auth-user';
import { getBillingSnapshot } from '@/lib/billing';

export async function GET() {
  try {
    const user = await requireCurrentUser();
    const snapshot = await getBillingSnapshot(user);
    return NextResponse.json(snapshot);
  } catch (error) {
    if (error instanceof AuthRequiredError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[API] billing GET:', error);
    return NextResponse.json({ error: 'Failed to load billing' }, { status: 500 });
  }
}

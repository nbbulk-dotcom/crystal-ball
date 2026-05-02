import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT, seededCredentials } from '@/lib/oros-vault';

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = verifyJWT(token || '');
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  return NextResponse.json({ credentials: seededCredentials });
}
import { NextRequest, NextResponse } from 'next/server';
import { proxyRequest } from '@/lib/api-proxy';
import { verifyJWT } from '@/lib/oros-vault';

export async function GET(req: NextRequest, { params }: { params: { app: string; path: string[] } }) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = token ? verifyJWT(token) : null;

  const publicApps = ['earthpulse', '12stranddna', 'worldcycles'];
  if (!user && !publicApps.includes(params.app)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const path = '/' + (params.path || []).join('/');
  const res = await proxyRequest(params.app, path, { method: 'GET' });
  return res;
}

export async function POST(req: NextRequest, { params }: { params: { app: string; path: string[] } }) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  const user = token ? verifyJWT(token) : null;

  const publicApps = ['earthpulse', '12stranddna'];
  if (!user && !publicApps.includes(params.app)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const path = '/' + (params.path || []).join('/');
  const res = await proxyRequest(params.app, path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res;
}
import { NextRequest, NextResponse } from 'next/server';
import { proxyRequest } from '@/lib/api-proxy';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const res = await proxyRequest('earthpulse', '/api/predict/earthquake', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  return res;
}
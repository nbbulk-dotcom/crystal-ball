// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple middleware that does NOT use Node.js crypto
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Add security headers (safe for Edge runtime)
  response.headers.set('X-Prime-Directive', 'LIFE_IS_SACROSANCT');
  response.headers.set('X-FCAT-Version', '1.0');
  
  return response;
}

// Optional: only run on certain paths
export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
};
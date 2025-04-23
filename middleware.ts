// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('auth')?.value;
  const { pathname } = request.nextUrl;

  // If the user is not authenticated and tries to access /dashboard, redirect to login
  if (!authCookie && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If the user is authenticated and tries to access the home page, redirect to /dashboard
  if (authCookie && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*'],
};

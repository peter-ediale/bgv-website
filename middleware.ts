import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect admin routes
  if (pathname.startsWith('/admin')) {
    // allow the login and logout pages
    if (pathname === '/admin/login' || pathname === '/admin/logout') return NextResponse.next();

    const auth = req.cookies.get('admin_auth')?.value;
    if (!auth) {
      const url = req.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

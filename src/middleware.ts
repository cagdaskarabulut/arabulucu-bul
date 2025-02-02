import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAdminGirisPath = request.nextUrl.pathname === '/admin/giris';
  const adminToken = request.cookies.get('admin_token');

  if (!adminToken && !isAdminGirisPath) {
    return NextResponse.redirect(new URL('/admin/giris', request.url));
  }

  if (adminToken && isAdminGirisPath) {
    return NextResponse.redirect(new URL('/admin/panel', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
}

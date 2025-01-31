import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'gizli-anahtar';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin-token');

    if (!token) {
      return NextResponse.redirect(new URL('/admin/giris', request.url));
    }

    try {
      jwt.verify(token.value, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/giris', request.url));
    }
  }

  return NextResponse.next();
}

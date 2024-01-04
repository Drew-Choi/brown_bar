import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';

export const middleware = async (req: NextRequest) => {
  const session = await auth();

  if (req.nextUrl.pathname === '/admin/login' && session)
    return NextResponse.redirect(`${process.env.AUTH_URL}/admin?isLogin=true`);

  if (req.nextUrl.pathname === '/admin/login' && !session) return;

  if (!session) return NextResponse.redirect(`${process.env.AUTH_URL}/admin/login`);
};

export const config = {
  matcher: ['/admin/:path*'],
};

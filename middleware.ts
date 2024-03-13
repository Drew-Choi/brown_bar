import { USE_MUTATE_POINT } from './constant/END_POINT';
import { NextRequest, NextResponse } from 'next/server';

// redirectResponse객체
const redirectResponse = () => {
  const redirectRes = NextResponse.redirect(`${process.env.NEXT_PUBLIC_AUTH_URL}/admin/login`);

  redirectRes.cookies.delete('at');
  redirectRes.cookies.delete('rt');
  redirectRes.cookies.delete(String(process.env.SESSION_TOKEN_NAME));

  return redirectRes;
};

export default async function middleware(req: NextRequest) {
  const at = req.cookies.get('at')?.value;
  const rt = req.cookies.get('rt')?.value;
  const url = req.nextUrl.pathname;

  console.log('미들');

  if (url === '/admin/login') {
    return NextResponse.next();
  }

  if (!at && url !== '/admin/login') {
    if (rt) {
      try {
        const response = await fetch(
          process.env.NEXT_MIDDLEWARE_API_BASE_URL + USE_MUTATE_POINT.RTAUTH,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rt }),
          },
        );

        if (response.status === 200) {
          const {
            data: { accessToken, refreshToken },
          } = await response.json();

          const res = NextResponse.next();
          res.cookies.set('at', accessToken, {
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'lax',
            maxAge: 60 * 60,
          });
          res.cookies.set('rt', refreshToken, {
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 60,
          });

          return res;
        }

        return redirectResponse();
      } catch (err) {
        console.error(err);
        return redirectResponse();
      }
    }

    return redirectResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

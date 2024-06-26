import { USE_MUTATE_POINT } from './constant/END_POINT';
import { NextRequest, NextResponse } from 'next/server';
import { COOKIE_TIME } from './constant/NUMBER';

// redirectResponse객체
const redirectResponse = () => {
  const redirectRes = NextResponse.redirect(`${process.env.NEXT_PUBLIC_AUTH_URL}/admin/login`);

  // 주의 set으로 만료해서 삭제함
  ['at', 'rt', String(process.env.SESSION_TOKEN_NAME)].forEach((name) => {
    redirectRes.cookies.set(name, '', {
      path: '/',
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'lax',
    });
  });

  return redirectRes;
};

export default async function middleware(req: NextRequest) {
  const at = req.cookies.get('at')?.value;
  const rt = req.cookies.get('rt')?.value;
  const url = req.nextUrl.pathname;

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

          const res = NextResponse.redirect(req.nextUrl.clone());
          const domainURL = process.env.COOKIE_DOMAIN;
          res.cookies.set('at', accessToken, {
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'lax',
            maxAge: COOKIE_TIME.ACCESS,
            domain: domainURL,
          });
          res.cookies.set('rt', refreshToken, {
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'lax',
            maxAge: COOKIE_TIME.REFRESH,
            domain: domainURL,
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

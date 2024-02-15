import { withAuth } from 'next-auth/middleware';

export default withAuth(function middleware(req) {}, {
  pages: {
    signIn: '/admin/login',
  },
});

export const config = {
  matcher: ['/admin/:path*'],
};

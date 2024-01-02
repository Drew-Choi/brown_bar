import NextAuth from 'next-auth';
import Kakao from 'next-auth/providers/kakao';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 60 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/admin',
    signOut: '/admin',
  },
  providers: [
    Kakao({ clientId: process.env.KAKAO_CLIENT_ID, clientSecret: process.env.KAKAO_CLIENT_SECRET }),
  ],

  callbacks: {
    jwt: async ({ token, account }) => {
      // 초기 로그인 설정
      if (account && account.refresh_token && account.expires_in) {
        token.access_expires_at = Date.now() + account.expires_in * 1000;
        token.refresh_token = account.refresh_token;
      }

      if (token && token.access_expires_at && Date.now() > (token.access_expires_at as number)) {
        try {
          const params = new URLSearchParams({
            grant_type: 'refresh_token',
            client_id: process.env.KAKAO_CLIENT_ID as string,
            client_secret: process.env.KAKAO_CLIENT_SECRET as string,
            refresh_token: token.refresh_token as string,
          });

          const response = await fetch('https://kauth.kakao.com/oauth/token', {
            headers: { 'Content-type': 'application/x-www-form-urlencoded' },
            body: params,
            method: 'POST',
          });

          const tokens = await response.json();

          if (!response.ok) throw tokens;

          // 성공이면 갱신
          token.access_expires_at = Date.now() + tokens.expires_in * 1000;
          token.refresh_token = tokens.refresh_token ?? token.refresh_token;
        } catch (err) {
          console.error('Error refreshing access token', err);
          token.error = 'RefreshAccessTokenError' as const;
        }
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token.error) {
        (session as SessionAdd).error = token.error as string;
      }
      return session;
    },
  },
});

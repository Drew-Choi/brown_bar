import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import connectDB from '../../_lib/mongodb';
import Member from '../../_models/Member';

interface KakaoProfileType {
  id: number;
  connected_at: string;
  properties: {
    nickname: string;
    profile_image: string;
    thumbnail_image: string;
  };
  kakao_account: {
    profile_nickname_needs_agreement: boolean;
    profile_image_needs_agreement: boolean;
    profile: {
      nickname: string;
      thumbnail_image_url: string;
      profile_image_url: string;
      is_default_image: boolean;
    };
  };
}

const handler = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 60 * 24 * 60 * 60,
  },
  providers: [
    KakaoProvider({
      clientId: String(process.env.KAKAO_CLIENT_ID),
      clientSecret: String(process.env.KAKAO_CLIENT_SECRET),
    }),
  ],
  pages: { error: '/admin/login' },
  callbacks: {
    jwt: async ({ token, account, user }) => {
      // 초기 로그인 설정
      if (account && account.refresh_token && account.expires_in) {
        token.access_expires_at = Date.now() + (account.expires_in as number) * 1000;
        token.refresh_token = account.refresh_token;
      }

      if (user) {
        token.user_id = user.id;
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
      if (token.user_id) {
        (session as SessionAdd).user_id = token.user_id as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };

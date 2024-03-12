import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import connectDB from '../../_lib/mongodb';
import Member from '../../_models/Member';
import { generateCookie } from '@/utils/generateCookie';
import { generateSignJWT } from '@/utils/generateJWT';

const handler = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 60,
  },
  providers: [
    KakaoProvider({
      clientId: String(process.env.KAKAO_CLIENT_ID),
      clientSecret: String(process.env.KAKAO_CLIENT_SECRET),
    }),
  ],
  pages: { signIn: '/admin/login/', signOut: '/admin/login/', error: '/admin/login/' },
  callbacks: {
    signIn: async ({ user, account }) => {
      // 관리자 회원 인증
      if (account?.access_token && user.id && user.name && user.image) {
        const { id, name: nick_name, image: profile_img } = user;

        await connectDB();

        const findUser: MemberType | null = await Member.findOne({ id });

        if (!findUser) {
          const newUser = new Member({ id: String(id), nick_name, profile_img });
          await newUser.save();

          return false;
        }

        // 커스텀 에세스토큰과 리프레쉬토큰 전략
        if (findUser && findUser.is_admin) {
          const accessToken = generateSignJWT({ value: { id: findUser.id }, expiresIn: '30s' });
          const refreshToken = generateSignJWT({ value: { id: findUser.id }, expiresIn: '60d' });

          const updateResult: MemberType | null = await Member.findOneAndUpdate(
            { id: findUser.id },
            { $set: { rt: refreshToken } },
            { new: true },
          );

          generateCookie({
            name: 'at',
            value: accessToken,
            maxAge: 60 * 60,
          });

          generateCookie({
            name: 'rt',
            value: refreshToken,
            maxAge: 60 * 60 * 24 * 60,
          });

          return updateResult?.rt ? true : false;
        }
        return false;
      }

      return false;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.user_id = user.id;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token.user_id) {
        (session as SessionAdd).user_id = token.user_id as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };

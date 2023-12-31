import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// 최초 로그인 인증 함수
const initialLoginApi = async ({ id, password }: { id: string; password: string }) => {
  const authResponse = await fetch(`${process.env.AUTH_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      password,
    }),
  });

  if (!authResponse.ok) {
    return null;
  }

  const user = await authResponse.json();

  return {
    id: user.id,
  };
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 60 * 30,
  },
  pages: {
    signIn: '/admin/login',
    newUser: '/admin/join',
    signOut: '/admin',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (credentials.refresh as boolean) {
          return { id: credentials.id };
        }

        // 최초 로그인 요청
        return await initialLoginApi({
          id: credentials.id as string,
          password: credentials.password as string,
        });
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.userId = user.id;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (session.user && token.userId && typeof token.userId === 'string') {
        session.user.id = token.userId;
      }

      return session;
    },
  },
});

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 30,
  },
  pages: {
    signIn: `/admin/login`,
    newUser: `/admin/join`,
    signOut: `/admin`,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await fetch(`${process.env.AUTH_URL}/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: credentials.id,
            password: credentials.password,
          }),
        });

        if (!authResponse.ok) {
          return null;
        }

        const user = await authResponse.json();

        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.userId = user.id;
        // 여기에 필요한 다른 사용자 정보를 추가합니다.
      }
      return token;
    },
    session: async ({ session, token }) => {
      console.log('세션', session);
      console.log('토큰', token);

      return session;
    },
  },
});

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 30 * 60,
  },
  pages: {
    signIn: '/admin/login',
    newUser: '/admin/join',
  },
  secret: process.env.JWT_SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await fetch(`http://localhost:3000/api/login`, {
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
});

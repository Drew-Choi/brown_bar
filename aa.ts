// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
// } = NextAuth({
//   pages: {
//     signIn: '/admin/login',
//   },
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials) {
//         const authResponse = await fetch('/users/login', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             id: credentials.username,
//             pw: credentials.password,
//           }),
//         });

//         if (!authResponse.ok) {
//           return null;
//         }

//         const user = await authResponse.json();

//         return user;
//       },
//     }),
//   ],
// });

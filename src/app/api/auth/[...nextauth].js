import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { SignInValidation } from '@/app/api/util/SignInValidation'
import { SignUpValidation } from '@/app/api/util/SignUpValidation'
import { createUser } from '@/app/api/util/CreateUser'

export default NextAuth({
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;
        // Use your custom sign-in validation logic
        const signInResponse = await SignInValidation({ email, password });
        if (signInResponse.statusCode === 200) {
          // Start session if sign-in is successful
          return Promise.resolve(signInResponse.data);
        } else {
          // If sign-in fails, return null
          return Promise.resolve(null);
        }
      }
    }),
    Providers.Credentials({
      name: 'Custom Sign Up',
      async authorize(credentials) {
        // Implement custom logic to handle sign-up
        const { username, email, password, confirmPassword } = credentials;
        const signUpResponse = await SignUpValidation({ username, email, password, confirmPassword });
        if (signUpResponse.statusCode === 200) {
          // Create user in the database if sign-up is successful
          await createUser({ username, email, password });
          // Start session if sign-up is successful
          return Promise.resolve(signUpResponse.data);
        } else {
          // If sign-up fails, return null
          return Promise.resolve(null);
        }
      }
    })
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id; // Assuming user object has an id
      }
      return token;
    },
    async session(session, token) {
      session.user.id = token.id;
      return session;
    }
  },
});

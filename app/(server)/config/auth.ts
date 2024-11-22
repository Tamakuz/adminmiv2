import { NextAuthOptions } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import { createToken } from '../utils/jwt';

const authConfig = {
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
    CredentialProvider({
      credentials: {
        email: {
          type: 'email'
        }
      },
      async authorize(credentials) {
        try {
          const response = await fetch('http://localhost:3000/api/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: credentials?.email
            })
          });

          const user = await response.json();

          if(user.status === 500 || user.status === 400) {
            throw new Error(user.message);
          }

          if (user) {
            return user.data;
          }

          return null;
        } catch (error: any) {
          console.error("Authentication error:", error);
          throw new Error(error.message);
        }
      }
    })
  ],
  pages: {
    signIn: '/' //sigin page
  },
  callbacks: {
    async signIn({ user }) {
      if (user) {
        user.id = user.id;
        user.role = user.role;
        user.status = user.status;
        return true;
      }
      return false;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.status = user.status;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.authorization = await createToken({id: token.id, role: token.role, status: token.status})
        session.user.role = token.role;
        session.user.status = token.status;
      }
      return session;
    }
  }
} satisfies NextAuthOptions;

export default authConfig;

import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";
import { stripe } from "./lib/stripe";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },
  callbacks: {
    async session({ token, session }) {

      if(token.sub && session.user) {
        session.user.id = token.sub;
      }

      if(session.user && token.role) {
        session.user.role = token.role;
      }

      if(session.user && token.username) {
        session.user.name = token.name;
      }

      return session;
    },

    async jwt({ token }) {

      if(!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if(!existingUser) return token;

      token.role = existingUser.role;
      token.name = existingUser.name;

      return token
    }
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})
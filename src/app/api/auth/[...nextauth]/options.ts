/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";  // ✅ Import JWT type
import { Session } from "next-auth";  // ✅ Import Session type
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/user/login", // Custom login page
  },
  callbacks: {
    async jwt({ token, account }: { token: JWT; account?: any }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
    
    async signIn({ user, account }) {
      if (account?.provider) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/social-auth`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            avatar: user.image,
          }),
        });
    
        if (!res.ok) return false;
      }
      return true;
    },

    async redirect() {
      return process.env.NEXTAUTH_URL + "/user/dashboard"; // Ensure redirect
    }
    
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

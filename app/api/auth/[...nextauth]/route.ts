import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { JWT } from "next-auth/jwt";

// Define NextAuth options
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Fetch user from database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
          throw new Error("Invalid credentials");
        }

        return { id: user.id.toString(), email: user.email, name: user.name };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 5 * 60, // 5 minutes
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 60 * 3, // 3 minutes
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.iat = Date.now();
      }

      const currentTime = Date.now();
      const tokenIat = token.iat ? token.iat : currentTime;

      if (
        typeof tokenIat === "number" &&
        currentTime - tokenIat > 59 * 60 * 1000
      ) {
        token.iat = currentTime;
        token.exp = Math.floor(currentTime / 1000) + 60 * 60; // 1 hour expiration
      }

      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token.id && token.email) {
        session.user.id = token.id as string;
        session.user.email = token.email;
      }
      return session;
    },
  },
};

// Export the NextAuth handler for the App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

import NextAuth, { DefaultSession, DefaultJWT } from "next-auth/jwt";

// Extending the default NextAuth types
declare module "next-auth" {
  interface User {
    id: string;
    email: string;
  }

  interface Session extends DefaultSession {
    user: User;
  }

  interface JWT extends DefaultJWT {
    id: string;
    email: string;
    iat?: number; // Optional, since it may not always exist
    exp?: number; // Optional, since it may not always exist
  }
}

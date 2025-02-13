// next-auth.d.ts

import { DefaultSession } from "next-auth";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    jwt?: JWT; // Add `jwt` property to the Session type
  }

  interface User {
    id: string;
    email: string;
    name: string;
  }

  interface JWT {
    id: string;
    email: string;
    exp: number;
  }
}

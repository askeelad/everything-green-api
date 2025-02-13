// next-auth.d.ts

import { DefaultSession } from "next-auth";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    id: string;
    email: string;
  }

  interface User {
    id: string;
    email: string;
    name: string;
  }

  interface JWT {
    id: string;
    email: string;
  }
}

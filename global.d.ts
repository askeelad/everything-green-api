// global.d.ts

import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined; // Declare the type of the global prisma variable
}

export {};

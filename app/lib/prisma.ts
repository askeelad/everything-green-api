import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

// Create a singleton instance of PrismaClient
if (process.env.NODE_ENV === "production") {
  // In production, always use the same instance
  prisma = new PrismaClient();
} else {
  // In development, use a global variable to persist PrismaClient
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export { prisma };

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

// Middleware function to check if a user is authenticated using NextAuth session
export async function middleware(req: NextApiRequest, next: () => void) {
  const session = await getSession({ req });
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  next();
}

export const config = {
  matcher: ["/tapi/users/:path*"], // Only apply to /api/users routes
};

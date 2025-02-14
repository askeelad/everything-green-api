import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import protectJWT from "@/app/actions/protectJWT";

// Fetch user by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const authResponse = await protectJWT(req);
  if (authResponse) {
    return authResponse; // If unauthorized, return the response immediately
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching user" }, { status: 500 });
  }
}

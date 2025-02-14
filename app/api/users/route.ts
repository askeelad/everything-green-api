import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust this import based on your project structure
import bcrypt from "bcryptjs";
import { revalidateTag } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import protectJWT from "@/app/actions/protectJWT";

// Handle both GET and POST requests
export async function GET(req: NextRequest) {
  const authResponse = await protectJWT(req);
  if (authResponse) {
    return authResponse; // If unauthorized, return the response immediately
  }
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching users" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const authResponse = await protectJWT(req);
  if (authResponse) {
    return authResponse; // If unauthorized, return the response immediately
  }
  try {
    const { name, email, password } = await req.json(); // Parse the incoming JSON request body
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    revalidateTag("users-data");
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}

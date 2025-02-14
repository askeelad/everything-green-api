"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";

const protectJWT = async (req: NextRequest) => {
  console.log("protect");
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null; // Explicitly return `null` when session exists
};

export default protectJWT;

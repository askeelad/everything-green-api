import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return NextResponse.json({ message: "testing" }, { status: 200 });
}

export async function POST(req: Request) {
  return NextResponse.json(
    { message: "POST request received" },
    { status: 200 }
  );
}

// app/api/webhook/route.ts

import { NextResponse } from "next/server";
import crypto from "crypto";
import fs from "fs";
import path from "path";

// Define the shared secret to validate the signature
const SECRET = process.env.WEBHOOK_SECRET;

// Function to verify the signature
async function verifySignature(req: Request, body: any) {
  const signature = req.headers.get("x-signature") as string;
  const expectedSignature = await getExpectedSignature(body);
  console.log(body);
  console.log(signature);
  console.log(expectedSignature);
  console.log(SECRET as string);
  return signature === expectedSignature;
}

// Create expected signature from the request body
async function getExpectedSignature(body: any) {
  return crypto
    .createHmac("sha256", SECRET as string)
    .update(body)
    .digest("hex");
}

export async function POST(req: Request) {
  try {
    // Read the body once
    const body = await req.json();

    // Verify the signature
    if (!(await verifySignature(req, JSON.stringify(body)))) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 400 }
      );
    }

    const { eventType, data } = body;

    // Load the database file
    const dbPath = path.join(process.cwd(), "db.json");
    const db = fs.existsSync(dbPath)
      ? JSON.parse(fs.readFileSync(dbPath, "utf-8"))
      : [];

    // Push new data into the db
    db.push({ eventType, data });

    // Save the updated db back to the file
    fs.writeFileSync(dbPath, JSON.stringify(db));

    return NextResponse.json(
      { success: true, message: "Received" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error processing webhook" },
      { status: 500 }
    );
  }
}

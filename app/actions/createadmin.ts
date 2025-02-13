"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function createAdmin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  if (!email || !password) {
    return { message: "Email and password are required" };
  }

  if (email !== "admin@test.com" && password !== "admin") {
    return { error: "Email or password is incorrect" };
  }

  // Check if the admin already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return { error: "Admin already exists" };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create admin user
  const newUser = await prisma.user.create({
    data: {
      name: "Admin",
      email,
      password: hashedPassword,
    },
  });

  return { success: "Admin created successfully", user: newUser };
}

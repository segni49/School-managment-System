import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/lib/database/db";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // Validate input
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  // Check if user already exists
  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists!" }, { status: 409 });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Automatically assign the role as "STUDENT"
  const newUser = await db.user.create({
    data: {
      email,
      password: hashedPassword,
      role: "STUDENT", // Role is set automatically
    },
  });

  return NextResponse.json({ success: true, user: newUser });
}
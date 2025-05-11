import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/database/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const{ email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required!" }, { status: 400 });
    }

    // ✅ Check if email already exists
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already in use!" }, { status: 409 });
    }

    // ✅ Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // ✅ Insert new user
    const newUser = await db.user.create({
      data: { email, password: hashedPassword, role: "STUDENT" },
    });

    return NextResponse.json({ message: "User registered successfully!", user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Registration API Error:", error);
    return NextResponse.json({ error: "Failed to register user!" }, { status: 500 });
  }
}
import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/database/db";
import { Role } from "@prisma/client";

export async function POST(req: NextRequest) {
   try {
    
      const body = await req.json();
    const { email, password, role } = body;
    
    // Validate input
    if (!email || !password || !role) {
        return NextResponse.json({ error: "Email, password, and role are required" }, { status: 400 });
    }
        

   } catch (error) {
    if(error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
   }
    
  
}
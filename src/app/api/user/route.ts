import { NextResponse } from "next/server";
import db from "@/lib/database/db";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";
export default async function POST(req: Request) {
    try {

        const body = await req.json();
        const {email, password, role} = body;
        const hashedpassword  = await bcrypt.hash(password, 10);

        const user = await db.user.create({
            data: {
               email,
               password: hashedpassword ,
               role: role as Role , 
            },
        })   

        if(!user) {
            return NextResponse.json({message: " error creating user"}, {status: 400})
        }

        return NextResponse.json({message: "user created successfully"},{status:200})
        
    } catch (err: unknown) {
        if(err instanceof Error) {
            return NextResponse.json({message: "failed to create user"},{ status: 500});
        }
        
    }
}
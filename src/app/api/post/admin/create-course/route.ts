import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/database/db";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if(!token || token.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

   
    // Check if course already exists
   try {

     const body = await req.json();
    const { title, teacherId } = body;
    if( !title  || !teacherId) {
        return NextResponse.json({ error: "Course name, code, description and teacher ID are required" }, { status: 400 });
    }

        const existingCourse = await db.course.findFirst({
             where: { title } 
            });


        if (existingCourse) {
            return NextResponse.json({ error: "Course already exists!" }, { status: 409 });
        }

        // Create new course
        const newCourse = await db.course.create({
            data: {
                title,
                teacherId,
            },
        });

        return NextResponse.json({ message: "Course created successfully", success: true, course: newCourse });
        

   } catch (error) {
    if(error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
   }
    
  
}
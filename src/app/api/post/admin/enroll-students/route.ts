import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/database/db";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { studentId, courseId } = body;
        console.log("Received data:", body); // Debugging log
        if (!studentId || !courseId) {
            return NextResponse.json({ error: "Student ID and Course ID are required!" }, { status: 400 });
        };

        // ✅ Check if student exists
     const student = await db.enrollment.findFirst({
            where: {  studentId },
        });
        if (student) {
            return NextResponse.json({ error: "Student already enrolled in this course!" }, { status: 409 });
        }
            
          // enrollement
        const enrollment = await db.enrollment.create({
            data: {
                studentId,
                courseId,
            },
        });
        return NextResponse.json({ message: "Student enrolled successfully!", enrollment }, { status: 201 });
     

    } catch (error) {
        if (error instanceof Error) {
            console.error("Enroll Students API Error:", error);
        }
    }
}
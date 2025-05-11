import {NextResponse, NextRequest} from "next/server";
import db from "@/lib/database/db";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
    const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET});
    if (!token || token.role !== "ADMIN") {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

      const body = await req.json();
        const {email,newrole} = body;

      const validrole = ["STUDENT", "TEACHER", "ADMIN"];
        if(!validrole.includes(newrole)) {
            return NextResponse.json({error: "Invalid role"}, {status: 400});
        }
    try{
      
        const updateduser = await db.user.update({
            where: {
                email: email
            },
            data: {
                role: newrole
            }
        })
        return NextResponse.json({message: `User promoted to ${newrole}`,success: true, user: updateduser});
        
      
       
        
    } catch(error) {
        if(error instanceof Error) {
            return NextResponse.json({error: error.message}, {status: 500});
        }
    }
}
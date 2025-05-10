import { NextResponse } from "next/server";
import db from "@/lib/database/db";

export default async function GET(email: string) {
    try {

        const user = await db.user.findUnique({
            where: {email}
        })

        if(!user) {
            return NextResponse.json({message:"user does not exist"}, {status:400})
        }
        
    } catch (err: unknown) {
        if(err instanceof Error) {
            return NextResponse.json({message: "error fetching the user"}, {status: 500})
        }
    }
}
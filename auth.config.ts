
import type {NextAuthConfig} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/user";
import { NextResponse } from "next/server";

export default {
    providers: [
        Credentials({
            async authorize(credentials){
                const validatedfield = LoginSchema.safeParse(credentials);
                if(validatedfield.success) {
                    const {email, password} = validatedfield.data;
                    const user = await getUserByEmail(email);

                    if (!user || !user.password) {
                                 return NextResponse.json({message: "user not found please register"}, {status:400})       
                    }

                    const passwordmatch = await bcrypt.compare(password, user.password);
                    if(passwordmatch) {
                        return user; 
                    } return null
                  
                   
                }
            }
        })
    ]
}  satisfies NextAuthConfig;

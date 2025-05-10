import  type {NextAuthOptions} from 'next-auth'
import Github from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import db from '@/lib/database/db'
import bcrypt from 'bcryptjs'


export const options: NextAuthOptions = {
    providers: [
       Github({
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!

       }),
       Credentials({
          name: "Credentials",
          credentials: {
               email: { label: "Email", type: "text", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
            },
              async authorize(credentials){
        if(!credentials?.email || !credentials?.password) {
            throw new Error("missing email and password")
        }
           const user = await db.user.findUnique({
            where: {email: credentials.email}
           });

           if(!user || !user.password) {
            throw new Error("User Not Found Please Register")
           }
           const passwordmatch = await bcrypt.compare(credentials.password, user.password);
           if(!passwordmatch) {
            throw new Error("incorrect password!")
           }
           return user;
       },
          
       }),
    ],
    pages: {
        signIn: "/login"
    }
}
import  type {DefaultSession, NextAuthOptions, Session} from 'next-auth'
import Github from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import db from '@/lib/database/db'
import bcrypt from 'bcryptjs'
import { Role } from '@prisma/client'
import { JWT } from 'next-auth/jwt'


// Extend the Session type to include id and role
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession['user'];
  }
}

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
           return { ...user, role: user.role }; // Ensure role is included in the returned user object
       },
          
       }),
    ],
    pages: {
        signIn: "/login"
    },
    callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      token.role = (user as any).role; // Explicitly cast user to include role
    }
    return token;
  },

  async session({ session, token }: { session: Session; token: JWT & { id?: string; role?: Role } }) {
    if (token) {
      session.user.id = token.id!;
      session.user.role = token.role!;  // Include role in session with a default fallback
    }
    return session;
  },
},

}
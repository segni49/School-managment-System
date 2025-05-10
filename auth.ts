import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import db from "@/lib/database/db";
import authConfig from "./auth.config";

export const {
    handlers: {GET, POST},
    auth, SignIn, SignOut;
}
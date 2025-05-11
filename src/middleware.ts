import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export {default} from "next-auth/middleware";
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAuth = request.nextUrl.pathname.startsWith('/api/auth');
  const isPublicPath = ['/login', '/register'].some((path) => pathname.startsWith(path));
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if(!token && !isPublicPath && !isAuth) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if(token && isPublicPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  if(token && isAuth) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  


}

export const config = { matcher: ['/dashboard', '/', '/profile', '/settings'] };
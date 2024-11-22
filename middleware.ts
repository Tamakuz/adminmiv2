import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET as string });
  console.log(session);

  // Get the pathname
  const { pathname } = request.nextUrl;

  // If user is not logged in and trying to access protected routes, redirect to login
  if (!session && pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is logged in and trying to access login page, redirect to dashboard
  if (session && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if(session?.status === "nonaktif"){
    return NextResponse.redirect(new URL("/nonaktif", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard", 
    "/dosen",
    "/mahasiswa", 
    "/pengguna",
    "/dokumentasi",
    "/files"
  ],
};

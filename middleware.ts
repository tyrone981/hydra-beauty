
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getTokenFromRequest, verifyToken } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  
  if (
    pathname.startsWith("/admin/login") ||
    pathname === "/api/admin/seed" ||    
    pathname.startsWith("/api/admin/login")
  ) {
    return NextResponse.next();
  }

  
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const token = getTokenFromRequest(req);

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    const payload = await verifyToken(token);
    if (!payload || payload.role !== "admin") {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
import {NextResponse} from "next/server";
import {auth} from "./auth";

export const proxy = auth((request) => {
  if (request.nextUrl.pathname === "/admin/login" || request.nextUrl.pathname === "/api/admin/login") return NextResponse.next();
  if (request.auth?.user) return NextResponse.next();
  if (request.nextUrl.pathname.startsWith("/api/admin/")) return NextResponse.json({error: "Authentication required."}, {status: 401});
  return NextResponse.redirect(new URL("/admin/login", request.url));
});

export const config = {matcher: ["/admin/:path*", "/api/admin/:path*"]};

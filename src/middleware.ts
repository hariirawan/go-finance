import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Daftar halaman yang perlu authentication
  const isProtectedRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname.startsWith("/login");
  const isHomePage = pathname === "/";

  if ((isProtectedRoute || isHomePage) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Jika sudah login tapi mengakses /login, redirect ke /admin
  if ((isLoginPage || isHomePage) && token) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*", "/login"],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { testSlugForPosition, parseAthletePosition } from "@/lib/positions";
import { verifySessionTokenEdge } from "@/lib/session-verify";

function redirectToRegister(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const destination = new URL("/register", request.url);
  destination.searchParams.set("next", `${pathname}${search}`);
  return NextResponse.redirect(destination);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("sga_session")?.value;
  const session = token ? await verifySessionTokenEdge(token) : null;

  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
  const isAdminLogin = pathname === "/admin/login";
  const isTestRoute = pathname.startsWith("/tests/");
  const isResultRoute = pathname === "/result";

  if (isTestRoute || isResultRoute) {
    if (!session || session.role !== "athlete") {
      return redirectToRegister(request);
    }

    if (isTestRoute && session.position) {
      const position = parseAthletePosition(session.position);
      if (position) {
        const allowedSlug = testSlugForPosition(position);
        const slug = pathname.replace(/^\/tests\//, "");
        if (slug && slug !== allowedSlug) {
          return NextResponse.redirect(new URL(`/tests/${allowedSlug}`, request.url));
        }
      }
    }
  }

  if (isAdminRoute && !isAdminLogin) {
    if (!session || session.role !== "admin") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/tests/:path*", "/result"],
};

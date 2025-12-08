import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  const url = req.nextUrl.pathname;

  //Public routes
    // Public UI pages (not API endpoints). Use startsWith to tolerate trailing slashes or query strings.
    const publicRoutes = ["/auth/login", "/auth/signup", "/auth/reset"];
    if (publicRoutes.some((r) => url.startsWith(r))) {
        if (token) {
            // If user is already logged in, prevent returning to login/signup pages
            return NextResponse.redirect(new URL("/", req.url));
        }
        return NextResponse.next();
    }

    //Protected Pages
    if (!token) {
        // Redirect unauthenticated users to the UI login page (not the API route)
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // You can add more checks here, e.g., user role verification
        
        //Admin Protection
        if (url.startsWith("/admin") && decoded.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/", req.url));
        }

        return NextResponse.next();
    } catch (error) {
                // On token errors send the user to the login page
                return NextResponse.redirect(new URL("/auth/login", req.url));
    }
}

export const config = {
    // Don't run middleware on API auth routes to avoid intercepting API calls.
    matcher: ["/admin/:path*", "/", "/profile/:path*", "/auth/:path*"],
};
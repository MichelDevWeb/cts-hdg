import createMiddleware from "next-intl/middleware";
import { routing } from "@/lib/i18n/navigation";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except for
    // - API routes
    // - Next.js internals (_next)
    // - Static files (public folder)
    "/((?!api|_next|_vercel|.*\\..*).*)",
    // Also match internationalized pathnames
    "/",
  ],
};

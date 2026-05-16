import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

/**
 * Next.js 16 "proxy" (formerly `middleware`). next-intl ships a middleware that
 * detects/rewrites the locale segment and sets the NEXT_LOCALE cookie; we just
 * delegate to it.
 */
export function proxy(request: Parameters<typeof intlMiddleware>[0]) {
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

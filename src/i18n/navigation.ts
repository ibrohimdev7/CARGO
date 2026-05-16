import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

/**
 * Locale-aware navigation primitives. Import Link/useRouter/usePathname/redirect
 * from this module **instead of** next/link or next/navigation so URLs keep the
 * /[locale]/ prefix automatically.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

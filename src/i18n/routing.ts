import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["uz", "ru", "en"] as const,
  defaultLocale: "uz",
  localeCookie: {
    name: "NEXT_LOCALE",
    maxAge: 60 * 60 * 24 * 365,
  },
  localePrefix: "always",
});

export type AppLocale = (typeof routing.locales)[number];

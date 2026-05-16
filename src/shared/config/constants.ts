export const APP_VERSION = "0.1.0";

export const COOKIE_KEYS = {
  TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  LOCALE: "NEXT_LOCALE",
} as const;

export type CookieKey = (typeof COOKIE_KEYS)[keyof typeof COOKIE_KEYS];

export const DEFAULT_TIMEOUT_MS = 10_000;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 20,
} as const;

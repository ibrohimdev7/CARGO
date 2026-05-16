/**
 * Boundary between raw `process.env` and the rest of the app.
 *
 * Server-only values must NOT be prefixed with `NEXT_PUBLIC_`. Client-safe
 * values must be `NEXT_PUBLIC_*` so Next inlines them into the browser bundle.
 */

const optional = (value: string | undefined, fallback: string): string =>
  value ?? fallback;

export const env = {
  /** Public API base URL — used in browser and server. */
  apiUrl: optional(
    process.env.NEXT_PUBLIC_CLIENT_API,
    "https://api.sarbon.me/v1",
  ),

  /** Sarbon's `X-Client-Token` (per app identifier). Server-only secret. */
  sarbonClientToken: optional(process.env.SARBON_CLIENT_TOKEN, ""),

  /** Sarbon's `X-User-Token` (JWT). In production this comes from the user's
   *  cookie; for the test task it's pre-baked in env so the page can render
   *  without an auth flow. */
  sarbonUserToken: optional(process.env.SARBON_USER_TOKEN, ""),

  /** Constant device identifier sent to Sarbon. */
  sarbonDeviceType: optional(process.env.SARBON_DEVICE_TYPE, "web"),

  defaultLocale: optional(process.env.NEXT_PUBLIC_DEFAULT_LOCALE, "uz"),

  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
};

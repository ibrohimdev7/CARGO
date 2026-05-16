import "server-only";

import { cookies, headers } from "next/headers";

import { COOKIE_KEYS, env } from "@/shared/config";

import { _api } from "./base-service";
import type { RequestOptions } from "./types";

export interface ServerApiContext {
  /** Bearer / JWT auth token (X-User-Token). */
  token: string | null;
  /** Resolved locale (e.g. "uz", "ru", "en"). */
  locale: string;
  /** Headers ready to be spread into a fetch call. */
  headers: Headers;
  /** Shared API client. */
  api: typeof _api;
  /**
   * Helper that returns RequestOptions with all required Sarbon headers
   * (X-Device-Type, X-Language, X-Client-Token, X-User-Token) injected.
   */
  authed: (options?: RequestOptions) => RequestOptions;
}

export type ServerActionHandler<TArgs extends unknown[], TResult> = (
  context: ServerApiContext,
  ...args: TArgs
) => Promise<TResult>;

async function resolveLocale(): Promise<string> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(COOKIE_KEYS.LOCALE)?.value;
  if (cookieLocale) return cookieLocale;

  const headerStore = await headers();
  const acceptLanguage = headerStore.get("accept-language");
  if (acceptLanguage) {
    const primary = acceptLanguage.split(",")[0]?.split("-")[0]?.trim();
    if (primary) return primary;
  }

  return env.defaultLocale;
}

async function buildContext(): Promise<ServerApiContext> {
  const cookieStore = await cookies();
  // Prefer a runtime-issued cookie when present; fall back to the env-baked
  // test token so the dispatcher screen renders without a login flow.
  const cookieToken = cookieStore.get(COOKIE_KEYS.TOKEN)?.value;
  const token = cookieToken && cookieToken.length > 0
    ? cookieToken
    : env.sarbonUserToken || null;

  const locale = await resolveLocale();

  const baseHeaders = new Headers();
  baseHeaders.set("X-Device-Type", env.sarbonDeviceType);
  baseHeaders.set("X-Language", locale);
  baseHeaders.set("Accept", "*/*");
  if (env.sarbonClientToken) {
    baseHeaders.set("X-Client-Token", env.sarbonClientToken);
  }
  if (token) {
    baseHeaders.set("X-User-Token", token);
  }

  const authed = (options: RequestOptions = {}): RequestOptions => {
    const merged = new Headers(options.headers);
    baseHeaders.forEach((value, key) => {
      if (!merged.has(key)) merged.set(key, value);
    });
    return {
      ...options,
      headers: merged,
      baseUrl: options.baseUrl ?? env.apiUrl,
    };
  };

  return {
    token,
    locale,
    headers: baseHeaders,
    api: _api,
    authed,
  };
}

/**
 * Wrap a server-side function so that it receives a pre-built API context
 * (token, locale, Sarbon headers). Use inside Server Components / Server Actions.
 *
 * ```ts
 * export const getCargoList = withServerApi(({ api, authed }, query: CargoListQuery) =>
 *   api.get("dispatchers/cargo/all", { ...authed(), query })
 * );
 * ```
 */
export function withServerApi<TArgs extends unknown[], TResult>(
  handler: ServerActionHandler<TArgs, TResult>,
): (...args: TArgs) => Promise<TResult> {
  return async (...args: TArgs): Promise<TResult> => {
    const context = await buildContext();
    return handler(context, ...args);
  };
}

export const createServerApiAction = withServerApi;

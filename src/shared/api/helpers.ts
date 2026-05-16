import type { QueryParams, QueryValue } from "./types";

const isNullish = (value: QueryValue): value is null | undefined =>
  value === null || value === undefined;

/**
 * Convert a plain object into a URLSearchParams string.
 * - skips null/undefined entries
 * - serializes arrays as repeated keys (?tags=a&tags=b)
 * - does not include the leading "?"
 */
export function jsonToStringSearchParams(query?: QueryParams): string {
  if (!query) return "";

  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (isNullish(value)) continue;

    if (Array.isArray(value)) {
      for (const item of value) {
        if (isNullish(item)) continue;
        params.append(key, String(item));
      }
      continue;
    }

    params.append(key, String(value));
  }

  const result = params.toString();
  return result.length > 0 ? `?${result}` : "";
}

/**
 * Compose a full URL from base + endpoint + query string.
 * Endpoint may be absolute (http(s)://...) or relative ("product/list").
 */
export function buildRequestUrl(
  baseUrl: string,
  endpoint: string,
  query?: QueryParams,
): string {
  const search = jsonToStringSearchParams(query);

  if (/^https?:\/\//i.test(endpoint)) {
    return `${endpoint}${search}`;
  }

  const normalizedBase = baseUrl.replace(/\/+$/, "");
  const normalizedEndpoint = endpoint.replace(/^\/+/, "");
  return `${normalizedBase}/${normalizedEndpoint}${search}`;
}

export const isFormData = (value: unknown): value is FormData =>
  typeof FormData !== "undefined" && value instanceof FormData;

export const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" &&
  value !== null &&
  (value.constructor === Object || Object.getPrototypeOf(value) === null);

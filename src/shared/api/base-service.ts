import {
  FetchError,
  FetchNetworkError,
  FetchTimeoutError,
} from "./fetch-error";
import { buildRequestUrl, isFormData } from "./helpers";
import type { HttpMethod, RequestOptions } from "./types";

const DEFAULT_TIMEOUT_MS = 10_000;
const JSON_HEADER = "application/json";

const resolveDefaultBaseUrl = (): string => {
  const fromEnv = process.env.NEXT_PUBLIC_CLIENT_API;
  if (!fromEnv) return "/api";
  return fromEnv.replace(/\/+$/, "");
};

/** Merge user-provided headers with defaults; user values win. */
function mergeHeaders(
  defaults: Record<string, string>,
  incoming: HeadersInit | undefined,
): Headers {
  const headers = new Headers();
  for (const [key, value] of Object.entries(defaults)) {
    headers.set(key, value);
  }
  if (incoming) {
    const incomingHeaders = new Headers(incoming);
    incomingHeaders.forEach((value, key) => headers.set(key, value));
  }
  return headers;
}

async function readBody(response: Response): Promise<unknown> {
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch (cause) {
      throw new FetchError({
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        payload: null,
        message: `Failed to parse JSON response from ${response.url}: ${
          cause instanceof Error ? cause.message : String(cause)
        }`,
      });
    }
  }

  return await response.text();
}

async function validateResponse(response: Response): Promise<unknown> {
  const body = await readBody(response);

  if (response.ok) {
    return body;
  }

  throw new FetchError({
    status: response.status,
    statusText: response.statusText,
    url: response.url,
    payload: body,
  });
}

class BaseService {
  private readonly defaultBaseUrl: string;

  constructor(defaultBaseUrl: string = resolveDefaultBaseUrl()) {
    this.defaultBaseUrl = defaultBaseUrl;
  }

  get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("GET", endpoint, undefined, options);
  }

  post<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>("POST", endpoint, body, options);
  }

  put<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>("PUT", endpoint, body, options);
  }

  patch<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>("PATCH", endpoint, body, options);
  }

  delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("DELETE", endpoint, undefined, options);
  }

  private async request<T>(
    method: HttpMethod,
    endpoint: string,
    body: unknown,
    options: RequestOptions = {},
  ): Promise<T> {
    const {
      query,
      timeoutMs = DEFAULT_TIMEOUT_MS,
      baseUrl = this.defaultBaseUrl,
      headers,
      signal: externalSignal,
      next,
      ...rest
    } = options;

    const url = buildRequestUrl(baseUrl, endpoint, query);
    const bodyIsForm = isFormData(body);

    const finalHeaders = mergeHeaders(
      bodyIsForm
        ? { Accept: JSON_HEADER }
        : { Accept: JSON_HEADER, "Content-Type": JSON_HEADER },
      headers,
    );

    if (bodyIsForm) {
      finalHeaders.delete("Content-Type");
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    if (externalSignal) {
      if (externalSignal.aborted) {
        controller.abort();
      } else {
        externalSignal.addEventListener("abort", () => controller.abort(), {
          once: true,
        });
      }
    }

    let response: Response;
    try {
      response = await fetch(url, {
        ...rest,
        method,
        headers: finalHeaders,
        body: method === "GET" || method === "DELETE" || body === undefined
          ? undefined
          : bodyIsForm
            ? (body as FormData)
            : JSON.stringify(body),
        signal: controller.signal,
        ...(next ? { next } : {}),
      });
    } catch (cause) {
      if (controller.signal.aborted && !externalSignal?.aborted) {
        throw new FetchTimeoutError(url, timeoutMs);
      }
      throw new FetchNetworkError(url, cause);
    } finally {
      clearTimeout(timeoutId);
    }

    const data = await validateResponse(response);
    return data as T;
  }
}

export const baseService = new BaseService();
export const _api = baseService;
export { BaseService };

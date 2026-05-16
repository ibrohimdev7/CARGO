export type FetchErrorPayload = unknown;

export class FetchError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly url: string;
  readonly payload: FetchErrorPayload;

  constructor(params: {
    status: number;
    statusText: string;
    url: string;
    payload: FetchErrorPayload;
    message?: string;
  }) {
    super(
      params.message ??
        `Request to ${params.url} failed with ${params.status} ${params.statusText}`,
    );
    this.name = "FetchError";
    this.status = params.status;
    this.statusText = params.statusText;
    this.url = params.url;
    this.payload = params.payload;
  }

  get isUnauthorized(): boolean {
    return this.status === 401;
  }

  get isForbidden(): boolean {
    return this.status === 403;
  }

  get isNotFound(): boolean {
    return this.status === 404;
  }

  get isValidation(): boolean {
    return this.status === 422 || this.status === 400;
  }

  get isServerError(): boolean {
    return this.status >= 500;
  }
}

export class FetchTimeoutError extends Error {
  readonly url: string;
  readonly timeoutMs: number;

  constructor(url: string, timeoutMs: number) {
    super(`Request to ${url} timed out after ${timeoutMs}ms`);
    this.name = "FetchTimeoutError";
    this.url = url;
    this.timeoutMs = timeoutMs;
  }
}

export class FetchNetworkError extends Error {
  readonly url: string;
  override readonly cause: unknown;

  constructor(url: string, cause: unknown) {
    super(`Network error while requesting ${url}`);
    this.name = "FetchNetworkError";
    this.url = url;
    this.cause = cause;
  }
}

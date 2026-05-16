export type JsonPrimitive = string | number | boolean | null;
export type JsonValue =
  | JsonPrimitive
  | JsonValue[]
  | { [key: string]: JsonValue };

export type QueryValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Array<string | number | boolean>;

export type QueryParams = Record<string, QueryValue>;

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestOptions extends Omit<RequestInit, "method" | "body"> {
  query?: QueryParams;
  timeoutMs?: number;
  baseUrl?: string;
  /** Next.js fetch caching options (passed through to fetch). */
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

/** Generic API response wrapper used by the backend. */
export interface ResDataType<T> {
  data: T;
  message?: string;
  status?: number;
}

export interface GetListMetaType {
  total: number;
  page: number;
  pageSize: number;
  totalPages?: number;
}

export interface GetListDataType<T> {
  items: T[];
  meta: GetListMetaType;
}

export type ListResponse<T> = ResDataType<GetListDataType<T>>;

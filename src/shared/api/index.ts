export {
  BaseService,
  baseService,
  _api,
} from "./base-service";
export {
  FetchError,
  FetchNetworkError,
  FetchTimeoutError,
} from "./fetch-error";
export type { FetchErrorPayload } from "./fetch-error";
export {
  buildRequestUrl,
  isFormData,
  isPlainObject,
  jsonToStringSearchParams,
} from "./helpers";
export type {
  GetListDataType,
  GetListMetaType,
  HttpMethod,
  JsonPrimitive,
  JsonValue,
  ListResponse,
  QueryParams,
  QueryValue,
  RequestOptions,
  ResDataType,
} from "./types";

// NOTE: `withServerApi` / `createServerApiAction` are server-only. Do NOT
// re-export them from this barrel — doing so would force `server-only` to be
// pulled into any client component that imports anything from `@/shared/api`.
// Import them directly from `@/shared/api/with-server-api` in server code.

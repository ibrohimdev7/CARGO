import {
  _api,
  type RequestOptions,
  type ResDataType,
} from "@/shared/api";

import type {
  Cargo,
  CargoListData,
  CargoListQuery,
} from "../model/types";

const CARGO_BASE = "dispatchers/cargo";

const DEFAULT_QUERY: Required<Pick<CargoListQuery, "page" | "limit" | "sort" | "status">> = {
  page: 1,
  limit: 20,
  sort: "created_at:desc",
  status: "SEARCHING_ALL",
};

export const cargoApi = {
  /**
   * GET /v1/dispatchers/cargo/all
   * Returns paginated cargo for the dispatcher dashboard.
   */
  list(query: CargoListQuery = {}, options?: RequestOptions) {
    const merged = { ...DEFAULT_QUERY, ...query };
    return _api.get<ResDataType<CargoListData>>(`${CARGO_BASE}/all`, {
      ...options,
      query: merged,
    });
  },

  detail(id: string, options?: RequestOptions) {
    return _api.get<ResDataType<Cargo>>(`${CARGO_BASE}/${id}`, options);
  },
};

export const cargoList = cargoApi.list;
export const cargoDetail = cargoApi.detail;

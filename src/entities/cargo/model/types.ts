export type CargoId = string;

export type CargoStatus =
  | "SEARCHING_ALL"
  | "SEARCHING"
  | "ON_THE_WAY"
  | "DELIVERED"
  | "CANCELLED"
  | "DRAFT"
  | "MODERATION"
  | "REJECTED";

export type Currency = "UZS" | "USD" | "RUB" | "EUR" | string;

export type PaymentMethod = "CASH" | "CARD" | "ON_DELIVERY" | string;

export type RoutePointType = "LOAD" | "UNLOAD";

export type TruckType = "TENT" | "ISOTHERM" | "REF" | "FLATBED" | string;

export type TrailerPlateType = "TENTED" | "OPEN" | "REFRIGERATED" | string;

export type PowerPlateType = "TRUCK" | "VAN" | string;

export type CreatedByType = "DISPATCHER" | "CUSTOMER" | "DRIVER" | string;

/** Localized cargo type label (the API ships all locales at once). */
export interface CargoTypeRef {
  id: string;
  code: string;
  name_uz: string;
  name_ru: string;
  name_en: string;
  name_tr?: string;
  name_zh?: string;
}

export interface PaymentItem {
  amount: number;
  currency: Currency;
  method: PaymentMethod;
}

export interface CargoPayment {
  id: string;
  cargo_id: string;
  is_negotiable: boolean;
  payment_note: string | null;
  payment_terms_note: string | null;
  prepayment_amount: number;
  prepayment_currency: Currency;
  prepayment_type: PaymentMethod;
  prepayment_items: PaymentItem[];
  remaining_amount: number;
  remaining_currency: Currency;
  remaining_type: PaymentMethod;
  remaining_items: PaymentItem[];
  total_amount: number;
  total_currency: Currency;
  with_prepayment: boolean;
  price_request: boolean;
}

export interface CargoRoutePoint {
  id: string;
  cargo_id: string;
  type: RoutePointType;
  address: string;
  city_code: string;
  city_name: string;
  country_code: string;
  region_code: string;
  comment: string | null;
  date: string;
  delivery_asap: boolean;
  lat: number;
  lng: number;
  orientir: string;
  place_id: string;
  point_order: number;
  is_main_load: boolean;
  is_main_unload: boolean;
  ready_enabled: boolean;
}

export interface Cargo {
  id: CargoId;
  name: string | null;
  comment: string | null;
  cargo_type: CargoTypeRef | null;
  status: CargoStatus;
  contact_name: string;
  contact_phone: string;
  company_id: string | null;
  created_at: string;
  updated_at: string;
  created_by_id: string;
  created_by_type: CreatedByType;
  is_liked: boolean;
  is_two_drivers_required: boolean;
  loading_types: string[];
  unloading_types: string[];
  documents: Record<string, unknown> | null;
  dimensions: Record<string, unknown> | null;
  weight: number;
  volume: number;
  vehicles_amount: number;
  vehicles_left: number;
  shipment_type: string | null;
  truck_type: TruckType;
  trailer_plate_type: TrailerPlateType;
  power_plate_type: PowerPlateType;
  adr_class: string | null;
  adr_enabled: boolean;
  belts_count: number | null;
  packaging: string | null;
  packaging_amount: number | null;
  temp_max: number | null;
  temp_min: number | null;
  photos: string[];
  moderation_rejection_reason: string | null;
  payment: CargoPayment;
  route_points: CargoRoutePoint[];
  way_points: CargoRoutePoint[];
}

export type SortField = "created_at" | "updated_at";
export type SortDirection = "asc" | "desc";

export interface CargoListQuery {
  page?: number;
  limit?: number;
  status?: CargoStatus;
  /** Example: "created_at:desc". */
  sort?: `${SortField}:${SortDirection}` | string;
}

export interface CargoListData {
  items: Cargo[];
  total: number;
}

export const CARGO_STATUSES = [
  "SEARCHING_ALL",
  "SEARCHING",
  "ON_THE_WAY",
  "DELIVERED",
  "CANCELLED",
  "DRAFT",
] satisfies CargoStatus[];

export const PAGE_SIZE_OPTIONS = [10, 20, 50] as const;
export type PageSize = (typeof PAGE_SIZE_OPTIONS)[number];

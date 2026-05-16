import type {
  Cargo,
  CargoRoutePoint,
  CargoTypeRef,
  Currency,
} from "../model/types";

const NUMBER_FORMATTERS = new Map<string, Intl.NumberFormat>();
const CURRENCY_FORMATTERS = new Map<string, Intl.NumberFormat>();

const numberFormatter = (locale: string): Intl.NumberFormat => {
  const key = locale;
  const cached = NUMBER_FORMATTERS.get(key);
  if (cached) return cached;
  const formatter = new Intl.NumberFormat(localeToIntl(locale), {
    maximumFractionDigits: 0,
  });
  NUMBER_FORMATTERS.set(key, formatter);
  return formatter;
};

const currencyFormatter = (
  locale: string,
  currency: Currency,
): Intl.NumberFormat => {
  const key = `${locale}-${currency}`;
  const cached = CURRENCY_FORMATTERS.get(key);
  if (cached) return cached;
  // Some currencies (UZS) need explicit "narrow" formatting in some locales;
  // fall back gracefully if Intl refuses the currency code.
  try {
    const formatter = new Intl.NumberFormat(localeToIntl(locale), {
      style: "currency",
      currency,
      maximumFractionDigits: currency === "UZS" ? 0 : 2,
    });
    CURRENCY_FORMATTERS.set(key, formatter);
    return formatter;
  } catch {
    const fallback = numberFormatter(locale);
    CURRENCY_FORMATTERS.set(key, fallback);
    return fallback;
  }
};

const localeToIntl = (locale: string): string => {
  if (locale === "uz") return "uz-UZ";
  if (locale === "ru") return "ru-RU";
  if (locale === "en") return "en-US";
  return locale;
};

export function formatNumber(value: number, locale = "uz"): string {
  return numberFormatter(locale).format(value);
}

export function formatPrice(
  amount: number,
  currency: Currency,
  locale = "uz",
): string {
  if (!Number.isFinite(amount)) return "—";
  try {
    return currencyFormatter(locale, currency).format(amount);
  } catch {
    return `${formatNumber(amount, locale)} ${currency}`;
  }
}

export function formatWeight(tons: number, locale = "uz"): string {
  return `${formatNumber(tons, locale)} t`;
}

export function formatVolume(m3: number, locale = "uz"): string {
  return `${formatNumber(m3, locale)} m³`;
}

export function formatDate(iso: string, locale = "uz"): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(localeToIntl(locale), {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function getCargoTypeName(
  cargoType: CargoTypeRef | null | undefined,
  locale: string,
): string {
  if (!cargoType) return "—";
  switch (locale) {
    case "ru":
      return cargoType.name_ru;
    case "en":
      return cargoType.name_en;
    case "uz":
    default:
      return cargoType.name_uz;
  }
}

export function getLoadPoint(cargo: Cargo): CargoRoutePoint | undefined {
  return [...cargo.route_points]
    .sort((a, b) => a.point_order - b.point_order)
    .find((p) => p.type === "LOAD");
}

export function getUnloadPoint(cargo: Cargo): CargoRoutePoint | undefined {
  return [...cargo.route_points]
    .sort((a, b) => b.point_order - a.point_order)
    .find((p) => p.type === "UNLOAD");
}

export function formatRoute(cargo: Cargo): string {
  const from = getLoadPoint(cargo)?.city_name ?? "—";
  const to = getUnloadPoint(cargo)?.city_name ?? "—";
  return `${from} → ${to}`;
}

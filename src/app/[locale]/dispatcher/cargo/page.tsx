import { getTranslations, setRequestLocale } from "next-intl/server";

import {
  PAGE_SIZE_OPTIONS,
  type CargoListData,
  type CargoListQuery,
  type CargoStatus,
  type PageSize,
} from "@/entities/cargo";
import { type ResDataType } from "@/shared/api";
import { withServerApi } from "@/shared/api/with-server-api";
import { CargoFilter } from "@/widgets/cargo-filter";
import { CargoTable } from "@/widgets/cargo-table";
import { Pagination } from "@/widgets/pagination";

const DEFAULT_LIMIT: PageSize = 20;
const DEFAULT_STATUS: CargoStatus = "SEARCHING_ALL";
const DEFAULT_SORT = "created_at:desc";

const fetchCargo = withServerApi(
  async ({ api, authed }, query: CargoListQuery) =>
    api.get<ResDataType<CargoListData>>("dispatchers/cargo/all", {
      ...authed(),
      query: { ...query },
      // Don't cache user-specific dispatcher data
      cache: "no-store",
    }),
);

const toInt = (value: string | undefined, fallback: number): number => {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const toLimit = (value: string | undefined): PageSize => {
  const parsed = toInt(value, DEFAULT_LIMIT);
  return (PAGE_SIZE_OPTIONS as readonly number[]).includes(parsed)
    ? (parsed as PageSize)
    : DEFAULT_LIMIT;
};

const toStatus = (value: string | undefined): CargoStatus => {
  return (value as CargoStatus | undefined) ?? DEFAULT_STATUS;
};

export default async function DispatcherCargoPage({
  params,
  searchParams,
}: PageProps<"/[locale]/dispatcher/cargo">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const sp = await searchParams;
  const page = toInt(
    Array.isArray(sp.page) ? sp.page[0] : sp.page,
    1,
  );
  const limit = toLimit(Array.isArray(sp.limit) ? sp.limit[0] : sp.limit);
  const status = toStatus(
    Array.isArray(sp.status) ? sp.status[0] : sp.status,
  );
  const sort =
    (Array.isArray(sp.sort) ? sp.sort[0] : sp.sort) ?? DEFAULT_SORT;

  const t = await getTranslations("DispatcherCargo");

  const response = await fetchCargo({ page, limit, status, sort });
  const { items, total } = response.data;

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:py-12">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {t("title")}
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {t("subtitle")} ·{" "}
          <span className="font-medium">
            {t("totalLabel")}: {total}
          </span>
        </p>
      </header>

      <CargoFilter status={status} limit={limit} sort={sort} />

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-zinc-200 bg-white py-16 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-base font-medium text-zinc-700 dark:text-zinc-200">
            {t("emptyTitle")}
          </p>
          <p className="max-w-md text-sm text-zinc-500">{t("emptyHint")}</p>
        </div>
      ) : (
        <>
          <CargoTable items={items} locale={locale} />
          <Pagination total={total} page={page} limit={limit} />
        </>
      )}
    </section>
  );
}

import { getTranslations } from "next-intl/server";

import type { Cargo } from "@/entities/cargo";

import { CargoCard, CargoTableRow } from "./cargo-row";

interface Props {
  items: Cargo[];
  locale: string;
}

export async function CargoTable({ items, locale }: Props) {
  const t = await getTranslations("CargoTable");
  const tStatus = await getTranslations("CargoStatus");

  const buildLabels = (cargo: Cargo) => ({
    statusLabel: tStatus(cargo.status),
    typeLabel: t("type"),
    routeLabel: t("route"),
    dateLabel: t("loadDate"),
    weightLabel: t("weight"),
    volumeLabel: t("volume"),
    priceLabel: t("price"),
    contactLabel: t("contact"),
    twoDrivers: t("twoDrivers"),
    priceOnRequest: t("priceOnRequest"),
    negotiable: t("negotiable"),
    vehiclesLabel: t("vehicles"),
    noName: t("noName"),
  });

  return (
    <>
      {/* Desktop / tablet — table */}
      <div className="hidden overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 md:block">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
          <thead className="bg-zinc-50 text-left text-xs font-medium uppercase tracking-wide text-zinc-500 dark:bg-zinc-900/40">
            <tr>
              <th scope="col" className="px-4 py-3">{t("cargo")}</th>
              <th scope="col" className="px-4 py-3">{t("route")}</th>
              <th scope="col" className="px-4 py-3">{t("loadDate")}</th>
              <th scope="col" className="px-4 py-3">
                {t("weight")} / {t("volume")}
              </th>
              <th scope="col" className="px-4 py-3">{t("price")}</th>
              <th scope="col" className="px-4 py-3">{t("status")}</th>
              <th scope="col" className="px-4 py-3">{t("contact")}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((cargo) => (
              <CargoTableRow
                key={cargo.id}
                cargo={cargo}
                locale={locale}
                labels={buildLabels(cargo)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile — card stack */}
      <div className="grid gap-3 md:hidden">
        {items.map((cargo) => (
          <CargoCard
            key={cargo.id}
            cargo={cargo}
            locale={locale}
            labels={buildLabels(cargo)}
          />
        ))}
      </div>
    </>
  );
}

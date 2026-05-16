import { Phone, Users, Weight } from "lucide-react";

import {
  CargoStatusBadge,
  formatDate,
  formatPrice,
  formatRoute,
  formatVolume,
  formatWeight,
  getCargoTypeName,
  getLoadPoint,
  type Cargo,
} from "@/entities/cargo";

interface Props {
  cargo: Cargo;
  locale: string;
  labels: {
    statusLabel: string;
    typeLabel: string;
    routeLabel: string;
    dateLabel: string;
    weightLabel: string;
    volumeLabel: string;
    priceLabel: string;
    contactLabel: string;
    twoDrivers: string;
    priceOnRequest: string;
    negotiable: string;
    vehiclesLabel: string;
    noName: string;
  };
}

function CargoPrice({
  cargo,
  locale,
  onRequestLabel,
  negotiableLabel,
}: {
  cargo: Cargo;
  locale: string;
  onRequestLabel: string;
  negotiableLabel: string;
}) {
  if (cargo.payment.price_request) {
    return <span className="text-zinc-500">{onRequestLabel}</span>;
  }
  return (
    <div className="flex flex-col">
      <span className="font-medium">
        {formatPrice(
          cargo.payment.total_amount,
          cargo.payment.total_currency,
          locale,
        )}
      </span>
      {cargo.payment.is_negotiable ? (
        <span className="text-xs text-zinc-500">{negotiableLabel}</span>
      ) : null}
    </div>
  );
}

/** Desktop table row. */
export function CargoTableRow({ cargo, locale, labels }: Props) {
  const loadPoint = getLoadPoint(cargo);

  return (
    <tr className="border-b border-zinc-200 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900/50">
      <td className="px-4 py-3">
        <div className="flex flex-col">
          <span className="font-medium text-zinc-900 dark:text-zinc-50">
            {cargo.name?.trim() || labels.noName}
          </span>
          <span className="text-xs text-zinc-500">
            {getCargoTypeName(cargo.cargo_type, locale)}
          </span>
        </div>
      </td>
      <td className="px-4 py-3 text-sm">{formatRoute(cargo)}</td>
      <td className="px-4 py-3 text-sm">
        {loadPoint ? formatDate(loadPoint.date, locale) : "—"}
      </td>
      <td className="px-4 py-3 text-sm">
        {formatWeight(cargo.weight, locale)} ·{" "}
        <span className="text-zinc-500">
          {formatVolume(cargo.volume, locale)}
        </span>
      </td>
      <td className="px-4 py-3 text-sm">
        <CargoPrice
          cargo={cargo}
          locale={locale}
          onRequestLabel={labels.priceOnRequest}
          negotiableLabel={labels.negotiable}
        />
      </td>
      <td className="px-4 py-3">
        <CargoStatusBadge status={cargo.status} label={labels.statusLabel} />
        {cargo.is_two_drivers_required ? (
          <span className="ml-2 inline-flex items-center gap-1 text-xs text-amber-700 dark:text-amber-300">
            <Users className="h-3 w-3" />
            {labels.twoDrivers}
          </span>
        ) : null}
      </td>
      <td className="px-4 py-3 text-sm">
        <div className="flex flex-col">
          <span className="font-medium">{cargo.contact_name}</span>
          <a
            href={`tel:${cargo.contact_phone}`}
            className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            <Phone className="h-3 w-3" />
            {cargo.contact_phone}
          </a>
        </div>
      </td>
    </tr>
  );
}

/** Mobile card layout (rendered below md breakpoint). */
export function CargoCard({ cargo, locale, labels }: Props) {
  const loadPoint = getLoadPoint(cargo);

  return (
    <article className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <header className="flex items-start justify-between gap-3">
        <div className="flex flex-col">
          <span className="font-semibold text-zinc-900 dark:text-zinc-50">
            {cargo.name?.trim() || labels.noName}
          </span>
          <span className="text-xs text-zinc-500">
            {getCargoTypeName(cargo.cargo_type, locale)}
          </span>
        </div>
        <CargoStatusBadge status={cargo.status} label={labels.statusLabel} />
      </header>

      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div className="col-span-2">
          <dt className="text-xs uppercase text-zinc-500">
            {labels.routeLabel}
          </dt>
          <dd className="font-medium">{formatRoute(cargo)}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-zinc-500">
            {labels.dateLabel}
          </dt>
          <dd>{loadPoint ? formatDate(loadPoint.date, locale) : "—"}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-zinc-500">
            {labels.weightLabel}
          </dt>
          <dd className="inline-flex items-center gap-1">
            <Weight className="h-3 w-3" />
            {formatWeight(cargo.weight, locale)}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-zinc-500">
            {labels.volumeLabel}
          </dt>
          <dd>{formatVolume(cargo.volume, locale)}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-zinc-500">
            {labels.priceLabel}
          </dt>
          <dd>
            <CargoPrice
              cargo={cargo}
              locale={locale}
              onRequestLabel={labels.priceOnRequest}
              negotiableLabel={labels.negotiable}
            />
          </dd>
        </div>
      </dl>

      <footer className="flex items-center justify-between border-t border-zinc-100 pt-3 text-sm dark:border-zinc-800">
        <span className="font-medium">{cargo.contact_name}</span>
        <a
          href={`tel:${cargo.contact_phone}`}
          className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50"
        >
          <Phone className="h-3 w-3" />
          {cargo.contact_phone}
        </a>
      </footer>
    </article>
  );
}

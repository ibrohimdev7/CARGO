import { cn } from "@/shared/lib";

import {
  formatPrice,
  formatRoute,
  formatVolume,
  formatWeight,
} from "../lib/format";
import type { Cargo } from "../model/types";

interface Props {
  cargo: Cargo;
  locale?: string;
  className?: string;
}

export function CargoInfo({ cargo, locale = "uz", className }: Props) {
  const { payment } = cargo;
  const totalLabel = payment.price_request
    ? "—"
    : formatPrice(payment.total_amount, payment.total_currency, locale);

  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-3 text-sm sm:grid-cols-4",
        className,
      )}
    >
      <div>
        <dt className="text-xs uppercase text-zinc-500">Route</dt>
        <dd className="font-medium">{formatRoute(cargo)}</dd>
      </div>
      <div>
        <dt className="text-xs uppercase text-zinc-500">Weight</dt>
        <dd className="font-medium">{formatWeight(cargo.weight, locale)}</dd>
      </div>
      <div>
        <dt className="text-xs uppercase text-zinc-500">Volume</dt>
        <dd className="font-medium">{formatVolume(cargo.volume, locale)}</dd>
      </div>
      <div>
        <dt className="text-xs uppercase text-zinc-500">Price</dt>
        <dd className="font-medium">{totalLabel}</dd>
      </div>
    </dl>
  );
}

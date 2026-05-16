import { cn } from "@/shared/lib";

import type { CargoStatus } from "../model/types";

const STATUS_CLASSES: Record<string, string> = {
  SEARCHING_ALL:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  SEARCHING:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  ON_THE_WAY:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  DELIVERED:
    "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
  CANCELLED:
    "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  DRAFT:
    "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  MODERATION:
    "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  REJECTED:
    "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
};

interface Props {
  status: CargoStatus | string;
  label: string;
  className?: string;
}

export function CargoStatusBadge({ status, label, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        STATUS_CLASSES[status] ??
          "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
        className,
      )}
    >
      {label}
    </span>
  );
}

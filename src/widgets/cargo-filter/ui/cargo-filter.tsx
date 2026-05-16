"use client";

import { useTranslations } from "next-intl";
import { useTransition } from "react";

import {
  CARGO_STATUSES,
  PAGE_SIZE_OPTIONS,
  type CargoStatus,
  type PageSize,
} from "@/entities/cargo";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";

interface Props {
  status: CargoStatus;
  limit: PageSize;
  sort: string;
}

export function CargoFilter({ status, limit, sort }: Props) {
  const t = useTranslations("CargoFilter");
  const tStatus = useTranslations("CargoStatus");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const setParam = (key: string, value: string) => {
    const search = new URLSearchParams(
      typeof window !== "undefined" ? window.location.search : "",
    );
    search.set(key, value);
    // Any filter change resets page to 1.
    if (key !== "page") search.set("page", "1");
    startTransition(() => {
      router.replace(`${pathname}?${search.toString()}`);
    });
  };

  const reset = () => {
    startTransition(() => {
      router.replace(pathname);
    });
  };

  return (
    <section
      className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:items-end sm:justify-between"
      aria-busy={isPending}
    >
      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
          <span>{t("statusLabel")}</span>
          <Select
            value={status}
            onValueChange={(value) => setParam("status", value)}
            disabled={isPending}
          >
            <SelectTrigger className="h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CARGO_STATUSES.map((code) => (
                <SelectItem key={code} value={code}>
                  {tStatus(code)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
          <span>{t("sortLabel")}</span>
          <Select
            value={sort}
            onValueChange={(value) => setParam("sort", value)}
            disabled={isPending}
          >
            <SelectTrigger className="h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="created_at:desc">{t("sortNewest")}</SelectItem>
              <SelectItem value="created_at:asc">{t("sortOldest")}</SelectItem>
            </SelectContent>
          </Select>
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
          <span>{t("limitLabel")}</span>
          <Select
            value={String(limit)}
            onValueChange={(value) => setParam("limit", value)}
            disabled={isPending}
          >
            <SelectTrigger className="h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZE_OPTIONS.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
      </div>

      <button
        type="button"
        onClick={reset}
        disabled={isPending}
        className="h-9 shrink-0 rounded-md border border-zinc-200 px-3 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        {t("reset")}
      </button>
    </section>
  );
}

"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransition } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/shared/lib";

interface Props {
  total: number;
  page: number;
  limit: number;
  className?: string;
}

export function Pagination({ total, page, limit, className }: Props) {
  const t = useTranslations("Pagination");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const totalPages = Math.max(1, Math.ceil(total / limit));
  const canPrev = page > 1 && !isPending;
  const canNext = page < totalPages && !isPending;

  const goTo = (next: number) => {
    if (next < 1 || next > totalPages) return;
    const search = new URLSearchParams(
      typeof window !== "undefined" ? window.location.search : "",
    );
    search.set("page", String(next));
    startTransition(() => {
      router.replace(`${pathname}?${search.toString()}`);
    });
  };

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        "flex flex-col items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row",
        className,
      )}
    >
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {t("page")} <span className="font-medium">{page}</span> {t("of")}{" "}
        <span className="font-medium">{totalPages}</span>
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => goTo(page - 1)}
          disabled={!canPrev}
          className="inline-flex h-9 items-center gap-1 rounded-md border border-zinc-200 px-3 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <ChevronLeft className="h-4 w-4" />
          {t("previous")}
        </button>
        <button
          type="button"
          onClick={() => goTo(page + 1)}
          disabled={!canNext}
          className="inline-flex h-9 items-center gap-1 rounded-md border border-zinc-200 px-3 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          {t("next")}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </nav>
  );
}

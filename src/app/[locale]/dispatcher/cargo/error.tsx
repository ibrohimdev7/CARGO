"use client";

import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { Button } from "@/shared/ui";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DispatcherCargoError({ error, reset }: Props) {
  const t = useTranslations("DispatcherCargo");

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error("[DispatcherCargoError]", error);
    }
  }, [error]);

  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-20 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300">
        <AlertTriangle className="h-6 w-6" />
      </span>
      <h2 className="text-xl font-semibold">{t("errorTitle")}</h2>
      <p className="max-w-md text-sm text-zinc-500">{error.message}</p>
      <Button onClick={reset} variant="primary">
        {t("errorRetry")}
      </Button>
    </section>
  );
}

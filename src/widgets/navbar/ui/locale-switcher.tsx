"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";

const LABELS: Record<AppLocale, string> = {
  uz: "O'zbekcha",
  ru: "Русский",
  en: "English",
};

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as AppLocale;
  const [isPending, startTransition] = useTransition();

  const onChange = (next: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: next as AppLocale });
    });
  };

  return (
    <Select value={locale} onValueChange={onChange} disabled={isPending}>
      <SelectTrigger className="h-8 w-[120px] text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {routing.locales.map((code) => (
          <SelectItem key={code} value={code}>
            {LABELS[code]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

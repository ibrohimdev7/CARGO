import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { Button } from "@/shared/ui";

import { LocaleSwitcher } from "./locale-switcher";
import Image from "next/image";

export async function Navbar() {
  const t = await getTranslations("Navbar");

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          <Image
            src={"/srb.png"}
            alt="CargoList"
            width={108}
            height={32}
            className="inline-block"
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/dispatcher/cargo"
            className="text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
          >
            {t("dispatcher")}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <Button asChild size="sm" variant="primary" className="md:hidden">
            <Link href="/dispatcher/cargo">{t("dispatcher")}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

export async function Footer() {
  const t = await getTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-white py-8 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          © {year} {t("rights")}
        </p>
        <nav className="flex gap-4 text-sm text-zinc-600 dark:text-zinc-400">
          <Link href="/about" className="hover:text-zinc-900 dark:hover:text-zinc-50">
            {t("about")}
          </Link>
          <Link href="/contact" className="hover:text-zinc-900 dark:hover:text-zinc-50">
            {t("contact")}
          </Link>
          <Link href="/privacy" className="hover:text-zinc-900 dark:hover:text-zinc-50">
            {t("privacy")}
          </Link>
        </nav>
      </div>
    </footer>
  );
}

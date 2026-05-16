import { setRequestLocale, getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { Button } from "@/shared/ui";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Home");

  return (
    <section className="bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-24 text-center sm:py-32">
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          {t("title")}
        </h1>
        <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          {t("subtitle")}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/dispatcher/cargo">{t("ctaDispatcher")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

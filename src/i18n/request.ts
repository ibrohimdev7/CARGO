import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing, type AppLocale } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: AppLocale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = (
    await import(`@/shared/translations/locales/${locale}.json`)
  ).default;

  return {
    locale,
    messages,
  };
});

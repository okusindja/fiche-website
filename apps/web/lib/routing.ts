import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en", "fr", "zh"],
  defaultLocale: "pt",
  localePrefix: "as-needed",
});

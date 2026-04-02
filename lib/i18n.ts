export const locales = ["tr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "tr";

export type LocalizedText = Record<Locale, string>;

export function getLocalizedText(
  value: LocalizedText,
  locale: Locale = defaultLocale
) {
  return value[locale];
}

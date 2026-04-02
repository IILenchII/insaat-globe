"use client";

import { useLanguage } from "@/components/site/LanguageProvider";
import { getSiteCopy } from "@/lib/siteCopy";

export default function Navbar() {
  const { locale, setLocale } = useLanguage();
  const copy = getSiteCopy(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08101b]/78 backdrop-blur-xl">
      <div className="section-container flex h-20 items-center justify-between">
        <a href="#home" className="text-lg font-black tracking-[0.28em] text-white">
          {copy.nav.brand}
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {copy.nav.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-white/80 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex rounded-full border border-white/10 bg-white/5 p-1">
            <button
              type="button"
              onClick={() => setLocale("tr")}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                locale === "tr"
                  ? "bg-white text-ink"
                  : "text-white/70 hover:text-white"
              }`}
            >
              TR
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                locale === "en"
                  ? "bg-white text-ink"
                  : "text-white/70 hover:text-white"
              }`}
            >
              EN
            </button>
          </div>

          <a
            href="#contact"
            className="rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-white transition hover:border-gold/50 hover:bg-white/10"
          >
            {copy.nav.contactCta}
          </a>
        </div>
      </div>
    </header>
  );
}

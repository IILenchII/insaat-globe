"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/site/LanguageProvider";
import { brandAssets, getSiteCopy } from "@/lib/siteCopy";

export default function Navbar() {
  const { locale, setLocale } = useLanguage();
  const copy = getSiteCopy(locale);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#1d365c]/10 bg-[rgba(255,250,244,0.9)] backdrop-blur-xl">
      <div className="section-container flex h-22 items-center justify-between gap-4">
        <a href="#home" className="flex items-center">
          <div className="relative h-16 w-[176px] sm:h-[4.5rem] sm:w-[210px]">
            <Image
              src={brandAssets.logo}
              alt={copy.nav.brand}
              fill
              sizes="210px"
              className="object-contain object-left"
              priority
            />
          </div>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {copy.nav.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-full border border-[#1d365c]/12 bg-white/72 px-4 py-2 text-sm font-medium text-[#17283b]/82 shadow-[0_10px_22px_rgba(23,40,59,0.05)] transition duration-200 hover:scale-[1.06] hover:border-[#bb8c39]/45 hover:bg-[#fffaf2] hover:text-[#13263f]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex rounded-full border border-white/10 bg-white/80 p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setLocale("tr")}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                locale === "tr"
                  ? "bg-[#f1e4cb] text-[#17283b]"
                  : "text-[#17283b]/70 hover:text-[#17283b]"
              }`}
            >
              TR
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                locale === "en"
                  ? "bg-[#f1e4cb] text-[#17283b]"
                  : "text-[#17283b]/70 hover:text-[#17283b]"
              }`}
            >
              EN
            </button>
          </div>

          <a
            href="#contact"
            className="hidden rounded-full border border-[#f1c450]/70 bg-[#f1c450] px-5 py-2 text-sm font-semibold text-[#112640] shadow-[0_10px_24px_rgba(241,196,80,0.22)] transition hover:bg-[#f6cf6b] md:inline-flex"
          >
            {copy.nav.contactCta}
          </a>

          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1d365c]/12 bg-white/80 text-[#17283b] lg:hidden"
            aria-expanded={isMenuOpen}
            aria-label={locale === "tr" ? "Menüyü aç" : "Open menu"}
          >
            <span className="flex w-5 flex-col gap-1.5">
              <span
                className={`h-0.5 w-full rounded-full bg-current transition ${
                  isMenuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full rounded-full bg-current transition ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full rounded-full bg-current transition ${
                  isMenuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-[#1d365c]/10 bg-[rgba(255,250,244,0.98)] lg:hidden">
          <div className="section-container py-5">
            <nav className="grid gap-2">
              {copy.nav.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-2xl border border-[#1d365c]/10 bg-white/78 px-4 py-3 text-sm font-medium text-[#17283b] transition duration-200 hover:scale-[1.02] hover:border-[#bb8c39]/45 hover:bg-[#fffaf2]"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 inline-flex rounded-full border border-[#f1c450]/70 bg-[#f1c450] px-5 py-3 text-sm font-semibold text-[#112640] transition hover:bg-[#f6cf6b]"
            >
              {copy.nav.contactCta}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

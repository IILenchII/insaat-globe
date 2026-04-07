"use client";

import Image from "next/image";
import { useLanguage } from "@/components/site/LanguageProvider";
import { brandAssets, getSiteCopy } from "@/lib/siteCopy";

export default function Footer() {
  const { locale } = useLanguage();
  const copy = getSiteCopy(locale);

  return (
    <footer className="bg-[#112640] py-10 text-white">
      <div className="section-container">
        <div className="rounded-[32px] border border-white/12 bg-[linear-gradient(180deg,#1a385c,#112640)] p-8 shadow-[0_24px_70px_rgba(3,9,18,0.28)]">
          <div className="grid gap-10 lg:grid-cols-3">
            <div>
              <div className="relative h-14 w-[138px]">
                <Image
                  src={brandAssets.logo}
                  alt="Aydiner Construction"
                  fill
                  sizes="138px"
                  className="object-contain object-left brightness-[1.35]"
                />
              </div>

              <p className="mt-4 text-sm leading-7 text-white/82">
                {copy.footer.text}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">
                {copy.footer.contact}
              </p>

              <div className="mt-4 space-y-3 text-sm text-white/84">
                <p>(0216) 309 16 46</p>
                <p>info@aydinerinsaat.com.tr</p>
                <p>{locale === "tr" ? "Maltepe, İstanbul" : "Maltepe, Istanbul"}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">
                {copy.footer.links}
              </p>

              <div className="mt-4 space-y-3 text-sm text-white/88">
                {getSiteCopy(locale).nav.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block font-medium transition hover:text-gold"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/64">
            {copy.footer.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}

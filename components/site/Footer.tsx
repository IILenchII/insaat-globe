"use client";

import { useLanguage } from "@/components/site/LanguageProvider";
import { getSiteCopy } from "@/lib/siteCopy";

export default function Footer() {
  const { locale } = useLanguage();
  const copy = getSiteCopy(locale);

  return (
    <footer className="py-10">
      <div className="section-container">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
          <div className="grid gap-10 lg:grid-cols-3">
            <div>
              <h2 className="text-2xl font-black">Aydiner Construction</h2>

              <p className="mt-4 text-sm leading-7 text-white/70">
                {copy.footer.text}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gold">
                {copy.footer.contact}
              </p>

              <div className="mt-4 space-y-3 text-sm text-white/70">
                <p>(0216) 309 16 46</p>
                <p>info@aydinerinsaat.com.tr</p>
                <p>{locale === "tr" ? "Maltepe, İstanbul" : "Maltepe, Istanbul"}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gold">{copy.footer.links}</p>

              <div className="mt-4 space-y-3 text-sm text-white/70">
                {getSiteCopy(locale).nav.links.map((link) => (
                  <a key={link.href} href={link.href} className="block hover:text-white">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/50">
            {copy.footer.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}

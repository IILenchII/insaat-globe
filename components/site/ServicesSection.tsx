"use client";

import { useState } from "react";
import { useLanguage } from "@/components/site/LanguageProvider";
import { getSiteCopy } from "@/lib/siteCopy";

export default function ServicesSection() {
  const { locale } = useLanguage();
  const copy = getSiteCopy(locale);
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="services" className="border-b border-white/10 py-20">
      <div className="section-container section-frame">
        <p className="section-eyebrow">
          {copy.services.eyebrow}
        </p>

        <h2 className="section-title mt-4 max-w-3xl text-3xl leading-tight sm:text-4xl">
          {copy.services.title}
        </h2>

        <p className="mt-4 max-w-2xl text-base leading-8 text-[#17283b]/68">
          {locale === "tr"
            ? "Planlama, uygulama ve teslim süreçlerini aynı çizgide tutan, referans projelerle desteklenmiş yapım hizmetleri sunuyoruz."
            : "We deliver construction services backed by reference projects and aligned across planning, execution, and handover."}
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {copy.services.items.map((service, index) => {
            const isOpen = active === index;

            return (
              <div
                key={service.title}
                className={`overflow-hidden rounded-[28px] border transition ${
                  isOpen
                    ? "border-[#d8b25f]/40 bg-[linear-gradient(180deg,#fff8ec_0%,#f6ecdc_100%)] shadow-[0_24px_60px_rgba(23,40,59,0.08)]"
                    : "border-white/10 bg-white/70 hover:border-[#d8b25f]/25"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActive(isOpen ? null : index)}
                  className="w-full p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
                        0{index + 1}
                      </div>
                      <h3 className="mt-3 text-xl font-bold">{service.title}</h3>
                    </div>
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border text-lg transition ${
                        isOpen
                          ? "border-[#d8b25f]/40 bg-[#f1e4cb] text-[#17283b]"
                          : "border-[#17283b]/10 bg-white text-[#17283b]/60"
                      }`}
                    >
                      {isOpen ? "−" : "+"}
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-[#17283b]/68">
                    {service.short}
                  </p>

                  {isOpen && (
                    <p className="mt-5 border-t border-[#17283b]/10 pt-5 text-sm leading-7 text-[#17283b]/76">
                      {service.detail}
                    </p>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

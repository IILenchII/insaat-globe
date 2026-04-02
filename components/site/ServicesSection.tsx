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
      <div className="section-container">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
          {copy.services.eyebrow}
        </p>

        <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
          {copy.services.title}
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {copy.services.items.map((service, index) => {
            const isOpen = active === index;

            return (
              <div
                key={service.title}
                className="rounded-[28px] border border-white/10 bg-white/5 transition hover:border-white/20"
              >
                <button
                  onClick={() => setActive(isOpen ? null : index)}
                  className="w-full p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-xl font-bold">{service.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-white/70">
                    {service.short}
                  </p>

                  {isOpen && (
                    <p className="mt-5 border-t border-white/10 pt-5 text-sm leading-7 text-white/80">
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

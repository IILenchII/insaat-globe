"use client";

import { useLanguage } from "@/components/site/LanguageProvider";
import { getSiteCopy } from "@/lib/siteCopy";

export default function StatsSection() {
  const { locale } = useLanguage();
  const copy = getSiteCopy(locale);

  return (
    <section className="border-b border-white/10 py-12">
      <div className="section-container grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {copy.stats.map((item) => (
          <div
            key={item.label}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center"
          >
            <div className="text-4xl font-black text-gold">{item.value}</div>
            <div className="mt-3 text-sm uppercase tracking-[0.18em] text-white/60">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

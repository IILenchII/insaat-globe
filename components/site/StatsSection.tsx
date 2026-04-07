"use client";

import { useLanguage } from "@/components/site/LanguageProvider";
import { getSiteCopy } from "@/lib/siteCopy";

export default function StatsSection() {
  const { locale } = useLanguage();
  const copy = getSiteCopy(locale);

  return (
    <section className="border-b border-[#1d365c]/10 bg-[#f1c450] py-8">
      <div className="section-container grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {copy.stats.map((item) => (
          <div
            key={item.label}
            className="rounded-[28px] border border-[#17283b]/10 bg-[#f6deb0]/65 p-8 text-center shadow-[0_18px_40px_rgba(23,40,59,0.08)]"
          >
            <div className="text-4xl font-black text-[#17283b]">{item.value}</div>
            <div className="mt-3 text-sm uppercase tracking-[0.18em] text-[#17283b]/64">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

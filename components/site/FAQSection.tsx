"use client";

import { useLanguage } from "@/components/site/LanguageProvider";
import { getSiteCopy } from "@/lib/siteCopy";

export default function FAQSection() {
  const { locale } = useLanguage();
  const copy = getSiteCopy(locale);

  return (
    <section className="border-b border-white/10 py-20">
      <div className="section-container section-frame">
        <p className="section-eyebrow">
          {copy.faq.eyebrow}
        </p>

        <h2 className="section-title mt-4 max-w-3xl text-3xl leading-tight sm:text-4xl">
          {copy.faq.title}
        </h2>

        <p className="mt-4 max-w-2xl text-base leading-8 text-[#17283b]/68">
          {locale === "tr"
            ? "İlk görüşmede en çok sorulan başlıkları tek yerde topladık. Gerekirse proje özelinde daha detaylı teknik bilgi de paylaşabiliriz."
            : "We gathered the most common first-meeting questions in one place. We can also share more detailed technical information for a specific project."}
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {copy.faq.items.map((faq, index) => (
            <div
              key={faq.title}
              className="rounded-[28px] border border-white/10 bg-white/72 p-6 shadow-[0_18px_40px_rgba(23,40,59,0.06)]"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="text-sm font-bold text-gold">0{index + 1}</div>
                <div className="h-px flex-1 bg-[#17283b]/10" />
              </div>
              <h3 className="mt-3 text-lg font-bold">{faq.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#17283b]/68">
                {faq.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

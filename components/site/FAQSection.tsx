"use client";

import { useLanguage } from "@/components/site/LanguageProvider";
import { getSiteCopy } from "@/lib/siteCopy";

export default function FAQSection() {
  const { locale } = useLanguage();
  const copy = getSiteCopy(locale);

  return (
    <section className="border-b border-white/10 py-20">
      <div className="section-container">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
          {copy.faq.eyebrow}
        </p>

        <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
          {copy.faq.title}
        </h2>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {copy.faq.items.map((faq, index) => (
            <div
              key={faq.title}
              className="rounded-[28px] border border-white/10 bg-white/5 p-6"
            >
              <div className="text-sm font-bold text-gold">0{index + 1}</div>
              <h3 className="mt-3 text-lg font-bold">{faq.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/70">
                {faq.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

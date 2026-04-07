"use client";

import { useLanguage } from "@/components/site/LanguageProvider";
import { getSiteCopy } from "@/lib/siteCopy";

export default function ProcessSection() {
  const { locale } = useLanguage();
  const copy = getSiteCopy(locale);

  return (
    <section id="process" className="border-b border-white/10 py-20">
      <div className="section-container section-frame">
        <div className="text-center">
          <p className="section-eyebrow">
            {copy.process.eyebrow}
          </p>

          <h2 className="section-title mt-4 text-3xl sm:text-4xl">
            {copy.process.title}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#17283b]/68">
            {locale === "tr"
              ? "İlk planlamadan teslim sonrasına kadar her adımı kontrollü, şeffaf ve sahaya uyumlu biçimde yürütüyoruz."
              : "From first planning to final delivery, we run each phase in a controlled, transparent, and site-responsive way."}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {copy.process.steps.map((step, index) => (
            <div
              key={step.title}
              className="relative rounded-[28px] border border-white/10 bg-white/72 p-6 shadow-[0_18px_40px_rgba(23,40,59,0.06)]"
            >
              <div className="text-sm font-bold text-gold">
                0{index + 1}
              </div>

              <h3 className="mt-3 text-lg font-bold">
                {step.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#17283b]/68">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

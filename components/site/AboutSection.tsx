"use client";

import Image from "next/image";
import { useLanguage } from "@/components/site/LanguageProvider";
import { brandAssets, getSiteCopy } from "@/lib/siteCopy";

export default function AboutSection() {
  const { locale } = useLanguage();
  const copy = getSiteCopy(locale);

  return (
    <section id="about" className="border-b border-white/10 py-20">
      <div className="section-container section-frame grid gap-12 lg:grid-cols-[1fr_1fr]">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#112640] p-8">
          <div className="absolute inset-0">
            <Image
              src={brandAssets.aboutFeature}
              alt={copy.about.panelTitle}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,38,64,0.2),rgba(17,38,64,0.86))]" />
          </div>
          <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
          <div className="relative grid h-full gap-4 pt-8">
            <div className="rounded-[28px] border border-white/10 bg-[rgba(255,255,255,0.1)] p-6 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.24em] text-white/50">
                {copy.about.panelTitle}
              </p>
              <p className="mt-4 text-xl font-semibold text-white">
                {copy.about.panelText}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] border border-white/10 bg-[rgba(255,255,255,0.08)] p-6 backdrop-blur-sm">
                <p className="text-3xl font-black text-gold">25+</p>
                <p className="mt-2 text-sm leading-7 text-white/68">
                  {copy.about.leftStats[0]}
                </p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-[rgba(255,255,255,0.08)] p-6 backdrop-blur-sm">
                <p className="text-3xl font-black text-gold">
                  {locale === "tr" ? "3 Bölge" : "3 Regions"}
                </p>
                <p className="mt-2 text-sm leading-7 text-white/68">
                  {copy.about.leftStats[1]}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="section-eyebrow">
            {copy.about.eyebrow}
          </p>

          <h2 className="section-title mt-4 text-3xl leading-tight sm:text-4xl">
            {copy.about.title}
          </h2>

          <p className="mt-6 text-base leading-8 text-[#17283b]/72">
            {copy.about.text1}
          </p>

          <p className="mt-4 text-base leading-8 text-[#17283b]/72">
            {copy.about.text2}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[28px] border border-white/10 bg-white/70 p-6 shadow-[0_18px_40px_rgba(23,40,59,0.08)]">
              <p className="text-sm font-semibold text-[#17283b]">
                {copy.about.clarityTitle}
              </p>
              <p className="mt-3 text-sm leading-7 text-[#17283b]/68">
                {copy.about.clarityText}
              </p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-white/70 p-6 shadow-[0_18px_40px_rgba(23,40,59,0.08)]">
              <p className="text-sm font-semibold text-[#17283b]">
                {copy.about.disciplineTitle}
              </p>
              <p className="mt-3 text-sm leading-7 text-[#17283b]/68">
                {copy.about.disciplineText}
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <a
              href="#projects"
              className="rounded-full bg-white px-6 py-3 font-semibold text-ink transition hover:-translate-y-0.5"
            >
              {copy.about.references}
            </a>

            <a
              href="#services"
              className="rounded-full border border-white/15 bg-white px-6 py-3 font-semibold text-[#17283b] transition hover:bg-[#fffaf2]"
            >
              {copy.about.services}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

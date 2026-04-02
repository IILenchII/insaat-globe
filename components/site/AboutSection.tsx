"use client";

import { useLanguage } from "@/components/site/LanguageProvider";
import { getSiteCopy } from "@/lib/siteCopy";

export default function AboutSection() {
  const { locale } = useLanguage();
  const copy = getSiteCopy(locale);

  return (
    <section id="about" className="border-b border-white/10 py-20">
      <div className="section-container grid gap-12 lg:grid-cols-[1fr_1fr]">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(160deg,#0a1422_0%,#102238_55%,#18314b_100%)] p-8">
          <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
          <div className="grid h-full gap-4 pt-8">
            <div className="rounded-[28px] border border-white/10 bg-white/6 p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                {copy.about.panelTitle}
              </p>
              <p className="mt-4 text-xl font-semibold text-white">
                {copy.about.panelText}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
                <p className="text-3xl font-black text-gold">25+</p>
                <p className="mt-2 text-sm leading-7 text-white/68">
                  {copy.about.leftStats[0]}
                </p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
                <p className="text-3xl font-black text-gold">3 Regions</p>
                <p className="mt-2 text-sm leading-7 text-white/68">
                  {copy.about.leftStats[1]}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            {copy.about.eyebrow}
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
            {copy.about.title}
          </h2>

          <p className="mt-6 text-base leading-8 text-white/70">
            {copy.about.text1}
          </p>

          <p className="mt-4 text-base leading-8 text-white/70">
            {copy.about.text2}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold text-white">
                {copy.about.clarityTitle}
              </p>
              <p className="mt-3 text-sm leading-7 text-white/68">
                {copy.about.clarityText}
              </p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold text-white">
                {copy.about.disciplineTitle}
              </p>
              <p className="mt-3 text-sm leading-7 text-white/68">
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
              className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              {copy.about.services}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

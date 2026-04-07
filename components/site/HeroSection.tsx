"use client";

import Globe from "@/components/Globe";
import { useLanguage } from "@/components/site/LanguageProvider";
import { getSiteCopy } from "@/lib/siteCopy";

export default function HeroSection() {
  const { locale } = useLanguage();
  const copy = getSiteCopy(locale);

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-white/10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(187,140,57,0.20),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(78,123,159,0.18),transparent_30%),linear-gradient(180deg,#fffaf2_0%,#f5eee4_45%,#efe6da_100%)]" />
      <div className="section-container grid min-h-[calc(100vh-80px)] items-center gap-10 py-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative z-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
            {copy.hero.eyebrow}
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            {copy.hero.title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#17283b]/72 sm:text-lg">
            {copy.hero.text}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-full bg-[#17283b] px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5"
            >
              {copy.hero.explore}
            </a>

            <a
              href="#contact"
              className="rounded-full border border-white/15 bg-white/70 px-6 py-3 font-semibold text-[#17283b] transition hover:bg-white"
            >
              {copy.hero.talk}
            </a>
          </div>

          <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
            {copy.hero.cards.map((card) => (
              <div
                key={card.title}
                className="rounded-3xl border border-white/10 bg-white/70 p-5 shadow-[0_18px_40px_rgba(23,40,59,0.08)]"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-[#17283b]/52">
                  {card.title}
                </p>
                <p className="mt-3 text-sm font-semibold text-[#17283b]">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-[460px] overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(255,255,255,0.82)] shadow-[0_30px_120px_rgba(23,40,59,0.15)] lg:h-[650px]">
          <Globe />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#fff8ef]/10 via-transparent to-[#f0e5d5]/30" />
          <div className="pointer-events-none absolute left-6 top-6 rounded-full border border-white/10 bg-white/85 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#17283b]/70">
            {copy.hero.liveMap}
          </div>
        </div>
      </div>
    </section>
  );
}

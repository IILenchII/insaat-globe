"use client";

import Image from "next/image";
import { useLanguage } from "@/components/site/LanguageProvider";
import { brandAssets, getSiteCopy } from "@/lib/siteCopy";

export default function HeroSection() {
  const { locale } = useLanguage();
  const copy = getSiteCopy(locale);

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-[#1d365c]/10 bg-[#112640] text-white"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${brandAssets.heroPrimary})` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,38,64,0.6)_0%,rgba(17,38,64,0.86)_56%,#112640_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(241,196,80,0.18),transparent_26%)]" />

      <div className="section-container relative min-h-[calc(100vh-80px)] py-18">
        <div className="grid min-h-[calc(100vh-140px)] items-end gap-12 pb-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative z-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#f1c450]">
              {copy.hero.eyebrow}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-5">
              <h1 className="text-4xl font-black leading-tight text-[#f5d07b] [text-shadow:0_6px_24px_rgba(3,9,18,0.42)] sm:text-5xl lg:text-[4.1rem]">
                {locale === "tr" ? "Geleceği İnşa Ediyor," : "Building the Future,"}
              </h1>
              <span className="hidden h-px w-20 bg-[#f1c450] lg:block" />
            </div>

            <h2 className="mt-2 text-4xl font-black leading-tight text-[#f8f4ed] [text-shadow:0_8px_28px_rgba(3,9,18,0.46)] sm:text-5xl lg:text-[4.1rem]">
              {copy.hero.title}
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/74 sm:text-lg">
              {copy.hero.text}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="rounded-none border border-[#f1c450] bg-[#f1c450] px-7 py-4 text-sm font-bold uppercase tracking-[0.14em] text-[#112640] shadow-[0_16px_36px_rgba(241,196,80,0.24)] transition hover:-translate-y-0.5 hover:bg-[#f6cf6b]"
              >
                {copy.hero.explore}
              </a>

              <a
                href="#contact"
                className="rounded-none border border-[#f3d48b]/52 bg-[rgba(248,244,237,0.96)] px-7 py-4 text-sm font-bold uppercase tracking-[0.14em] text-[#112640] shadow-[0_18px_38px_rgba(3,9,18,0.22)] transition hover:-translate-y-0.5 hover:bg-white"
              >
                {copy.hero.talk}
              </a>
            </div>
          </div>

          <div className="relative z-10">
            <div className="overflow-hidden rounded-[32px] border border-white/12 bg-[rgba(255,255,255,0.08)] p-5 shadow-[0_30px_80px_rgba(3,9,18,0.35)] backdrop-blur-sm">
              <div className="relative h-[320px] overflow-hidden rounded-[28px]">
                <Image
                  src={brandAssets.heroSecondary}
                  alt={copy.hero.liveMap}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,38,64,0.05),rgba(17,38,64,0.78))]" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="inline-flex rounded-full border border-white/14 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/74">
                    {copy.hero.liveMap}
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {copy.hero.cards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.08)] p-5"
                  >
                    <p className="text-[11px] uppercase tracking-[0.26em] text-white/48">
                      {card.title}
                    </p>
                    <p className="mt-3 text-sm font-semibold leading-6 text-white/88">
                      {card.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import RegionalMap from "@/components/RegionalMap";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/site/LanguageProvider";
import { getProjectContent, projects } from "@/lib/projects";
import { getSiteCopy } from "@/lib/siteCopy";

export default function FeaturedProjectsSection() {
  const { locale } = useLanguage();
  const copy = getSiteCopy(locale);

  return (
    <section id="projects" className="border-b border-white/10 py-20">
      <div className="section-container section-frame">
        <div className="text-center">
          <p className="section-eyebrow">
            {copy.projects.eyebrow}
          </p>

          <h2 className="section-title mt-4 text-3xl sm:text-4xl">
            {copy.projects.title}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#17283b]/68">
            {locale === "tr"
              ? "Türkiye, Orta Doğu ve çevre bölgelerde tamamlanan ya da devam eden referans işleri aynı bakışta inceleyin."
              : "Review reference works completed or ongoing across Turkey, the Middle East, and nearby regions in a single view."}
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-[32px] border border-white/10 bg-[rgba(255,255,255,0.86)] shadow-[0_30px_90px_rgba(23,40,59,0.12)]">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#17283b]/48">
                {copy.projects.eyebrow}
              </p>
              <p className="mt-1 text-sm text-[#17283b]/68">{copy.projects.mapHint}</p>
            </div>
            <div className="rounded-full border border-[#17283b]/10 bg-[#fff6e7] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#17283b]/70">
              {projects.length} {locale === "tr" ? "proje" : "projects"}
            </div>
          </div>
          <div className="h-[560px] w-full">
            <RegionalMap />
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const content = getProjectContent(project, locale);

            return (
              <Link
                href={`/projects/${project.slug}`}
                key={project.slug}
                className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white/72 transition hover:-translate-y-1 hover:border-[#d8b25f]/40 hover:shadow-[0_24px_60px_rgba(23,40,59,0.08)]"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={content.primaryImage}
                    alt={content.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,40,59,0.08),rgba(23,40,59,0.72))]" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end p-6">
                    <div className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/80">
                      {content.category}
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm text-gold">
                      {content.city}, {content.country}
                    </p>
                    <span className="text-xs uppercase tracking-[0.18em] text-[#17283b]/42">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="mt-2 min-h-[56px] text-lg font-bold">{content.name}</h3>
                  <p className="mt-3 min-h-[112px] text-sm leading-7 text-[#17283b]/68">
                    {content.summary}
                  </p>

                  <div className="mt-auto grid gap-2 rounded-[20px] border border-white/10 bg-[rgba(255,250,242,0.82)] p-4 text-sm text-[#17283b]/72">
                    {content.metrics.slice(0, 2).map((metric) => (
                      <div
                        key={`${project.slug}-${metric.label}`}
                        className="flex items-center justify-between gap-4"
                      >
                        <span>{metric.label}</span>
                        <span className="font-semibold text-[#17283b]">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between text-sm text-[#17283b]/55">
                    <span>{content.status}</span>
                    <span className="font-medium text-[#17283b]">
                      {locale === "tr" ? "Detayları Gör" : "View Details"}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

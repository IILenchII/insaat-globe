"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/site/LanguageProvider";
import { getSiteCopy } from "@/lib/siteCopy";
import { getProjectContent, type Project } from "@/lib/projects";

export default function ProjectDetailClient({
  project,
}: {
  project: Project;
}) {
  const { locale } = useLanguage();
  const copy = getSiteCopy(locale);
  const content = getProjectContent(project, locale);
  const galleryImages = content.images.slice(1, 5);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fffaf2_0%,#f3ede2_100%)] px-6 py-20 text-[#17283b]">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-flex rounded-full border border-white/12 bg-white/80 px-4 py-2 text-sm text-[#17283b]/72 transition hover:bg-white"
        >
          {copy.projectDetail.back}
        </Link>

        <p className="mt-10 text-sm uppercase tracking-[0.25em] text-gold">
          {content.city}, {content.country}
        </p>

        <h1 className="mt-4 text-4xl font-black sm:text-5xl">{content.name}</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[#17283b]/72">
          {content.summary}
        </p>

        <div className="mt-10 overflow-hidden rounded-[36px] border border-white/10 bg-white/72 shadow-[0_24px_60px_rgba(23,40,59,0.08)]">
          <div className="grid gap-4 p-4 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="relative h-[360px] overflow-hidden rounded-[28px] sm:h-[440px]">
              <Image
                src={content.primaryImage}
                alt={content.name}
                fill
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-cover"
              />
            </div>

            <div className="grid gap-4">
              {galleryImages.length > 0 ? (
                galleryImages.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="relative h-[102px] overflow-hidden rounded-[24px] sm:h-[108px]"
                  >
                    <Image
                      src={image}
                      alt={`${content.name} ${index + 2}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 30vw"
                      className="object-cover"
                    />
                  </div>
                ))
              ) : (
                <div className="flex h-full min-h-[220px] items-center justify-center rounded-[28px] border border-white/10 bg-[rgba(255,250,242,0.92)] px-6 text-center text-sm leading-7 text-[#17283b]/62">
                  {copy.projectDetail.overviewText}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/72 p-5 shadow-[0_16px_40px_rgba(23,40,59,0.08)]">
            <p className="text-sm text-[#17283b]/50">{copy.projectDetail.status}</p>
            <p className="mt-2 text-lg font-semibold">{content.status}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/72 p-5 shadow-[0_16px_40px_rgba(23,40,59,0.08)]">
            <p className="text-sm text-[#17283b]/50">
              {copy.projectDetail.latitude}
            </p>
            <p className="mt-2 text-lg font-semibold">{project.lat}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/72 p-5 shadow-[0_16px_40px_rgba(23,40,59,0.08)]">
            <p className="text-sm text-[#17283b]/50">
              {copy.projectDetail.longitude}
            </p>
            <p className="mt-2 text-lg font-semibold">{project.lon}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/72 p-5 shadow-[0_16px_40px_rgba(23,40,59,0.08)]">
            <p className="text-sm text-[#17283b]/50">{copy.projectDetail.category}</p>
            <p className="mt-2 text-lg font-semibold">{content.category}</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[32px] border border-white/10 bg-white/72 p-8 shadow-[0_24px_60px_rgba(23,40,59,0.08)]">
            <h2 className="text-2xl font-bold">{copy.projectDetail.overview}</h2>
            <p className="mt-4 max-w-3xl leading-8 text-[#17283b]/70">
              {copy.projectDetail.overviewText}
            </p>

            <div className="mt-8">
              <h3 className="text-lg font-semibold">{copy.projectDetail.scope}</h3>
              <div className="mt-4 grid gap-3">
                {content.scope.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-[rgba(255,250,242,0.92)] px-4 py-3 text-sm text-[#17283b]/76"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(160deg,#fff5e5,#f4e6cf_55%,#ead7b8)] p-8 shadow-[0_24px_60px_rgba(23,40,59,0.08)]">
            <h2 className="text-2xl font-bold">{copy.projectDetail.metrics}</h2>
            <div className="mt-6 grid gap-4">
              {content.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[24px] border border-white/10 bg-white/70 p-5"
                >
                  <p className="text-sm text-[#17283b]/50">{metric.label}</p>
                  <p className="mt-2 text-2xl font-black text-gold">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[24px] border border-white/10 bg-white/76 p-5 text-sm leading-7 text-[#17283b]/68">
              {copy.projectDetail.yearText} {project.year}.{" "}
              {copy.projectDetail.yearTail}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

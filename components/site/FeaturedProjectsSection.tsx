"use client";

import Link from "next/link";
import { useLanguage } from "@/components/site/LanguageProvider";
import { getProjectContent, projects } from "@/lib/projects";
import { getSiteCopy } from "@/lib/siteCopy";

export default function FeaturedProjectsSection() {
  const { locale } = useLanguage();
  const copy = getSiteCopy(locale);

  return (
    <section id="projects" className="border-b border-white/10 py-20">
      <div className="section-container">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            {copy.projects.eyebrow}
          </p>

          <h2 className="mt-4 text-3xl font-black sm:text-4xl">
            {copy.projects.title}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const content = getProjectContent(project, locale);

            return (
              <Link
                href={`/projects/${project.slug}`}
                key={project.slug}
                className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#d8b25f]/40"
              >
                <div className="flex h-56 items-end bg-[linear-gradient(145deg,#0d1424,#162236_50%,#22466f)] p-6">
                  <div className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/70">
                    {content.category}
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm text-gold">
                    {content.city}, {content.country}
                  </p>

                  <h3 className="mt-2 text-lg font-bold">{content.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/68">
                    {content.summary}
                  </p>
                  <div className="mt-5 flex items-center justify-between text-sm text-white/55">
                    <span>{content.status}</span>
                    <span>{project.year}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <p className="text-sm text-white/60">{copy.projects.mapHint}</p>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { projects } from "@/lib/projects";

export default function FeaturedProjectsSection() {
  return (
    <section id="projects" className="border-b border-white/10 py-20">
      <div className="section-container">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Projects
          </p>

          <h2 className="mt-4 text-3xl font-black sm:text-4xl">
            Selected references with clear scope, location, and delivery intent.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              href={`/projects/${project.slug}`}
              key={project.slug}
              className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#d8b25f]/40"
            >
              <div className="flex h-56 items-end bg-[linear-gradient(145deg,#0d1424,#162236_50%,#22466f)] p-6">
                <div className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/70">
                  {project.category}
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm text-gold">
                  {project.city}, {project.country}
                </p>

                <h3 className="mt-2 text-lg font-bold">{project.name}</h3>
                <p className="mt-3 text-sm leading-7 text-white/68">
                  {project.summary}
                </p>
                <div className="mt-5 flex items-center justify-between text-sm text-white/55">
                  <span>{project.status}</span>
                  <span>{project.year}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="text-sm text-white/60">
            You can also explore these locations through the interactive globe in the hero section.
          </p>
        </div>
      </div>
    </section>
  );
}

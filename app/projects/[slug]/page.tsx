import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/projects";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-ink px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-flex rounded-full border border-white/12 px-4 py-2 text-sm text-white/72 transition hover:bg-white/8"
        >
          Back to Home
        </Link>

        <p className="mt-10 text-sm uppercase tracking-[0.25em] text-gold">
          {project.city}, {project.country}
        </p>

        <h1 className="mt-4 text-4xl font-black sm:text-5xl">
          {project.name}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-white/72">
          {project.summary}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-white/50">Status</p>
            <p className="mt-2 text-lg font-semibold">{project.status}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-white/50">Latitude</p>
            <p className="mt-2 text-lg font-semibold">{project.lat}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-white/50">Longitude</p>
            <p className="mt-2 text-lg font-semibold">{project.lon}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-white/50">Category</p>
            <p className="mt-2 text-lg font-semibold">{project.category}</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-bold">Project Overview</h2>
            <p className="mt-4 max-w-3xl leading-8 text-white/70">
              This reference reflects our emphasis on practical delivery logic,
              technical coordination, and consistent quality tracking across
              planning, execution, and closeout stages.
            </p>

            <div className="mt-8">
              <h3 className="text-lg font-semibold">Scope Highlights</h3>
              <div className="mt-4 grid gap-3">
                {project.scope.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/75"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(160deg,#0b1524,#102238_55%,#18314b)] p-8">
            <h2 className="text-2xl font-bold">Project Metrics</h2>
            <div className="mt-6 grid gap-4">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[24px] border border-white/10 bg-black/20 p-5"
                >
                  <p className="text-sm text-white/50">{metric.label}</p>
                  <p className="mt-2 text-2xl font-black text-gold">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[24px] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/68">
              Delivery year reference: {project.year}. Additional visual
              galleries, client-sensitive milestone details, and material specs
              can be layered into this template as the portfolio expands.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

import path from "path";
import { promises as fs } from "fs";

type Project = {
  slug: string;
  name: string;
  country: string;
  city: string;
  lat: number;
  lon: number;
  status: string;
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const filePath = path.join(process.cwd(), "public", "projects.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const projects: Project[] = JSON.parse(fileContents);

  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <main className="min-h-screen bg-[#05070f] px-6 py-20 text-white">
        <h1 className="text-3xl font-black">Project not found</h1>
        <p className="mt-4 text-white/70">Slug: {slug}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#05070f] px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.25em] text-[#d8b25f]">
          {project.city}, {project.country}
        </p>

        <h1 className="mt-4 text-4xl font-black sm:text-5xl">
          {project.name}
        </h1>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
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
        </div>

        <div className="mt-10 rounded-[32px] border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-bold">Project Overview</h2>
          <p className="mt-4 max-w-3xl leading-8 text-white/70">
            This page is the project detail shell. We can now expand it with
            gallery, metrics, scope of work, client information and timeline
            sections instead of leaving it as a sad empty slug page.
          </p>
        </div>
      </div>
    </main>
  );
}
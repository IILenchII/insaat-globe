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

export default async function ProjectPage({ params }: { params: any }) {
  // Next bazen params'ı Promise gibi verebiliyor. await her iki durumda da çalışır.
  const resolvedParams = await params;
  const slug: string | undefined = resolvedParams?.slug;

  // projects.json'u server tarafında direkt dosyadan oku
  const filePath = path.join(process.cwd(), "public", "projects.json");
  const raw = await fs.readFile(filePath, "utf8");
  const projects: Project[] = JSON.parse(raw);

  const project = projects.find((p) => p.slug === slug);

  if (!slug) {
    return (
      <main style={{ padding: 24, color: "white" }}>
        <h1 style={{ fontSize: 32, fontWeight: 800 }}>Project</h1>
        <p style={{ opacity: 0.8, marginTop: 12 }}>
          Slug gelmedi. Klasör yolu yanlış olabilir: <code>app/projects/[slug]/page.tsx</code>
        </p>
      </main>
    );
  }

  if (!project) {
    return (
      <main style={{ padding: 24, color: "white" }}>
        <h1 style={{ fontSize: 32, fontWeight: 800 }}>Project not found</h1>
        <p style={{ opacity: 0.8, marginTop: 12 }}>
          Slug: <b>{slug}</b>
        </p>
        <p style={{ opacity: 0.7, marginTop: 8 }}>
          projects.json içinde bu slug yok.
        </p>
      </main>
    );
  }

  return (
    <main style={{ padding: 24, color: "white" }}>
      <div style={{ opacity: 0.8, fontSize: 14 }}>
        {project.city}, {project.country}
      </div>

      <h1 style={{ fontSize: 36, fontWeight: 900, marginTop: 6 }}>
        {project.name}
      </h1>

      <div style={{ marginTop: 16, lineHeight: 1.9, opacity: 0.9 }}>
        <div>
          <b>Status:</b> {project.status}
        </div>
        <div>
          <b>Slug:</b> {project.slug}
        </div>
        <div>
          <b>Coordinates:</b> {project.lat}, {project.lon}
        </div>
      </div>
    </main>
  );
}
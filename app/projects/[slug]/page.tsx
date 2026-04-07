import { notFound } from "next/navigation";
import ProjectDetailClient from "@/components/site/ProjectDetailClient";
import { readStoredProjectBySlug } from "@/lib/projectStore";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await readStoredProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}

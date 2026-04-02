import { notFound } from "next/navigation";
import ProjectDetailClient from "@/components/site/ProjectDetailClient";
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

  return <ProjectDetailClient project={project} />;
}

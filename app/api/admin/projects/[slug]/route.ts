import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { readStoredProjects, writeStoredProjects } from "@/lib/projectStore";
import type { Project } from "@/lib/projects";

function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return unauthorizedResponse();
  }

  const { slug } = await context.params;
  const payload = (await request.json()) as { project?: Project };
  const nextProject = payload.project;

  if (!nextProject) {
    return NextResponse.json({ error: "Project payload is required." }, { status: 400 });
  }

  const currentProjects = await readStoredProjects();
  const projectExists = currentProjects.some((project) => project.slug === slug);

  if (!projectExists) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }

  const projects = await writeStoredProjects(
    currentProjects.map((project) => (project.slug === slug ? nextProject : project))
  );

  return NextResponse.json({ projects, project: nextProject });
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return unauthorizedResponse();
  }

  const { slug } = await context.params;
  const currentProjects = await readStoredProjects();
  const nextProjects = currentProjects.filter((project) => project.slug !== slug);

  if (nextProjects.length === currentProjects.length) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }

  const projects = await writeStoredProjects(nextProjects);
  return NextResponse.json({ projects });
}

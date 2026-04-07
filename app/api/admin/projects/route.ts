import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { readStoredProjects, writeStoredProjects } from "@/lib/projectStore";
import type { Project } from "@/lib/projects";

function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return unauthorizedResponse();
  }

  const projects = await readStoredProjects();
  return NextResponse.json({ projects });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return unauthorizedResponse();
  }

  const payload = (await request.json()) as { project?: Project };
  const nextProject = payload.project;

  if (!nextProject) {
    return NextResponse.json({ error: "Project payload is required." }, { status: 400 });
  }

  const currentProjects = await readStoredProjects();

  if (currentProjects.some((project) => project.slug === nextProject.slug)) {
    return NextResponse.json({ error: "Slug already exists." }, { status: 409 });
  }

  const projects = await writeStoredProjects([...currentProjects, nextProject]);
  return NextResponse.json({ projects, project: nextProject }, { status: 201 });
}

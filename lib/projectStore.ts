import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { projects as seedProjects, type Project } from "@/lib/projects";

const DATA_DIRECTORY = path.join(process.cwd(), "data");
const PROJECTS_FILE = path.join(DATA_DIRECTORY, "projects.json");

function sortProjects(projects: Project[]) {
  return [...projects].sort((left, right) => right.year.localeCompare(left.year));
}

export async function readStoredProjects(): Promise<Project[]> {
  try {
    const file = await readFile(PROJECTS_FILE, "utf8");
    const parsed = JSON.parse(file) as Project[];

    if (Array.isArray(parsed) && parsed.length > 0) {
      return sortProjects(parsed);
    }
  } catch {
    return sortProjects(seedProjects);
  }

  return sortProjects(seedProjects);
}

export async function writeStoredProjects(projects: Project[]) {
  await mkdir(DATA_DIRECTORY, { recursive: true });
  const sortedProjects = sortProjects(projects);
  await writeFile(PROJECTS_FILE, `${JSON.stringify(sortedProjects, null, 2)}\n`, "utf8");
  return sortedProjects;
}

export async function readStoredProjectBySlug(slug: string) {
  const items = await readStoredProjects();
  return items.find((project) => project.slug === slug);
}

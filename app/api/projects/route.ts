import { NextResponse } from "next/server";
import { readStoredProjects } from "@/lib/projectStore";

export async function GET() {
  const projects = await readStoredProjects();
  return NextResponse.json({ projects });
}

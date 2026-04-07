"use client";

import { useEffect, useState } from "react";
import { projects as fallbackProjects, type Project } from "@/lib/projects";

export function useProjectsData() {
  const [items, setItems] = useState<Project[]>(fallbackProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      try {
        const response = await fetch("/api/projects", { cache: "no-store" });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { projects?: Project[] };

        if (isMounted && Array.isArray(data.projects) && data.projects.length > 0) {
          setItems(data.projects);
        }
      } catch {
        // Fallback to static project data if the runtime API is unavailable.
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  return { projects: items, loading };
}

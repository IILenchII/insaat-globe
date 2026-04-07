"use client";

import L from "leaflet";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { MapContainer, Marker, TileLayer, Tooltip, useMap } from "react-leaflet";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/site/LanguageProvider";
import { getProjectContent } from "@/lib/projects";
import { useProjectsData } from "@/lib/useProjectsData";

function createProjectIcon(isHovered: boolean) {
  return L.divIcon({
    className: "project-marker-icon",
    html: `
      <div class="project-marker${isHovered ? " is-hovered" : ""}">
        <span class="project-marker__dot"></span>
        <span class="project-marker__line"></span>
      </div>
    `,
    iconSize: [14, 40],
    iconAnchor: [7, 40],
    tooltipAnchor: [0, -34],
  });
}

function FitMapToProjects({
  positions,
}: {
  positions: Array<[number, number]>;
}) {
  const map = useMap();

  useEffect(() => {
    if (positions.length === 0) {
      return;
    }

    const bounds = L.latLngBounds(positions);
    map.fitBounds(bounds.pad(0.24), {
      padding: [36, 36],
      maxZoom: 5,
    });
  }, [map, positions]);

  return null;
}

export default function RegionalMapInner() {
  const router = useRouter();
  const { locale } = useLanguage();
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const { projects } = useProjectsData();

  const projectItems = useMemo(
    () =>
      projects.map((project) => ({
        project,
        content: getProjectContent(project, locale),
      })),
    [locale, projects]
  );

  const positionedItems = useMemo(() => {
    const grouped = new Map<string, typeof projectItems>();

    for (const item of projectItems) {
      const key = `${item.project.lat.toFixed(4)}:${item.project.lon.toFixed(4)}`;
      const bucket = grouped.get(key) ?? [];
      bucket.push(item);
      grouped.set(key, bucket);
    }

    return projectItems.map((item) => {
      const key = `${item.project.lat.toFixed(4)}:${item.project.lon.toFixed(4)}`;
      const siblings = grouped.get(key) ?? [item];
      const index = siblings.findIndex(
        (candidate) => candidate.project.slug === item.project.slug
      );

      if (siblings.length === 1) {
        return {
          ...item,
          markerPosition: [item.project.lat, item.project.lon] as [number, number],
        };
      }

      const angle = (Math.PI * 2 * index) / siblings.length;
      const baseLat = item.project.lat;
      const radius = 0.008;
      const latOffset = Math.cos(angle) * radius;
      const lonOffset =
        (Math.sin(angle) * radius) /
        Math.max(Math.cos((baseLat * Math.PI) / 180), 0.35);

      return {
        ...item,
        markerPosition: [baseLat + latOffset, item.project.lon + lonOffset] as [
          number,
          number,
        ],
      };
    });
  }, [projectItems]);

  const markerPositions = useMemo(
    () =>
      projectItems.map(
        (item) => [item.project.lat, item.project.lon] as [number, number]
      ),
    [projectItems]
  );

  return (
    <div className="relative h-full w-full overflow-hidden">
      <MapContainer
        center={[41.03, 29.17]}
        zoom={4}
        minZoom={3}
        maxZoom={9}
        zoomSnap={0.5}
        scrollWheelZoom
        dragging
        doubleClickZoom
        touchZoom
        boxZoom={false}
        zoomControl
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        <FitMapToProjects positions={markerPositions} />

        {positionedItems.map(({ project, content, markerPosition }) => (
          <Marker
            key={project.slug}
            position={markerPosition}
            icon={createProjectIcon(hoveredSlug === project.slug)}
            eventHandlers={{
              mouseover: () => setHoveredSlug(project.slug),
              mouseout: () =>
                setHoveredSlug((current) =>
                  current === project.slug ? null : current
                ),
              click: () => router.push(`/projects/${project.slug}`),
            }}
          >
            <Tooltip direction="top" offset={[0, -34]} opacity={1} permanent={false}>
              <div className="min-w-[220px]">
                <div className="relative h-28 w-full overflow-hidden rounded-xl">
                  <Image
                    src={content.primaryImage}
                    alt={content.name}
                    fill
                    sizes="220px"
                    className="object-cover"
                  />
                </div>
                <div className="text-xs text-[#17283b]/58">
                  {content.city}, {content.country}
                </div>
                <div className="mt-1 text-sm font-semibold text-[#17283b]">
                  {content.name}
                </div>
                <div className="mt-1 text-xs text-[#17283b]/62">
                  {content.category}
                </div>
              </div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

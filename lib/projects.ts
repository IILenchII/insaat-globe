export type Project = {
  slug: string;
  name: string;
  country: string;
  city: string;
  lat: number;
  lon: number;
  status: string;
  category: string;
  year: string;
  summary: string;
  scope: string[];
  metrics: {
    label: string;
    value: string;
  }[];
};

export const projects: Project[] = [
  {
    slug: "istanbul-residences",
    name: "Istanbul Residences",
    country: "Turkiye",
    city: "Istanbul",
    lat: 41.0082,
    lon: 28.9784,
    status: "Ongoing",
    category: "Residential Development",
    year: "2026",
    summary:
      "A premium urban residential development focused on structural quality, efficient circulation, and contemporary living standards.",
    scope: [
      "Structural and reinforced concrete works",
      "Facade coordination and envelope detailing",
      "MEP coordination with field supervision",
      "Interior fit-out planning for common areas",
    ],
    metrics: [
      { label: "Blocks", value: "4" },
      { label: "Units", value: "186" },
      { label: "Site Area", value: "21,500 m2" },
    ],
  },
  {
    slug: "doha-school",
    name: "Doha School Project",
    country: "Qatar",
    city: "Doha",
    lat: 25.2854,
    lon: 51.531,
    status: "Completed",
    category: "Education Campus",
    year: "2024",
    summary:
      "A modern education facility delivered with disciplined sequencing, robust structural planning, and durable high-traffic interior solutions.",
    scope: [
      "Main contractor coordination",
      "Classroom and administrative block delivery",
      "Site logistics and phased execution planning",
      "Quality assurance and final handover support",
    ],
    metrics: [
      { label: "Capacity", value: "1,200 students" },
      { label: "Buildings", value: "6" },
      { label: "Closed Area", value: "14,800 m2" },
    ],
  },
  {
    slug: "riyadh-villas",
    name: "Riyadh Villas",
    country: "Saudi Arabia",
    city: "Riyadh",
    lat: 24.7136,
    lon: 46.6753,
    status: "Completed",
    category: "High-End Housing",
    year: "2025",
    summary:
      "A villa compound developed for long-term durability, refined material selection, and controlled delivery across multiple concurrent structures.",
    scope: [
      "Core and shell execution",
      "Landscape and external works integration",
      "Finishing coordination across villa clusters",
      "Handover controls and snag management",
    ],
    metrics: [
      { label: "Villas", value: "32" },
      { label: "Delivery Phases", value: "3" },
      { label: "Compound Area", value: "18,200 m2" },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

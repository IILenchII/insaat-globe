"use client";

import { useState } from "react";

const services = [
  {
    title: "General Contracting",
    short: "Structured delivery for complex building programs.",
    detail:
      "We coordinate field execution, subcontractor alignment, procurement rhythm, and quality control to keep delivery practical and predictable.",
  },
  {
    title: "Fit-Out and Finishing",
    short: "Interior delivery with tighter control over quality and sequence.",
    detail:
      "We manage interior scope with attention to detail, material consistency, and handover readiness for commercial and residential environments.",
  },
  {
    title: "Construction Management",
    short: "Planning, sequencing, reporting, and issue resolution.",
    detail:
      "We support owners and developers with reporting structures, schedule ownership, site coordination, and technical follow-through.",
  },
  {
    title: "Renovation and Upgrade",
    short: "Modernization works for existing assets and occupied environments.",
    detail:
      "We improve functionality, durability, and operational performance while keeping disruption and scope drift under control.",
  },
];

export default function ServicesSection() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="services" className="border-b border-white/10 py-20">
      <div className="section-container">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
          Services
        </p>

        <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
          Delivery support shaped around execution realities, not generic scope lists.
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {services.map((service, index) => {
            const isOpen = active === index;

            return (
              <div
                key={service.title}
                className="rounded-[28px] border border-white/10 bg-white/5 transition hover:border-white/20"
              >
                <button
                  onClick={() => setActive(isOpen ? null : index)}
                  className="w-full p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-xl font-bold">{service.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-white/70">
                    {service.short}
                  </p>

                  {isOpen && (
                    <p className="mt-5 border-t border-white/10 pt-5 text-sm leading-7 text-white/80">
                      {service.detail}
                    </p>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

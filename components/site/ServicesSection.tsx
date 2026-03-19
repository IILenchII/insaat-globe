"use client";

import { useState } from "react";

const services = [
  {
    title: "Renovation",
    short: "Modern renovation solutions for existing structures.",
    detail:
      "We transform existing buildings with modern construction techniques, improving functionality, durability and design quality.",
  },
  {
    title: "Sustainable Building",
    short: "Environmentally responsible construction practices.",
    detail:
      "We apply sustainable construction approaches with efficient material usage and long-term building performance in mind.",
  },
  {
    title: "Construction Management",
    short: "Planning and execution control from start to finish.",
    detail:
      "We manage project timelines, coordination and field execution to ensure smooth and reliable delivery.",
  },
  {
    title: "Residential Building",
    short: "High-quality residential construction projects.",
    detail:
      "We deliver residential developments with strong structural quality, disciplined site management and modern standards.",
  },
];

export default function ServicesSection() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="services" className="border-b border-white/10 py-20">
      <div className="section-container">

        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
          Our Services
        </p>

        <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
          High-quality construction services built on experience and discipline.
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">

          {services.map((service, index) => {
            const isOpen = active === index;

            return (
              <div
                key={service.title}
                className="rounded-[28px] border border-white/10 bg-white/5 transition"
              >
                <button
                  onClick={() => setActive(isOpen ? null : index)}
                  className="w-full p-6 text-left"
                >
                  <h3 className="text-xl font-bold">{service.title}</h3>

                  <p className="mt-3 text-sm text-white/70 leading-7">
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
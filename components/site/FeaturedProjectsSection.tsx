const projects = [
  {
    title: "Bilnet Çamlıca Project",
    location: "İstanbul, Türkiye",
  },
  {
    title: "Bilfen Maslak Project",
    location: "İstanbul, Türkiye",
  },
  {
    title: "THY Hangar Project",
    location: "Türkiye",
  },
];

export default function FeaturedProjectsSection() {
  return (
    <section id="projects" className="border-b border-white/10 py-20">
      <div className="section-container">

        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Our Projects
          </p>

          <h2 className="mt-4 text-3xl font-black sm:text-4xl">
            We build projects that last.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {projects.map((project) => (
            <div
              key={project.title}
              className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#d8b25f]/40"
            >
              {/* Fake image (şimdilik) */}
              <div className="h-56 bg-gradient-to-br from-[#0d1424] via-[#162236] to-[#1c3048]" />

              <div className="p-6">
                <p className="text-sm text-gold">{project.location}</p>

                <h3 className="mt-2 text-lg font-bold">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}

        </div>

        {/* Globe referansı */}
        <div className="mt-14 text-center">
          <p className="text-sm text-white/60">
            You can also explore all projects through the interactive globe above.
          </p>
        </div>

      </div>
    </section>
  );
}
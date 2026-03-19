export default function AboutSection() {
  return (
    <section id="about" className="border-b border-white/10 py-20">
      <div className="section-container grid gap-12 lg:grid-cols-[1fr_1fr]">

        {/* SOL (görsel alan) */}
        <div className="relative h-[420px] rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0d1424] via-[#162236] to-[#1c3048]" />

        {/* SAĞ (metin) */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            About Us
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
            We lead the construction industry with quality and precision.
          </h2>

          <p className="mt-6 text-base leading-8 text-white/70">
            Our company combines modern construction techniques with
            experience-driven execution. We focus on delivering durable,
            high-quality projects with disciplined site management and strong
            engineering coordination.
          </p>

          <p className="mt-4 text-base leading-8 text-white/70">
            From residential and educational buildings to aviation and
            large-scale structural works, we approach every project with the same
            level of attention, control and reliability.
          </p>

          <div className="mt-8 flex gap-4">
            <a
              href="#projects"
              className="rounded-full bg-white px-6 py-3 font-semibold text-[#05070f] transition hover:opacity-90"
            >
              Our Projects
            </a>

            <a
              href="#contact"
              className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Contact Us
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
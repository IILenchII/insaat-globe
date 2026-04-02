import Globe from "@/components/Globe";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-white/10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(216,178,95,0.22),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(56,92,142,0.25),transparent_30%),linear-gradient(180deg,#07111b_0%,#091421_45%,#05070f_100%)]" />
      <div className="section-container grid min-h-[calc(100vh-80px)] items-center gap-10 py-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative z-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
            Structured Global Delivery
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Construction leadership with field discipline, not presentation slides.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
            Insaat Globe helps developers and institutions deliver complex
            projects with clear planning, practical execution, and dependable
            site coordination across Turkiye and the wider region.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-full bg-white px-6 py-3 font-semibold text-ink transition hover:-translate-y-0.5"
            >
              Explore Projects
            </a>

            <a
              href="#contact"
              className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Talk to Our Team
            </a>
          </div>

          <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                Focus
              </p>
              <p className="mt-3 text-sm font-semibold text-white">
                Residential, education, mixed-use
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                Strength
              </p>
              <p className="mt-3 text-sm font-semibold text-white">
                Planning, coordination, handover
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                Coverage
              </p>
              <p className="mt-3 text-sm font-semibold text-white">
                Turkiye, Gulf region, selected global work
              </p>
            </div>
          </div>
        </div>

        <div className="relative h-[460px] overflow-hidden rounded-[28px] border border-white/10 bg-black/30 shadow-[0_30px_120px_rgba(0,0,0,0.35)] lg:h-[650px]">
          <Globe />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#05070f]/10 via-transparent to-[#05070f]/25" />
          <div className="pointer-events-none absolute left-6 top-6 rounded-full border border-white/10 bg-black/35 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/70">
            Live Project Map
          </div>
        </div>
      </div>
    </section>
  );
}

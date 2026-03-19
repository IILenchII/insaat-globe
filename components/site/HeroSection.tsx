import Globe from "@/components/Globe";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-white/10"
    >
      <div className="section-container grid min-h-[calc(100vh-80px)] items-center gap-10 py-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative z-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
            Building the future
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            We repair the past.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
            Our commitment to innovation enables us to use modern technology and
            sustainable building practices in every project. We combine
            creativity with precision engineering to deliver strong, lasting
            construction outcomes.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-full bg-white px-6 py-3 font-semibold text-[#05070f] transition hover:opacity-90"
            >
              Examine Our Projects
            </a>

            <a
              href="#contact"
              className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Contact Us
            </a>
          </div>
        </div>

        <div className="relative h-[460px] overflow-hidden rounded-[28px] border border-white/10 bg-black/30 shadow-2xl lg:h-[650px]">
          <Globe />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#05070f]/5 via-transparent to-[#05070f]/20" />
        </div>
      </div>
    </section>
  );
}
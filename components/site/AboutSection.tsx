export default function AboutSection() {
  return (
    <section id="about" className="border-b border-white/10 py-20">
      <div className="section-container grid gap-12 lg:grid-cols-[1fr_1fr]">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(160deg,#0a1422_0%,#102238_55%,#18314b_100%)] p-8">
          <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
          <div className="grid h-full gap-4 pt-8">
            <div className="rounded-[28px] border border-white/10 bg-white/6 p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                Operational Approach
              </p>
              <p className="mt-4 text-xl font-semibold text-white">
                We simplify complexity through sequencing, coordination, and
                transparent delivery control.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
                <p className="text-3xl font-black text-gold">25+</p>
                <p className="mt-2 text-sm leading-7 text-white/68">
                  years of combined delivery experience across multiple building
                  typologies.
                </p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
                <p className="text-3xl font-black text-gold">3 Regions</p>
                <p className="mt-2 text-sm leading-7 text-white/68">
                  active project references spanning Turkiye and the Gulf.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            About
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
            Built for teams that need execution certainty, not vague promises.
          </h2>

          <p className="mt-6 text-base leading-8 text-white/70">
            Our work combines strategic planning, engineering coordination, and
            disciplined site management to keep projects moving with fewer
            surprises and clearer accountability.
          </p>

          <p className="mt-4 text-base leading-8 text-white/70">
            From residential and educational developments to high-standard
            compound work, we approach every build with practical rigor, quality
            control, and a long-term view of performance.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold text-white">Technical clarity</p>
              <p className="mt-3 text-sm leading-7 text-white/68">
                Scope, sequencing, and field priorities are kept visible from
                kickoff through handover.
              </p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold text-white">Delivery discipline</p>
              <p className="mt-3 text-sm leading-7 text-white/68">
                We emphasize quality assurance, schedule ownership, and realistic
                coordination across teams.
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <a
              href="#projects"
              className="rounded-full bg-white px-6 py-3 font-semibold text-ink transition hover:-translate-y-0.5"
            >
              See References
            </a>

            <a
              href="#services"
              className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              View Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

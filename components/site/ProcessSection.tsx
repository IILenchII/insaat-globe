const steps = [
  {
    title: "Planning & Design",
    text: "We define project scope, technical requirements and execution strategy before starting construction.",
  },
  {
    title: "Permits & Approvals",
    text: "All legal and operational permissions are aligned with the project timeline.",
  },
  {
    title: "Site Preparation",
    text: "The construction site is organized for efficient and safe execution.",
  },
  {
    title: "Construction Phase",
    text: "Structural and building works are carried out with disciplined control.",
  },
  {
    title: "Delivery & Completion",
    text: "Final checks, handover and delivery are completed with quality assurance.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="border-b border-white/10 py-20">
      <div className="section-container">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Process
          </p>

          <h2 className="mt-4 text-3xl font-black sm:text-4xl">
            A construction workflow that stays readable from planning to handover.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative rounded-[28px] border border-white/10 bg-white/5 p-6"
            >
              <div className="text-sm font-bold text-gold">
                0{index + 1}
              </div>

              <h3 className="mt-3 text-lg font-bold">
                {step.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-white/70">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

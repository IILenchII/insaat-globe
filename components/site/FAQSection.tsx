const steps = [
  {
    title: "Planning & Design",
    text: "Project scope, technical alignment and execution strategy are defined before field movement begins.",
  },
  {
    title: "Permits & Coordination",
    text: "Operational and regulatory processes are aligned with the project timeline and site realities.",
  },
  {
    title: "Site Preparation",
    text: "The field is organized for efficient structural work, logistics and safe execution sequencing.",
  },
  {
    title: "Structural Execution",
    text: "Core construction is delivered with technical control, quality monitoring and disciplined progress tracking.",
  },
  {
    title: "Delivery & Handover",
    text: "The project is finalized through completion checks, controlled handover and delivery alignment.",
  },
];

export default function ProcessSection() {
  return (
    <section className="border-b border-white/10 py-20">
      <div className="section-container">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
          Process
        </p>

        <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
          Clear execution stages instead of vague corporate fluff.
        </h2>

        <div className="mt-10 grid gap-4 lg:grid-cols-5">
          {steps.map((step, index) => (
            <div key={step.title} className="glass-card rounded-3xl p-6">
              <div className="text-sm font-bold text-gold">0{index + 1}</div>
              <h3 className="mt-3 text-lg font-bold">{step.title}</h3>
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
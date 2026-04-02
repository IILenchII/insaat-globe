const faqs = [
  {
    title: "Which project types do you usually support?",
    text: "We are most effective in residential, education, hospitality, mixed-use, and compound-style developments that require structured coordination and quality control.",
  },
  {
    title: "Do you only work in Turkiye?",
    text: "No. Our references and positioning support work in Turkiye, the Gulf region, and selected international opportunities where delivery discipline matters.",
  },
  {
    title: "Can you support projects that are already underway?",
    text: "Yes. We can step into ongoing projects to stabilize coordination, improve reporting visibility, support finishing strategy, and tighten handover preparation.",
  },
  {
    title: "What makes your approach different?",
    text: "We focus on planning logic, field realism, and execution clarity rather than generic promises. The goal is to make projects more manageable and more predictable.",
  },
];

export default function FAQSection() {
  return (
    <section className="border-b border-white/10 py-20">
      <div className="section-container">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
          FAQ
        </p>

        <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
          Practical questions clients ask before committing to a delivery partner.
        </h2>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {faqs.map((faq, index) => (
            <div
              key={faq.title}
              className="rounded-[28px] border border-white/10 bg-white/5 p-6"
            >
              <div className="text-sm font-bold text-gold">0{index + 1}</div>
              <h3 className="mt-3 text-lg font-bold">{faq.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/70">
                {faq.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

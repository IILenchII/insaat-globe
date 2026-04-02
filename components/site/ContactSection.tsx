"use client";

import { useLanguage } from "@/components/site/LanguageProvider";
import { getSiteCopy } from "@/lib/siteCopy";

export default function ContactSection() {
  const { locale } = useLanguage();
  const copy = getSiteCopy(locale);
  const contactItems = [
    {
      label: "Email",
      value: "info@aydinerinsaat.com.tr",
      href: "mailto:info@aydinerinsaat.com.tr",
    },
    {
      label: "Phone",
      value: "(0216) 309 16 46",
      href: "tel:+902163091646",
    },
    {
      label: copy.contact.officeLabel,
      value: copy.contact.officeValue,
      href: "#home",
    },
  ];

  return (
    <section id="contact" className="border-t border-white/10 py-20">
      <div className="section-container grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(216,178,95,0.22),rgba(11,15,26,0.1))] p-8 shadow-[0_30px_120px_rgba(0,0,0,0.25)] sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">
            {copy.contact.eyebrow}
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-black tracking-tight sm:text-5xl">
            {copy.contact.title}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/72">
            {copy.contact.text}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="mailto:info@aydinerinsaat.com.tr"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5"
            >
              {copy.contact.start}
            </a>
            <a
              href="#projects"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {copy.contact.review}
            </a>
          </div>
        </div>

        <div className="grid gap-4">
          {contactItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-[28px] border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/7"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                {item.label}
              </p>
              <p className="mt-3 text-xl font-semibold text-white">
                {item.value}
              </p>
            </a>
          ))}

          <div className="rounded-[28px] border border-dashed border-white/12 bg-black/20 p-6 text-sm leading-7 text-white/65">
            {copy.contact.availability}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useLanguage } from "@/components/site/LanguageProvider";
import { brandAssets, getSiteCopy } from "@/lib/siteCopy";

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
      <div className="section-container section-frame grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,#122844,#19395d)] p-8 text-white shadow-[0_30px_120px_rgba(0,0,0,0.25)] sm:p-10">
          <div className="relative h-14 w-[128px]">
            <Image
              src={brandAssets.logo}
              alt="Aydiner Construction"
              fill
              sizes="128px"
              className="object-contain object-left brightness-[1.3]"
            />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">
            {copy.contact.eyebrow}
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-black tracking-tight text-[#f8f4ed] [text-shadow:0_8px_28px_rgba(3,9,18,0.42)] sm:text-5xl">
            {copy.contact.title}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/74">
            {copy.contact.text}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="mailto:info@aydinerinsaat.com.tr"
              className="rounded-none border border-[#f1c450] bg-[#f1c450] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#112640] shadow-[0_14px_30px_rgba(241,196,80,0.22)] transition hover:-translate-y-0.5 hover:bg-[#f6cf6b]"
            >
              {copy.contact.start}
            </a>
            <a
              href="#projects"
              className="rounded-none border border-[#f2d186]/52 bg-[rgba(248,244,237,0.96)] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#112640] shadow-[0_16px_34px_rgba(3,9,18,0.2)] transition hover:-translate-y-0.5 hover:bg-white"
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
              className="rounded-[28px] border border-white/10 bg-white/70 p-6 transition hover:border-[#d8b25f]/30 hover:bg-white"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-[#17283b]/45">
                {item.label}
              </p>
              <p className="mt-3 text-xl font-semibold text-[#17283b]">
                {item.value}
              </p>
            </a>
          ))}

          <div className="rounded-[28px] border border-dashed border-[#1d365c]/12 bg-[rgba(255,250,242,0.92)] p-6 text-sm leading-7 text-[#17283b]/65">
            {copy.contact.availability}
          </div>
        </div>
      </div>
    </section>
  );
}

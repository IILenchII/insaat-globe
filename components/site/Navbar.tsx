export default function Navbar() {
  const links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08101b]/78 backdrop-blur-xl">
      <div className="section-container flex h-20 items-center justify-between">
        <a href="#home" className="text-lg font-black tracking-[0.28em] text-white">
          INSAAT GLOBE
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-white/80 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-white transition hover:border-gold/50 hover:bg-white/10"
        >
          Get in Touch
        </a>
      </div>
    </header>
  );
}

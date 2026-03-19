export default function Footer() {
  return (
    <footer id="contact" className="py-20">
      <div className="section-container">

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-10">

          <div className="grid gap-10 lg:grid-cols-3">

            <div>
              <h2 className="text-2xl font-black">
                Aydıner Construction
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/70">
                Delivering high-quality construction projects with precision,
                discipline and long-term reliability across Türkiye and beyond.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gold">
                Contact Info
              </p>

              <div className="mt-4 space-y-3 text-sm text-white/70">
                <p>📞 +90 ___ ___ __ __</p>
                <p>✉️ info@aydiner.com</p>
                <p>📍 İstanbul, Türkiye</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gold">
                Quick Links
              </p>

              <div className="mt-4 space-y-3 text-sm text-white/70">
                <a href="#home" className="block hover:text-white">Home</a>
                <a href="#about" className="block hover:text-white">About</a>
                <a href="#projects" className="block hover:text-white">Projects</a>
                <a href="#contact" className="block hover:text-white">Contact</a>
              </div>
            </div>

          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/50">
            © 2026 Aydıner Construction — All rights reserved.
          </div>

        </div>

      </div>
    </footer>
  );
}
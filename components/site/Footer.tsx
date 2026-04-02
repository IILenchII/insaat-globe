export default function Footer() {
  return (
    <footer className="py-10">
      <div className="section-container">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
          <div className="grid gap-10 lg:grid-cols-3">
            <div>
              <h2 className="text-2xl font-black">Insaat Globe</h2>

              <p className="mt-4 text-sm leading-7 text-white/70">
                Delivering project visibility, execution discipline, and reliable
                construction outcomes across Turkiye and international markets.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gold">Contact</p>

              <div className="mt-4 space-y-3 text-sm text-white/70">
                <p>+90 212 555 01 01</p>
                <p>hello@insaatglobe.com</p>
                <p>Istanbul, Turkiye</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gold">Quick Links</p>

              <div className="mt-4 space-y-3 text-sm text-white/70">
                <a href="#home" className="block hover:text-white">Home</a>
                <a href="#about" className="block hover:text-white">About</a>
                <a href="#services" className="block hover:text-white">Services</a>
                <a href="#projects" className="block hover:text-white">Projects</a>
                <a href="#contact" className="block hover:text-white">Contact</a>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/50">
            © 2026 Insaat Globe. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

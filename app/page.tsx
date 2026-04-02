import AboutSection from "@/components/site/AboutSection";
import ContactSection from "@/components/site/ContactSection";
import FAQSection from "@/components/site/FAQSection";
import FeaturedProjectsSection from "@/components/site/FeaturedProjectsSection";
import Footer from "@/components/site/Footer";
import HeroSection from "@/components/site/HeroSection";
import Navbar from "@/components/site/Navbar";
import ProcessSection from "@/components/site/ProcessSection";
import ServicesSection from "@/components/site/ServicesSection";
import StatsSection from "@/components/site/StatsSection";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ServicesSection />
        <ProcessSection />
        <FeaturedProjectsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

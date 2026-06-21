import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { InstallSection } from "@/components/install-section"
import { PricingSection } from "@/components/pricing-section"
import { FeatureGrid } from "@/components/feature-grid"
import { FaqSection } from "@/components/faq-section"
import { GlitchMarquee } from "@/components/glitch-marquee"
import { FinalCtaSection } from "@/components/final-cta-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <div className="min-h-screen dot-grid-bg">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <InstallSection />
        <PricingSection />
        <FeatureGrid />
        <FaqSection />
        <GlitchMarquee />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  )
}

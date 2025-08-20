import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { StickyWhatsApp } from "@/components/StickyWhatsApp";
import { Hero } from "@/components/Hero";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { SolarPackages } from "@/components/SolarPackages";
import { TrustIndicators } from "@/components/TrustIndicators";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { ImpactStats } from "@/components/ImpactStats";
import { Newsletter } from "@/components/Newsletter";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { ContentProtection } from "@/components/ui/content-protection";

const Index = () => {
  return (
    <ContentProtection>
      <div className="min-h-screen bg-background">
        <Navigation />
        <Hero />
        <ImpactStats />
        <FeaturedProducts />
        <SolarPackages />
        <WhyChooseUs />
        <TrustIndicators />
        <WhatsAppCTA />
        <Newsletter />
        <Footer />
        <StickyWhatsApp />
      </div>
    </ContentProtection>
  );
};

export default Index;
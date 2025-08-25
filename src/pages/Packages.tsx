import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { StickyWhatsApp } from "@/components/StickyWhatsApp";
import { ContentProtection } from "@/components/ui/content-protection";
import { SolarPackages } from "@/components/SolarPackages";
import heroImage from "@/assets/hero-packages.jpg";

const Packages = () => {
  return (
    <ContentProtection>
      <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-32 min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat backdrop-blur-[0.5px]"
          style={{
            backgroundImage: `url(${heroImage})`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30"></div>
        </div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Solar Energy Packages
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Complete solar systems designed for different needs and budgets. 
            Choose the perfect package or let us customize one specifically for you.
          </p>
        </div>
      </section>

      {/* Packages Component */}
      <SolarPackages />
      
      <Footer />
      <StickyWhatsApp />
      </div>
    </ContentProtection>
  );
};

export default Packages;

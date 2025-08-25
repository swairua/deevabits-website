import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { StickyWhatsApp } from "@/components/StickyWhatsApp";
import { ContentProtection } from "@/components/ui/content-protection";
import { Button } from "@/components/ui/button";
import { Heart, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-impact.jpg";
import { ImpactTabs } from "@/components/impact/ImpactTabs";
import { NewsletterSubscription } from "@/components/impact/NewsletterSubscription";
import { ImpactStickyDonateButton } from "@/components/impact/StickyDonateButton";
import { ImpactStats } from "@/components/ImpactStats";

const Impact = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ContentProtection>
      <div className="min-h-screen bg-gradient-to-b from-solar-blue/5 via-background to-solar-green/5">
        <Navigation />
        
        {/* Hero Section */}
        <section className="relative pt-40 pb-32 min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${heroImage})`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-solar-blue/80 via-solar-green/70 to-brand-green/80"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-solar-blue/60"></div>
          </div>
          <div className="relative container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Powering Homes.<br />
              Empowering Lives.<br />
              <span className="text-brand-green">Driving Social Impact.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
              Your donation helps us bring solar access, economic empowerment, and climate solutions to rural communities across Kenya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-brand-green hover:bg-brand-green/90 text-white px-8 py-4 text-lg"
                onClick={() => scrollToSection('impact-tabs')}
              >
                <Heart className="mr-2 h-5 w-5" />
                Donate Now
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/20 hover:bg-white/30 text-white border-white px-8 py-4 text-lg"
                onClick={() => scrollToSection('impact-tabs')}
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                See Our Impact
              </Button>
            </div>
          </div>
        </section>

        {/* Impact Tabs Section */}
        <section id="impact-tabs">
          <ImpactTabs />
        </section>

        {/* Newsletter Subscription */}
        <section className="py-16 bg-gradient-to-r from-brand-green/10 via-solar-blue/5 to-brand-yellow/10">
          <div className="container mx-auto px-4">
            <NewsletterSubscription 
              segment="supporters" 
              sourcePage="impact"
              title="Stay Updated on Our Impact"
              description="Get monthly updates with impact stories, project news, and opportunities to get involved."
            />
          </div>
        </section>

        <Footer />
        <StickyWhatsApp />
        <ImpactStickyDonateButton />
      </div>
    </ContentProtection>
  );
};

export default Impact;

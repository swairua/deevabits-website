import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { StickyWhatsApp } from "@/components/StickyWhatsApp";
import { ContentProtection } from "@/components/ui/content-protection";
import { Button } from "@/components/ui/button";
import { Users, Heart, Zap, Award } from "lucide-react";
import heroImage from "@/assets/hero-about.jpg";

const About = () => {
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
            About Deevabits Green Energy
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            For over 8 years, we've been lighting up lives across Kenya with clean, reliable solar energy solutions. 
            From rural households to commercial enterprises, we're building a sustainable future one installation at a time.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-2xl font-semibold mb-4">From Vision to Impact</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  What started as a mission to bring clean energy to underserved communities has evolved into 
                  Kenya's trusted solar partner. We've reached over 40,000 households, empowered 500+ women 
                  entrepreneurs, and prevented millions of kilograms of CO₂ emissions.
                </p>
                <p className="text-lg text-muted-foreground">
                  Today, we serve everyone from rural families seeking their first solar light to commercial 
                  enterprises planning megawatt installations. Our commitment remains the same: quality equipment, 
                  expert installation, and lasting impact.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-card rounded-lg">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <div className="text-2xl font-bold text-primary">40,000+</div>
                  <div className="text-sm text-muted-foreground">Households Reached</div>
                </div>
                <div className="text-center p-6 bg-card rounded-lg">
                  <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Women Empowered</div>
                </div>
                <div className="text-center p-6 bg-card rounded-lg">
                  <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                  <div className="text-2xl font-bold text-primary">8+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center p-6 bg-card rounded-lg">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <div className="text-2xl font-bold text-primary">2M+</div>
                  <div className="text-sm text-muted-foreground">kg CO₂ Saved</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Our Mission & Values</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Quality First</h3>
                <p className="text-muted-foreground">
                  We partner with world-class manufacturers to deliver solar equipment that stands the test of time.
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Impact Driven</h3>
                <p className="text-muted-foreground">
                  Every installation creates jobs, empowers communities, and builds a cleaner future for Kenya.
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Customer Focused</h3>
                <p className="text-muted-foreground">
                  From consultation to installation to maintenance, we're with you every step of your solar journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <StickyWhatsApp />
      </div>
    </ContentProtection>
  );
};

export default About;

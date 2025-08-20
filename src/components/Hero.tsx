
import { Button } from "@/components/ui/button";
import { MessageCircle, ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site";
import heroImage from "@/assets/hero-home.jpg";

export const Hero = () => {
  const handleWhatsApp = () => {
    const message = "Hi! I'm interested in your solar solutions. Can you help me?";
    const url = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image with Backdrop */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat backdrop-blur-[0.5px]"
        style={{
          backgroundImage: `url(${heroImage})`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Powering Homes,
            <span className="block text-brand-yellow">Empowering Lives</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            From last-mile communities to commercial enterprises, we deliver reliable solar solutions 
            that transform lives while building sustainable businesses across Kenya.
          </p>

          {/* Three CTAs */}
          <div className="flex flex-col lg:flex-row gap-4 justify-center items-center mb-8">
            <Button size="lg" className="bg-white text-brand-green hover:bg-gray-100 text-lg px-8 py-6 h-auto min-w-[200px]" asChild>
              <Link to="/shop">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Shop Solar Products
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-6 h-auto min-w-[200px]"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Talk to Us on WhatsApp
            </Button>

            <Button size="lg" className="bg-brand-green hover:bg-brand-green/90 text-white text-lg px-8 py-6 h-auto min-w-[200px]" asChild>
              <Link to="/impact">
                <Heart className="mr-2 h-5 w-5" />
                Support Our Impact
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/90">
            <div className="text-center">
              <div className="text-2xl font-bold">40,000+</div>
              <div className="text-sm">Households Reached</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">8+</div>
              <div className="text-sm">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm">Women Empowered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">2M+</div>
              <div className="text-sm">kg CO₂ Saved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

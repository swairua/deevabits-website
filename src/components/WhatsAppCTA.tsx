
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";

export const WhatsAppCTA = () => {
  const handleWhatsApp = () => {
    const message = "Hi! I need instant help with solar solutions. Can you assist me?";
    const url = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:${siteConfig.contact.phone}`, '_self');
  };

  return (
    <section className="py-16 solar-gradient-blue text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Need Instant Help?</h2>
          <p className="text-xl mb-8 opacity-90">
            Get expert advice, quick quotes, and technical support through WhatsApp. 
            Our solar specialists are ready to help you go solar today!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-green-500 hover:bg-green-600 text-white border-0 whatsapp-pulse text-lg px-8 py-6 h-auto"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat on WhatsApp
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white hover:bg-white text-lg px-8 py-6 h-auto text-slate-950"
              onClick={handleCall}
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Us Now
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap justify-center items-center gap-8 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Available 24/7</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Free Consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Quick Response</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

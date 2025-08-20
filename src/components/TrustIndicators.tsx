
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Award, Users, Clock } from "lucide-react";

const partners = [
  { name: "USAID", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80" },
  { name: "World Bank", logo: "https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80" },
  { name: "KCB Bank", logo: "https://images.unsplash.com/photo-1560472354-761f1b818310?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80" },
  { name: "Equity Bank", logo: "https://images.unsplash.com/photo-1560472355-ca22045b2443?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80" }
];

const certifications = [
  { icon: Shield, title: "ISO 9001 Certified", description: "Quality management systems" },
  { icon: Award, title: "KEBS Approved", description: "Kenya Bureau of Standards" },
  { icon: Users, title: "ERC Licensed", description: "Energy & Petroleum Regulatory Commission" },
  { icon: Clock, title: "8+ Years", description: "Proven track record in solar" }
];

export const TrustIndicators = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Partner Logos */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold mb-8">Trusted by Leading Organizations</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm">
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="h-12 w-auto grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <cert.icon className="h-8 w-8 text-solar-blue mx-auto mb-3" />
                <h4 className="font-semibold mb-1">{cert.title}</h4>
                <p className="text-sm text-muted-foreground">{cert.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Financing Partners */}
        <div className="text-center mt-16">
          <h3 className="text-xl font-semibold mb-4">Flexible Financing Available</h3>
          <p className="text-muted-foreground mb-6">
            Partner with leading banks for affordable solar financing options
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-solar-blue/10 text-solar-blue px-4 py-2 rounded-full">KCB Bank Partnership</span>
            <span className="bg-solar-green/10 text-solar-green px-4 py-2 rounded-full">Equity Bank Loans</span>
            <span className="bg-solar-gold/10 text-solar-gold px-4 py-2 rounded-full">Flexible Payment Plans</span>
          </div>
        </div>
      </div>
    </section>
  );
};

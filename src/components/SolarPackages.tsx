import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, MessageCircle, Zap, Star } from "lucide-react";
import { siteConfig } from "@/config/site";
import { supabase } from "@/integrations/supabase/client";

interface SolarPackage {
  id: string;
  name: string;
  price: number;
  description: string | null;
  best_for: string[];
  components: any;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
}

// Fallback packages in case database is empty
const fallbackPackages = [
  {
    id: "starter",
    name: "Starter Home Package",
    price: 180000,
    best_for: ["Small households", "1-3 rooms"],
    description: "Perfect for lighting, phone charging, and small appliances",
    components: {
      features: [
        "4x 540W Solar Panels",
        "60A MPPT Controller", 
        "200Ah Lithium Battery",
        "2kW Pure Sine Inverter",
        "Complete wiring & accessories",
        "Professional installation",
        "2-year system warranty"
      ]
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    popular: false
  },
  {
    id: "family",
    name: "Family Home Package", 
    price: 420000,
    best_for: ["Medium households", "Small businesses"],
    description: "Run your entire home including TV, fridge, and lights",
    components: {
      features: [
        "8x 540W Solar Panels",
        "80A MPPT Controller",
        "400Ah Lithium Battery Bank", 
        "5kW Hybrid Inverter",
        "Smart energy monitoring",
        "Grid-tie capability",
        "Professional installation",
        "5-year extended warranty"
      ]
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    popular: true
  },
  {
    id: "commercial",
    name: "Commercial & Industrial",
    price: 2500000,
    best_for: ["Businesses", "Schools", "Health centers"],
    description: "Large-scale solar solutions for commercial operations",
    components: {
      features: [
        "Custom panel configuration",
        "Three-phase system design",
        "Battery backup options",
        "Remote monitoring system",
        "Load analysis & optimization",
        "Financing options available",
        "Professional project management",
        "10-year performance warranty"
      ]
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    popular: false
  }
];

export const SolarPackages = () => {
  const [packages, setPackages] = useState<SolarPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('solar_packages')
        .select('*')
        .eq('is_active', true)
        .order('price', { ascending: true });

      if (error) throw error;

      // Use database data if available, otherwise fallback to static data
      setPackages(data && data.length > 0 ? data : fallbackPackages as SolarPackage[]);
    } catch (error) {
      console.error('Error loading solar packages:', error);
      // Use fallback data on error
      setPackages(fallbackPackages as SolarPackage[]);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestQuote = (packageName: string) => {
    const message = `Hi! I'm interested in the ${packageName}. Can you provide me with a detailed quote and more information?`;
    const url = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleWhatsAppSupport = (packageName: string) => {
    const message = `Hi! I have questions about the ${packageName}. Can you help me?`;
    const url = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const isPopular = (pkg: SolarPackage, index: number) => {
    // Check if package has popular flag in components, otherwise make middle package popular
    return pkg.components?.popular || (index === 1 && packages.length >= 3);
  };

  return (
    <section id="packages" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-bold">Solar Packages & Solutions</h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete solar systems designed for different needs and budgets. 
            Choose the perfect package or let us customize one specifically for you.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Array.from({ length: 6 }).map((_, j) => (
                      <Skeleton key={j} className="h-4 w-full" />
                    ))}
                  </div>
                  <div className="mt-6 space-y-3">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {packages.map((pkg, index) => {
              const popular = isPopular(pkg, index);
              const features = pkg.components?.features || [];
              
              return (
                <Card 
                  key={pkg.id} 
                  className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
                    popular ? 'border-primary border-2 shadow-lg transform lg:scale-105' : 'hover:border-primary/50'
                  }`}
                >
                  {popular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-center py-2 text-sm font-medium">
                      <Star className="inline h-4 w-4 mr-1" />
                      Most Popular Choice
                    </div>
                  )}
                  
                  {pkg.image_url && (
                    <div className="aspect-video bg-muted overflow-hidden">
                      <img 
                        src={pkg.image_url} 
                        alt={pkg.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <CardHeader className={popular ? 'pt-12' : ''}>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      {pkg.name}
                      {popular && <Badge variant="secondary">Popular</Badge>}
                    </CardTitle>
                    <div className="text-3xl font-bold text-primary">
                      KES {pkg.price.toLocaleString()}
                    </div>
                    
                    {pkg.best_for && pkg.best_for.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {pkg.best_for.map((use, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {use}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-muted-foreground">
                      {pkg.description || "Complete solar solution tailored for your needs"}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {features.map((feature: string, featureIndex: number) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                      
                      {features.length === 0 && (
                        <li className="text-center text-muted-foreground text-sm py-4">
                          Contact us for detailed specifications
                        </li>
                      )}
                    </ul>

                    <div className="space-y-3">
                      <Button 
                        className={`w-full transition-all ${
                          popular 
                            ? 'bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg' 
                            : 'hover:bg-primary'
                        }`}
                        size="lg"
                        onClick={() => handleRequestQuote(pkg.name)}
                      >
                        Request Quote
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full hover:border-primary hover:text-primary"
                        onClick={() => handleWhatsAppSupport(pkg.name)}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp Us
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Custom Solutions CTA */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">Need a Custom Solution?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Every project is unique. We offer flexible financing, payment plans, and 
            completely customized solar solutions designed specifically for your needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => handleRequestQuote("Custom Solar Solution")}
            >
              Get Custom Quote
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => handleWhatsAppSupport("Solar Consultation")}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Free Consultation
            </Button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4">
            <div className="text-2xl font-bold text-primary mb-2">8+ Years</div>
            <div className="text-sm text-muted-foreground">Industry Experience</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-primary mb-2">40,000+</div>
            <div className="text-sm text-muted-foreground">Households Powered</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Customer Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};
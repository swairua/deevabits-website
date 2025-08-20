
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, CreditCard, Award } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Quality Equipment",
    description: "Premium solar components from trusted international brands with comprehensive warranties."
  },
  {
    icon: Users,
    title: "Expert Installation",
    description: "Certified technicians with 8+ years of experience ensuring safe, efficient installations."
  },
  {
    icon: CreditCard,
    title: "Flexible Financing",
    description: "Partnership with leading banks to offer affordable payment plans and financing options."
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description: "5000+ successful installations across Kenya with excellent customer satisfaction ratings."
  }
];

export const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose Deevabits?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We combine technical expertise with social impact, delivering reliable solar solutions 
            that benefit both your pocket and the planet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-full bg-primary/10">
                    <reason.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">{reason.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="mt-20 space-y-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">What Our Customers Say</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real stories from families and businesses we've empowered with clean energy
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-muted/50 border-none">
              <CardContent className="p-8 text-center">
                <blockquote className="text-lg font-medium mb-6 italic">
                  "Deevabits transformed our school with reliable solar power. Now our students can study after dark and we've saved thousands on electricity bills."
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Sarah Kimani</div>
                    <div className="text-sm text-muted-foreground">Head Teacher, Kiambu Primary School</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/50 border-none">
              <CardContent className="p-8 text-center">
                <blockquote className="text-lg font-medium mb-6 italic">
                  "Our family business flourished after installing solar panels. We run our shop late into the evening and our profits have doubled!"
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">James Mwangi</div>
                    <div className="text-sm text-muted-foreground">Shop Owner, Nakuru</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/50 border-none">
              <CardContent className="p-8 text-center">
                <blockquote className="text-lg font-medium mb-6 italic">
                  "The solar system powers our entire clinic. We can now operate medical equipment 24/7 and serve our community better than ever."
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Dr. Grace Wanjiku</div>
                    <div className="text-sm text-muted-foreground">Medical Director, Kisumu Health Center</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

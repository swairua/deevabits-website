
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Home, Users, Leaf, Zap } from "lucide-react";

const stats = [
  {
    icon: Home,
    value: 5247,
    label: "Households Powered",
    suffix: "+",
    color: "text-solar-blue"
  },
  {
    icon: Users,
    value: 127,
    label: "Jobs Created",
    suffix: "+",
    color: "text-solar-green"
  },
  {
    icon: Leaf,
    value: 2400,
    label: "Tonnes CO₂ Saved",
    suffix: "+",
    color: "text-solar-green"
  },
  {
    icon: Zap,
    value: 45,
    label: "MW Installed",
    suffix: "+",
    color: "text-primary"
  }
];

export const ImpactStats = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('impact-stats');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="impact-stats" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Impact Across Kenya</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real numbers, real change. See how we're transforming communities 
            and businesses through clean solar energy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <stat.icon className={`h-12 w-12 ${stat.color}`} />
              </div>
              <div className={`text-4xl font-bold mb-2 ${isVisible ? 'animate-counter' : ''}`}>
                <CountUp 
                  end={stat.value} 
                  duration={2} 
                  suffix={stat.suffix}
                  isVisible={isVisible}
                />
              </div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const CountUp = ({ end, duration, suffix = "", isVisible }: { 
  end: number; 
  duration: number; 
  suffix?: string;
  isVisible: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const timer = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (endTime - startTime), 1);
      
      setCount(Math.floor(progress * end));

      if (progress === 1) {
        clearInterval(timer);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration, isVisible]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

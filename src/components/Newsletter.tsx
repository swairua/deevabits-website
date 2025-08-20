
import { NewsletterSubscription } from "@/components/impact/NewsletterSubscription";

export const Newsletter = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-solar-blue to-solar-green">
      <div className="container mx-auto px-4">
        <NewsletterSubscription 
          segment="general" 
          sourcePage="home"
          title="Stay Powered with Updates"
          description="Get the latest solar tips, product updates, financing options, and exclusive offers delivered to your inbox."
        />
      </div>
    </section>
  );
};

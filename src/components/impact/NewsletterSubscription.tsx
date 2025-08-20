
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { NewsletterSubscriptionInsert } from "@/types/newsletter";

interface NewsletterSubscriptionProps {
  segment?: 'donors' | 'partners' | 'supporters' | 'general';
  sourcePage?: string;
  title?: string;
  description?: string;
}

export const NewsletterSubscription = ({ 
  segment = 'general', 
  sourcePage = 'impact',
  title = "Stay Updated on Our Impact",
  description = "Get monthly updates with impact stories, project news, and opportunities to get involved."
}: NewsletterSubscriptionProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    try {
      const subscriptionData: NewsletterSubscriptionInsert = {
        email: email.toLowerCase(),
        name: name || null,
        segment,
        source_page: sourcePage,
        consent: true,
        status: 'subscribed'
      };

      const { error } = await (supabase as any)
        .from('newsletter_subscriptions')
        .insert(subscriptionData);

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already subscribed",
            description: "This email is already subscribed to our newsletter.",
            variant: "default"
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Successfully subscribed!",
          description: "Thank you for subscribing to our newsletter. You'll receive monthly impact updates.",
          variant: "default"
        });
        setEmail("");
        setName("");
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Subscription failed",
        description: "There was an error subscribing to the newsletter. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto text-center">
      <CardHeader>
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-brand-green/10">
            <Mail className="h-8 w-8 text-brand-green" />
          </div>
        </div>
        <CardTitle className="text-3xl mb-4">{title}</CardTitle>
        <CardDescription className="text-lg">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <Input 
            type="text" 
            placeholder="Your name (optional)" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex flex-col sm:flex-row gap-4">
            <Input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button 
              type="submit" 
              className="bg-brand-green hover:bg-brand-green/90"
              disabled={isLoading}
            >
              <Mail className="w-4 h-4 mr-2" />
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>
        </form>
        <p className="text-xs text-muted-foreground mt-4">
          Join {segment === 'donors' ? 'donors, partners, and supporters' : 'our community'}. Unsubscribe anytime.
        </p>
      </CardContent>
    </Card>
  );
};


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, X } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DonationWidget } from "@/components/DonationWidget";

export const ImpactStickyDonateButton = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsVisible(false)}
        className="bg-black/20 hover:bg-black/30 text-white border-none"
      >
        <X className="h-4 w-4" />
      </Button>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            className="bg-brand-green hover:bg-brand-green/90 text-white shadow-lg animate-pulse hover:animate-none px-6 py-3"
            size="lg"
          >
            <Heart className="mr-2 h-5 w-5" />
            Donate Now
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DonationWidget />
        </DialogContent>
      </Dialog>
    </div>
  );
};


import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { useCart } from "@/context/CartContext";

export const StickyWhatsApp = () => {
  const { items, totalPrice } = useCart();

  const handleWhatsApp = () => {
    console.log('Cart items:', items);
    console.log('Total price:', totalPrice);
    
    let message = "Hi! I'd like to request an invoice for the following items from your website:";
    
    // If there are items in the cart, include them in the message
    if (items.length > 0) {
      message += "\n\n";
      
      items.forEach((item) => {
        message += `• ${item.name} x${item.quantity} - KSh ${item.price.toLocaleString()}\n`;
      });
      
      message += `\nTotal: KSh ${totalPrice.toLocaleString()}\n\nPlease send me an invoice and payment instructions. Thank you!`;
    } else {
      message = "Hi! I need help with solar solutions. Can you assist me?";
    }
    
    console.log('WhatsApp message:', message);
    
    const url = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Button
        size="lg"
        className="bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 shadow-lg animate-pulse hover:animate-none transition-all duration-300 hover:scale-110"
        onClick={handleWhatsApp}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
};


import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

// Generic product interface that works with both database and static data
interface BaseProduct {
  id: string;
  name: string;
  price: number;
  category: string;
}

// Database product type
interface DbProduct extends BaseProduct {
  image_url: string | null;
  description: string | null;
  stock_quantity: number;
  is_active: boolean;
}

// Legacy product type from data/products.ts
interface LegacyProduct extends BaseProduct {
  slug: string;
  image: string;
  features: string[];
  description: string;
  inStock: boolean;
}

type Product = DbProduct | LegacyProduct;

interface ProductCardProps {
  product: Product;
}

// Type guards
function isDbProduct(product: Product): product is DbProduct {
  return 'image_url' in product;
}

function isLegacyProduct(product: Product): product is LegacyProduct {
  return 'slug' in product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  // Get normalized values based on product type
  const image = isDbProduct(product) ? (product.image_url || '/placeholder.svg') : product.image;
  const inStock = isDbProduct(product) ? product.stock_quantity > 0 : product.inStock;
  const slug = isLegacyProduct(product) ? product.slug : `product-${product.id}`;
  const features = isLegacyProduct(product) ? product.features : [];
  const description = product.description || '';

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: image
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="product-card overflow-hidden group">
      <div className="aspect-square bg-muted overflow-hidden relative">
        <img 
          src={image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!inStock && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            Out of Stock
          </Badge>
        )}
      </div>
      <CardContent className="p-6">
        <div className="mb-2">
          <Badge variant="outline" className="text-xs">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1).replace('_', ' ')}
          </Badge>
        </div>
        
        <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
        <div className="text-2xl font-bold text-primary mb-3">
          KSh {product.price.toLocaleString()}
        </div>
        
        {features.length > 0 ? (
          <ul className="text-sm text-muted-foreground mb-4 space-y-1">
            {features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center">
                <div className="w-1 h-1 bg-primary rounded-full mr-2"></div>
                {feature}
              </li>
            ))}
          </ul>
        ) : description ? (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {description}
          </p>
        ) : null}

        <div className="flex gap-2">
          <Button 
            size="sm" 
            className="flex-1"
            onClick={handleAddToCart}
            disabled={!inStock}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          <Button size="sm" variant="outline" asChild>
            <Link to={`/product/${slug}`}>
              <Eye className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

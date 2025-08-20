
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Link } from "react-router-dom";

export const FeaturedProducts = () => {
  // Show first 4 products as featured
  const featuredProducts = products.slice(0, 4);

  return (
    <section id="shop" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Featured Solar Equipment</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Premium quality solar components from trusted global brands. 
            Everything you need for a complete solar system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="px-8" asChild>
            <Link to="/shop">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

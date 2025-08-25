import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { StickyWhatsApp } from "@/components/StickyWhatsApp";
import { ContentProtection } from "@/components/ui/content-protection";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter, SlidersHorizontal, Grid, List, ArrowUpDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import heroImage from "@/assets/hero-shop.jpg";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  stock_quantity: number;
  is_active: boolean;
  created_at: string;
}

interface Category {
  id: string;
  name: string;
}

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const { data: productsData, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProducts(productsData || []);
      
      // Find max price and set price range
      const prices = productsData?.map(p => Number(p.price)) || [0];
      const max = Math.max(...prices, 100000);
      setMaxPrice(max);
      setPriceRange([0, max]);

      // Extract unique categories
      const uniqueCategories = [...new Set(productsData?.map(p => p.category))];
      const categoryData = uniqueCategories.map(cat => ({ id: cat, name: cat }));
      setCategories(categoryData);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Enhanced filtering logic
  const filteredProducts = products
    .filter(product => {
      // Category filter
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      // Search filter
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Price filter
      const price = Number(product.price);
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      
      // Stock filter
      const matchesStock = !inStockOnly || product.stock_quantity > 0;
      
      return matchesCategory && matchesSearch && matchesPrice && matchesStock;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return Number(a.price) - Number(b.price);
        case 'price-high':
          return Number(b.price) - Number(a.price);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange([0, maxPrice]);
    setInStockOnly(false);
    setSortBy('newest');
  };

  return (
    <ContentProtection>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section */}
        <section className="relative pt-40 pb-32 min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat backdrop-blur-[0.5px]"
            style={{
              backgroundImage: `url(${heroImage})`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/50"></div>
          </div>
          <div className="relative container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Solar Products Store
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Premium quality solar panels, inverters, batteries and complete systems. 
              Everything you need for reliable clean energy.
            </p>
          </div>
        </section>
        
        {/* Search and Filter Section */}
        <section className="py-8 border-b bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('all')}
                >
                  All Products
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>

              {/* Advanced Filters & View Controls */}
              <div className="flex items-center gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Filter Products</SheetTitle>
                      <SheetDescription>
                        Narrow down products by price, availability and more.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="space-y-6 mt-6">
                      {/* Price Range */}
                      <div>
                        <Label className="text-sm font-medium">Price Range</Label>
                        <div className="mt-2">
                          <Slider
                            value={priceRange}
                            onValueChange={setPriceRange}
                            max={maxPrice}
                            min={0}
                            step={1000}
                            className="w-full"
                          />
                          <div className="flex justify-between text-sm text-muted-foreground mt-1">
                            <span>KES {priceRange[0].toLocaleString()}</span>
                            <span>KES {priceRange[1].toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* In Stock Only */}
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="in-stock"
                          checked={inStockOnly}
                          onCheckedChange={setInStockOnly}
                        />
                        <Label htmlFor="in-stock">In stock only</Label>
                      </div>

                      {/* Sort By */}
                      <div>
                        <Label className="text-sm font-medium">Sort by</Label>
                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="newest">Newest first</SelectItem>
                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                            <SelectItem value="name">Name A-Z</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button onClick={clearFilters} variant="outline" className="w-full">
                        Clear All Filters
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>

                {/* View Mode Toggle */}
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Filter Summary */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>Showing {filteredProducts.length} of {products.length} products</span>
              {selectedCategory !== 'all' && (
                <Badge variant="secondary">Category: {selectedCategory}</Badge>
              )}
              {searchQuery && (
                <Badge variant="secondary">Search: "{searchQuery}"</Badge>
              )}
              {inStockOnly && (
                <Badge variant="secondary">In stock only</Badge>
              )}
              {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                <Badge variant="secondary">
                  Price: KES {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()}
                </Badge>
              )}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-80" />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        <Footer />
        <StickyWhatsApp />
      </div>
    </ContentProtection>
  );
};

export default Shop;

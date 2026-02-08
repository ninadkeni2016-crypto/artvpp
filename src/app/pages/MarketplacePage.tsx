import React, { useState, useMemo, useEffect } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { Product, ProductType } from '../types';
import { mockProducts } from '../data/mockData';
import { productApi } from '../../services/api';
import { ProductCard } from '../components/ItemCards';
import { Button } from '../components/ui/button';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';

interface MarketplacePageProps {
  onNavigate: (page: string, id?: string) => void;
  type?: ProductType;
}

export const MarketplacePage: React.FC<MarketplacePageProps> = ({ onNavigate, type }) => {
  const { addToCart } = useCart();
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Map frontend type to backend type param if needed, but for now we pass it directly
        const fetchedProducts = await productApi.getProducts({ type });

        if (fetchedProducts.length === 0) {
          console.log("No products from API, using mock data");
          setProducts(type ? mockProducts.filter(p => p.type === type) : mockProducts);
        } else {
          setProducts(fetchedProducts);
        }
        setError(null);
      } catch (err) {
        console.error("Failed to fetch products", err);
        setError("Failed to load products. Using offline data.");
        // Fallback to mock data on error for demo purposes if backend isn't running
        console.log("Falling back to mock data");
        setProducts(type ? mockProducts.filter(p => p.type === type) : mockProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [type]);

  // Get unique categories from fetched products
  const categories = useMemo(() => Array.from(new Set(products.map(p => p.category))), [products]);

  // Apply filters locally for now (can move to backend later)
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by price range
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        // Featured first
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [products, priceRange, selectedCategories, sortBy]);

  const handleAddToCart = (product: Product) => {
    addToCart({
      productId: product.id,
      itemType: 'product',
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.images[0],
      vendorId: product.vendorId,
    });
    toast.success('Added to cart!');
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const getTitle = () => {
    if (type === 'physical') return 'Physical Art';
    if (type === 'digital') return 'Digital Art';
    if (type === 'merchandise') return 'Merchandise';
    return 'All Products';
  };

  const getDescription = () => {
    if (type === 'physical') return 'Original artworks, prints, handcrafted items, and traditional art';
    if (type === 'digital') return 'Digital illustrations, templates, fonts, and instant downloads';
    if (type === 'merchandise') return 'Art-inspired clothing, accessories, and home décor';
    return 'Browse all creative products and artworks';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{getTitle()}</h1>
          <p className="text-gray-600">{getDescription()}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg p-6 sticky top-24 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange([0, 50000]);
                  }}
                >
                  Clear All
                </Button>
              </div>

              {/* Price Range */}
              <div>
                <Label className="font-semibold mb-3 block">Price Range</Label>
                <Slider
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                  max={50000}
                  step={500}
                  className="mb-3"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹{priceRange[0].toLocaleString()}</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
              </div>

              {/* Categories */}
              <div>
                <Label className="font-semibold mb-3 block">Categories</Label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <label
                        htmlFor={category}
                        className="text-sm cursor-pointer capitalize"
                      >
                        {category.replace(/-/g, ' ')}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="text-sm text-gray-600">
                {filteredProducts.length} products found
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => onNavigate('product-detail', product.id)}
                    onAddToCart={() => handleAddToCart(product)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found matching your criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange([0, 50000]);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
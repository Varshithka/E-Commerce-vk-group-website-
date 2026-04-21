import { useState, useRef } from "react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import ProductGrid from "@/components/ProductGrid";
import DealsBanner from "@/components/DealsBanner";
import Footer from "@/components/Footer";
import CartCheckoutModal from "@/components/CartCheckoutModal";
import ProductDetailModal from "@/components/ProductDetailModal";
import { products, categories, type Product } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const productGridRef = useRef<HTMLDivElement>(null);

  const displayProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategoryId ? p.category === selectedCategoryId : true;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
    toast.success(`${product.name} added to cart! 🛒`, {
       className: "bg-black border border-primary/20 text-white",
    });
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term && productGridRef.current) {
      productGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCategoryClick = (categoryId: string) => {
     setSelectedCategoryId(categoryId);
     if (productGridRef.current) {
        productGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
     }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar 
        cartCount={cartItems.length} 
        onCartClick={() => setIsCartOpen(true)} 
        onSearch={handleSearch}
      />
      
      <CartCheckoutModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onClearCart={() => setCartItems([])}
      />

      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <main className="pt-20">
        <HeroSection />
        
        <CategorySection onCategoryClick={handleCategoryClick} />

        <div ref={productGridRef} className="max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-24">
          <ProductGrid 
            title={searchTerm ? "Search Results" : (selectedCategoryId ? `${categories.find(c => c.id === selectedCategoryId)?.name}` : "Featured")} 
            highlight="PRODUCTS" 
            highlightColor="cyan" 
            products={displayProducts} 
            onAddToCart={handleAddToCart} 
            onProductClick={setSelectedProduct} 
          />
        </div>

        <DealsBanner />
      </main>

      <Footer />
    </div>
  );
};

export default Index;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Trash2, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products, type Product } from "@/data/products";

// Mock wishlist — starts with some popular items
const INITIAL_WISHLIST = products.filter(p => p.badge && ["HOT", "BEST SELLER", "FAVORITE"].includes(p.badge || "")).slice(0, 6);

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<Product[]>(INITIAL_WISHLIST);
  const [cartItems, setCartItems] = useState<string[]>([]);

  const remove = (id: string) => {
    setWishlist(prev => prev.filter(p => p.id !== id));
    toast.success("Removed from wishlist", { className: "bg-black border border-white/10 text-white" });
  };

  const addToCart = (product: Product) => {
    setCartItems(prev => [...prev, product.id]);
    toast.success(`${product.name} added to cart! 🛒`, { className: "bg-black border border-primary/20 text-white" });
  };

  const moveAllToCart = () => {
    wishlist.forEach(p => setCartItems(prev => [...prev, p.id]));
    toast.success(`${wishlist.length} items added to cart!`);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar cartCount={cartItems.length} />

      <main className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <Heart className="w-7 h-7 text-primary fill-primary" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-display font-black">My Wishlist</h1>
                <p className="text-muted-foreground text-sm mt-0.5">{wishlist.length} saved item{wishlist.length !== 1 ? "s" : ""}</p>
              </div>
            </div>
            {wishlist.length > 0 && (
              <button onClick={moveAllToCart}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-black font-black text-xs uppercase tracking-widest rounded-xl hover:scale-105 hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all">
                <ShoppingCart className="w-4 h-4" />
                Move All to Cart
              </button>
            )}
          </motion.div>

          {/* Empty State */}
          {wishlist.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-28 text-center border-2 border-dashed border-white/5 rounded-3xl group hover:border-primary/20 transition-all">
              <div className="w-24 h-24 rounded-3xl bg-white/3 flex items-center justify-center mb-6 border border-white/5">
                <Heart className="w-12 h-12 text-white/10" />
              </div>
              <h2 className="text-2xl font-display font-bold mb-3 text-white/40">Your Wishlist is Empty</h2>
              <p className="text-muted-foreground mb-8 max-w-xs text-sm">
                Explore our collection and tap the ❤️ on items you love to save them here.
              </p>
              <Link to="/"
                className="flex items-center gap-2 px-8 py-3.5 bg-primary text-black font-black text-xs uppercase tracking-widest rounded-xl hover:scale-105 transition-all">
                <ShoppingBag className="w-4 h-4" />
                Start Shopping
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {wishlist.map((product, i) => (
                  <motion.div key={product.id}
                    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05 }}
                    className="group relative rounded-2xl overflow-hidden bg-[#111] border border-white/5 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(var(--primary),0.08)]">
                    
                    {/* Remove button */}
                    <button onClick={() => remove(product.id)}
                      className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 border border-white/10 text-white/50 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all opacity-0 group-hover:opacity-100">
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-3 left-3 z-10 px-2 py-1 rounded-md text-[10px] font-black bg-primary text-black">
                        {product.badge}
                      </div>
                    )}

                    {/* Image */}
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <motion.img src={product.image} alt={product.name}
                        className="w-full h-full object-cover" loading="lazy"
                        whileHover={{ scale: 1.08 }} transition={{ duration: 0.5 }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-90" />
                    </div>

                    {/* Info */}
                    <div className="p-4 space-y-3 -mt-14 relative z-10">
                      <p className="text-[9px] font-black text-primary/60 uppercase tracking-widest">{product.category}</p>
                      <h3 className="font-heading font-bold text-white text-sm leading-tight line-clamp-2">{product.name}</h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black font-display">₹{product.price.toLocaleString("en-IN")}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                        )}
                      </div>
                      <button onClick={() => addToCart(product)}
                        className={`w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 ${cartItems.includes(product.id) ? "bg-green-500/20 text-green-400 border border-green-500/20" : "bg-white/5 text-white hover:bg-primary hover:text-black border border-white/5 hover:border-primary"}`}>
                        <ShoppingCart className="w-3.5 h-3.5" />
                        {cartItems.includes(product.id) ? "Added!" : "Add to Cart"}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;

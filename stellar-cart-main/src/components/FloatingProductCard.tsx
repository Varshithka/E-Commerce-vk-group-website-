import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShoppingCart, Star, Sparkles, Heart } from "lucide-react";
import type { Product } from "@/data/products";

interface Props {
  product: Product;
  index: number;
  onAddToCart: (product: Product) => void;
  onProductClick?: (product: Product) => void;
}

const FloatingProductCard = ({ product, index, onAddToCart, onProductClick }: Props) => {
  const [celebrating, setCelebrating] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCelebrating(true);
    onAddToCart(product);
    setTimeout(() => setCelebrating(false), 800);
  };

  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="perspective-1000"
    >
      <div
        onClick={() => onProductClick?.(product)}
        className="relative group cursor-pointer rounded-2xl overflow-hidden bg-[#111] border border-white/5 transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(var(--primary),0.1)]"
      >
        {/* Wishlist Button Placeholder */}
        <button 
          onClick={(e) => e.stopPropagation()}
          className="absolute top-3 right-3 z-20 p-2 rounded-full backdrop-blur-md border border-white/10 bg-black/50 text-white/50 hover:text-primary hover:border-primary/30"
        >
          <Heart className="w-4 h-4" />
        </button>

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 z-10 px-2 py-1 rounded-md text-[10px] font-black bg-primary text-black">
            {discount}% OFF
          </div>
        )}

        {/* Image Area */}
        <div className="relative overflow-hidden aspect-[4/5]">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-80" />
        </div>

        {/* Content */}
        <div className="p-4 space-y-3 relative z-10 -mt-12">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">{product.category}</p>
            <h3 className="font-heading font-bold text-white text-base leading-tight line-clamp-2 min-h-[2.5rem]">
              {product.name}
            </h3>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex text-primary">
               {[...Array(5)].map((_, i) => (
                 <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-primary" : "fill-none opacity-30"}`} />
               ))}
            </div>
            <span className="text-[10px] text-muted-foreground font-bold">({product.reviews})</span>
          </div>

          {/* Price Section */}
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-white font-display">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          {/* Action Button */}
          <button
            onClick={handleBuy}
            className={`w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-tighter flex items-center justify-center gap-2 transition-all duration-300 ${celebrating ? "bg-green-500 text-black" : "bg-white text-black hover:bg-primary"}`}
          >
            {celebrating ? (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                Added!
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingProductCard;

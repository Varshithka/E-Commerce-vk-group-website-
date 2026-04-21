import { motion } from "framer-motion";
import { Package } from "lucide-react";
import FloatingProductCard from "./FloatingProductCard";
import type { Product } from "@/data/products";

interface Props {
  id?: string;
  title: string;
  highlight: string;
  highlightColor: 'cyan' | 'purple' | 'pink' | 'gold';
  products: Product[];
  onAddToCart: (product: Product) => void;
  onProductClick?: (product: Product) => void;
}

const glowTextMap = {
  cyan: "text-primary text-glow-cyan",
  purple: "text-secondary text-glow-purple",
  pink: "text-neon-pink text-glow-pink",
  gold: "text-accent text-glow-gold",
};

const ProductGrid = ({ id, title, highlight, highlightColor, products, onAddToCart, onProductClick }: Props) => {
  return (
    <section id={id} className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-10"
        >
          <h2 className="font-display text-2xl sm:text-3xl font-bold">
            <span className="text-foreground">{title} </span>
            <span className={glowTextMap[highlightColor]}>{highlight}</span>
          </h2>
          <p className="text-xs text-muted-foreground font-black uppercase tracking-widest">
            {products.length} item{products.length !== 1 ? "s" : ""}
          </p>
        </motion.div>

        {products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-white/5 rounded-3xl hover:border-primary/20 transition-all group"
          >
            <div className="w-20 h-20 rounded-3xl bg-white/3 flex items-center justify-center mb-6 border border-white/5 group-hover:border-primary/20 transition-all">
              <Package className="w-10 h-10 text-white/10 group-hover:text-primary/30 transition-all" />
            </div>
            <h3 className="font-display text-xl font-bold text-white/20 mb-2">No Products Found</h3>
            <p className="text-sm text-muted-foreground/40 italic">Try selecting a different category or clearing your search.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <FloatingProductCard key={product.id} product={product} index={i} onAddToCart={onAddToCart} onProductClick={onProductClick} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;

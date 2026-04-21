import { motion } from "framer-motion";
import { categories } from "@/data/products";

const glowMap = {
  cyan: "hover:box-glow-cyan hover:border-neon-cyan/40",
  purple: "hover:box-glow-purple hover:border-neon-purple/40",
  pink: "hover:box-glow-pink hover:border-neon-pink/40",
  gold: "hover:box-glow-gold hover:border-accent/40",
  green: "hover:box-glow-cyan hover:border-neon-green/40",
  blue: "hover:box-glow-purple hover:border-neon-blue/40",
};

interface Props {
  onCategoryClick?: (id: string) => void;
}

const CategorySection = ({ onCategoryClick }: Props) => {
  return (
    <section id="categories-section" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
            BROWSE <span className="text-secondary text-glow-purple">CATEGORIES</span>
          </h2>
          <p className="text-muted-foreground font-heading text-lg">Discover products across every universe</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => onCategoryClick?.(cat.id)}
              className={`group p-6 rounded-xl bg-card border border-border transition-all duration-500 ${glowMap[cat.glowColor]} text-left`}
            >
              <div className="text-4xl mb-3">{cat.icon}</div>
              <h3 className="font-heading font-bold text-foreground text-lg">{cat.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{cat.productCount.toLocaleString()}+ items</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;

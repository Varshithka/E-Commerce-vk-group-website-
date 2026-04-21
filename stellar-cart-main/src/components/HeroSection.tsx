import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const scrollToCategories = () => {
  const el = document.getElementById("categories-section");
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Futuristic shopping" className="w-full h-full object-cover opacity-40" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(hsl(170, 100%, 50%, 0.15) 1px, transparent 1px), linear-gradient(90deg, hsl(170, 100%, 50%, 0.15) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating Orbs */}
      <motion.div
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, hsl(170, 100%, 50%, 0.3), transparent)" }}
      />
      <motion.div
        animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, hsl(280, 100%, 65%, 0.3), transparent)" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full neon-border bg-muted/30 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-heading text-accent">Next-Gen Shopping Experience</span>
          </motion.div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-8xl font-black leading-tight">
            <span className="text-foreground">VK GROUP </span>
            <span className="text-primary text-glow-cyan">COMPANY</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed">
            The ultimate e-commerce destination. Experience premium quality with our next-gen 3D interface and lightning-fast logistics across India.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <motion.button
              onClick={scrollToCategories}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,255,200,0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 rounded-full gradient-neon text-primary-foreground font-heading font-bold text-lg flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Explore Now
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={scrollToCategories}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 rounded-full neon-border bg-transparent text-primary font-heading font-bold text-lg hover:bg-primary/10 transition-colors"
            >
              View Deals
            </motion.button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-8 sm:gap-16 mt-16"
        >
          {[
            { value: "50K+", label: "Products" },
            { value: "12K+", label: "Happy Users" },
            { value: "99.9%", label: "On-Time Delivery" },
            { value: "4.9★", label: "Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl sm:text-3xl font-bold text-primary text-glow-cyan">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-heading mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.button
          onClick={scrollToCategories}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 1.2, duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="mt-14 flex flex-col items-center gap-2 text-muted-foreground/40 hover:text-primary transition-colors mx-auto"
        >
          <span className="text-[9px] uppercase tracking-[0.4em] font-black">Scroll to Shop</span>
          <ChevronDown className="w-5 h-5" />
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;

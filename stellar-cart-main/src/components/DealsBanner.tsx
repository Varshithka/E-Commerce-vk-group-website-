import { motion } from "framer-motion";
import { Clock, Flame, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const DealsBanner = () => {
  const [timeLeft, setTimeLeft] = useState({ h: 5, m: 42, s: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden gradient-fire p-8 sm:p-12"
        >
          <div className="absolute inset-0 opacity-20">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 40%)`,
              }}
            />
          </div>

          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start mb-2">
                <Flame className="w-6 h-6 text-primary-foreground" />
                <span className="font-display text-sm font-bold text-primary-foreground tracking-wider">FLASH DEALS</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary-foreground mb-2">
                Up to 70% Off Everything
              </h2>
              <p className="text-primary-foreground/80 font-body">Limited time offers on trending products</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <Clock className="w-5 h-5 text-primary-foreground" />
                <span className="text-sm text-primary-foreground/80 font-heading">Ends in</span>
              </div>
              <div className="flex gap-2">
                {[
                  { v: timeLeft.h, l: "HRS" },
                  { v: timeLeft.m, l: "MIN" },
                  { v: timeLeft.s, l: "SEC" },
                ].map((t) => (
                  <div key={t.l} className="flex flex-col items-center bg-primary-foreground/20 rounded-lg px-3 py-2 backdrop-blur-sm">
                    <span className="font-display text-2xl font-bold text-primary-foreground">
                      {String(t.v).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] text-primary-foreground/70 font-heading">{t.l}</span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex items-center gap-2 px-6 py-3 rounded-full bg-primary-foreground text-neon-pink font-heading font-bold"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DealsBanner;

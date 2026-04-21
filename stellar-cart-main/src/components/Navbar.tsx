import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Search, User, Menu, X, Mic, Zap, Heart, Package } from "lucide-react";

interface Props {
  cartCount: number;
  onCartClick?: () => void;
  onSearch?: (term: string) => void;
}

const Navbar = ({ cartCount, onCartClick, onSearch }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300">
              <Zap className="w-6 h-6 text-black fill-black" />
            </div>
            <span className="font-display text-lg font-bold text-white tracking-tighter uppercase">
              VK <span className="text-primary">GROUP</span>
            </span>
          </Link>

          {/* Search Bar - Center */}
          <div className="hidden md:flex items-center flex-1 max-w-xl mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                onChange={(e) => onSearch?.(e.target.value)}
                placeholder="Search products, brands and categories..."
                className="block w-full bg-secondary/50 border border-white/10 rounded-lg pl-10 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
              />
              <button className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <Mic className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
              </button>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2 sm:gap-6">
            <Link to="/track-order" className="hidden lg:flex items-center gap-2 text-muted-foreground hover:text-white transition-all text-[10px] font-black uppercase tracking-widest bg-white/5 px-4 py-2 rounded-xl border border-white/5 hover:border-primary/30">
               <Package className="w-4 h-4 text-primary" />
               Track Order
            </Link>

            <Link to="/wishlist" className="relative group p-2 text-muted-foreground hover:text-primary transition-all">
              <Heart className="w-6 h-6" />
            </Link>

            <button onClick={onCartClick} className="relative group p-2 text-muted-foreground hover:text-primary transition-all">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-black text-[10px] font-bold flex items-center justify-center rounded-full animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="h-6 w-px bg-white/10" />

            <Link to="/profile" className="hidden sm:flex items-center gap-2 group p-2 hover:text-primary transition-all">
              <User className="w-6 h-6" />
              <span className="text-sm font-bold">Sign In</span>
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-white"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {["Home", "Categories", "Deals", "Trending"].map((item) => (
                <button key={item} className="block w-full text-left font-heading text-foreground py-2 hover:text-primary transition-colors">
                  {item}
                </button>
              ))}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-muted/50 border border-border rounded-full pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

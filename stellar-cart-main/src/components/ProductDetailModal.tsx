import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Star, ShieldCheck, Truck, RefreshCcw, Heart } from "lucide-react";
import type { Product } from "@/data/products";
import { useState } from "react";

interface Props {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const mockReviews = [
  { id: 1, user: "Alex M.", rating: 5, date: "2 days ago", comment: "Absolutely love this! The quality is amazing for the price. Highly recommended.", verified: true },
  { id: 2, user: "Sarah J.", rating: 4, date: "1 week ago", comment: "Really good product overall. Shipping was fast as well.", verified: true },
  { id: 3, user: "Chris L.", rating: 5, date: "2 weeks ago", comment: "Exceeded my expectations. The glow is super bright and vibrant.", verified: false },
];

const ProductDetailModal = ({ product, isOpen, onClose, onAddToCart }: Props) => {
  const [selectedImage, setSelectedImage] = useState<number>(0);

  if (!product) return null;

  const mockImages = [
    { id: 0, src: product.image, filter: "none" },
    { id: 1, src: product.image, filter: "brightness(0.8) contrast(1.2)" },
    { id: 2, src: product.image, filter: "saturate(1.5)" },
    { id: 3, src: product.image, filter: "sepia(0.3) hue-rotate(-15deg)" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-[#0f0f0f] w-full max-w-5xl rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                
                {/* Left Side: Images */}
                <div className="space-y-4">
                  <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group">
                    <img 
                      src={mockImages[selectedImage].src} 
                      style={{ filter: mockImages[selectedImage].filter }}
                      alt={product.name} 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <button 
                      className="absolute top-4 right-4 p-3 rounded-full backdrop-blur-md border border-white/10 bg-black/50 text-white hover:text-primary transition-all"
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Thumbnails */}
                  <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                    {mockImages.map((img, idx) => (
                      <button 
                        key={img.id}
                        onClick={() => setSelectedImage(idx)}
                        className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                          selectedImage === idx ? "border-primary scale-105" : "border-white/10 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img 
                          src={img.src} 
                          style={{ filter: img.filter }}
                          alt={`Thumbnail ${idx}`} 
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Side: Details & Reviews */}
                <div className="flex flex-col">
                  <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-2 leading-tight">
                    {product.name}
                  </h1>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center text-primary">
                      {[1, 2, 3, 4, 5].map((star) => (
                         <Star key={star} className={`w-5 h-5 ${star <= Math.floor(product.rating) ? "fill-primary" : "fill-none opacity-30"}`} />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-primary hover:underline cursor-pointer">
                      {product.rating} out of 5 ({product.reviews} ratings)
                    </span>
                  </div>

                  <div className="w-full h-px bg-border my-2"></div>

                  {/* Price Block */}
                  <div className="my-6">
                    <div className="flex items-end gap-3">
                      <span className="text-4xl font-bold text-primary font-display">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <div className="flex flex-col">
                          <span className="text-sm text-destructive font-bold mb-1">
                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                          </span>
                          <span className="text-muted-foreground line-through text-sm">
                            M.R.P: ₹{product.originalPrice.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Inclusive of all taxes</p>
                  </div>

                  {/* Add to Cart logic */}
                  <div className="p-5 rounded-2xl border border-border bg-background/50 mb-6 space-y-4">
                    <div className="flex items-center gap-3 text-sm font-medium text-foreground">
                      <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                      In Stock. Ready to dispatch.
                    </div>
                    <div className="grid grid-cols-3 gap-2 py-4 border-y border-border my-4">
                       <div className="flex flex-col items-center text-center gap-2 text-xs text-muted-foreground">
                          <Truck className="w-6 h-6 text-primary" />
                          <p>Free Delivery</p>
                       </div>
                       <div className="flex flex-col items-center text-center gap-2 text-xs text-muted-foreground">
                          <RefreshCcw className="w-6 h-6 text-primary" />
                          <p>10 Days Replacement</p>
                       </div>
                       <div className="flex flex-col items-center text-center gap-2 text-xs text-muted-foreground">
                          <ShieldCheck className="w-6 h-6 text-primary" />
                          <p>1 Year Warranty</p>
                       </div>
                    </div>
                    <button 
                      onClick={() => onAddToCart(product)}
                      className="w-full py-4 bg-primary text-primary-foreground font-black text-lg rounded-xl hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:shadow-[0_0_30px_rgba(var(--primary),0.4)] flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      ADD TO CART
                    </button>
                  </div>

                  {/* Descriptive Specs */}
                  <div className="space-y-2 mb-8">
                    <h3 className="font-bold text-foreground font-heading">About this item</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Premium quality materials designed for longevity.</li>
                      <li>Intelligent LED lighting with customizable effects.</li>
                      <li>Smart integration with your daily lifestyle.</li>
                      <li>100% genuine product guaranteed by VK Group Company.</li>
                    </ul>
                  </div>

                  <div className="w-full h-px bg-border my-2"></div>

                  {/* Reviews Section */}
                  <div className="mt-6">
                    <h3 className="font-display text-2xl font-bold text-foreground mb-4">Customer Reviews</h3>
                    <div className="space-y-6">
                      {mockReviews.map(review => (
                        <div key={review.id} className="space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-sm">
                              {review.user.charAt(0)}
                            </div>
                            <span className="font-semibold text-sm text-foreground">{review.user}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div className="flex text-accent">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "fill-accent" : "text-muted-foreground fill-transparent"}`} />
                              ))}
                            </div>
                            <span className="text-xs font-bold text-foreground">{review.rating > 4 ? "Great Product!" : "Good."}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>Reviewed {review.date}</span>
                            {review.verified && (
                              <>
                                <span>|</span>
                                <span className="text-primary font-medium">Verified Purchase</span>
                              </>
                            )}
                          </div>
                          
                          <p className="text-sm text-muted-foreground leading-relaxed">"{review.comment}"</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductDetailModal;

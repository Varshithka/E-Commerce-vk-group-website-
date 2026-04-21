import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Package, Calendar, MapPin, CheckCircle2, Clock, Truck } from "lucide-react";
import { toast } from "sonner";
import { API_ENDPOINTS } from "@/config/api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface OrderDetails {
  id: number;
  trackingNumber: string;
  orderStatus: string;
  totalAmount: number;
  estimatedDeliveryDate: string;
  createdAt: string;
}

const TrackOrderModal = ({ isOpen, onClose }: Props) => {
  const [trackingId, setTrackingId] = useState("");
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.ORDERS.TRACK(trackingId));
      if (response.ok) {
        const data = await response.json();
        setOrder(data);
      } else {
        toast.error("Order not found. Please check your tracking ID.");
        setOrder(null);
      }
    } catch (error) {
      toast.error("Could not connect to tracking server.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING": return <Clock className="w-5 h-5 text-yellow-500" />;
      case "SHIPPED": return <Truck className="w-5 h-5 text-blue-500" />;
      case "DELIVERED": return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      default: return <Package className="w-5 h-5 text-primary" />;
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-card w-full max-w-xl p-8 rounded-3xl border border-border shadow-2xl relative overflow-hidden"
          >
            {/* Background Decorations */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl" />

            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-muted-foreground hover:text-primary transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative z-10">
              <h2 className="text-3xl font-display font-bold text-primary mb-2 flex items-center gap-3">
                <Package className="w-8 h-8 text-glow-cyan" />
                Track Your Order
              </h2>
              <p className="text-muted-foreground mb-8">Enter your tracking number to verify your status.</p>

              <form onSubmit={handleTrack} className="flex gap-2 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="TRK-XXXXXXXX"
                    className="w-full bg-muted/50 border border-border rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-primary transition-all text-foreground"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-primary-foreground px-8 rounded-2xl font-bold hover:shadow-lg hover:shadow-primary/25 active:scale-95 transition-all disabled:opacity-50"
                >
                  {loading ? "Searching..." : "Track"}
                </button>
              </form>

              {order && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/30 p-4 rounded-2xl border border-border">
                      <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold block mb-1">Status</span>
                      <div className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
                        {getStatusIcon(order.orderStatus)}
                        {order.orderStatus}
                      </div>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-2xl border border-border">
                      <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold block mb-1">Amount</span>
                      <div className="text-lg font-bold text-primary">${order.totalAmount.toFixed(2)}</div>
                    </div>
                  </div>

                  <div className="bg-muted/30 p-6 rounded-2xl border border-border space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl text-primary">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground block">Estimated Delivery</span>
                        <span className="font-medium text-foreground">{formatDate(order.estimatedDeliveryDate)}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 border-t border-border pt-4">
                      <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-500">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground block">Order Placed On</span>
                        <span className="font-medium text-foreground">{formatDate(order.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {!order && !loading && (
                <div className="text-center py-12 border-2 border-dashed border-border rounded-3xl opacity-50">
                  <Package className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm italic">Tracking details will appear here...</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TrackOrderModal;

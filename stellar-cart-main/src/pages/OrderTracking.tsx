import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Package, CheckCircle2, Truck, Box, MapPin,
  Navigation2, ShoppingCart, Loader2, Info, Clock, RefreshCw
} from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── MOCK TRACKING DATABASE ───────────────────────────────────────────────────
const MOCK_DB: Record<string, any> = {
  "TRK-123456": {
    id: "123456",
    item: "Neon Cyberpunk Jacket",
    status: "SHIPPED",
    estimatedDelivery: "2026-04-22",
    carrier: "VK Express",
    history: [
      { time: "10:30 AM", date: "Apr 19", msg: "In Transit — Nagpur Distribution Center", location: "Nagpur, MH" },
      { time: "05:15 PM", date: "Apr 18", msg: "Departed from Origin Hub", location: "Mumbai, MH" },
      { time: "09:00 AM", date: "Apr 18", msg: "Package Picked Up & Processed", location: "Mumbai, MH" },
      { time: "04:30 PM", date: "Apr 17", msg: "Order Confirmed & Packed", location: "VK HQ, Pune" },
    ],
  },
  "VK-789012": {
    id: "789012",
    item: "Neural VR Headset Pro",
    status: "OUT_FOR_DELIVERY",
    estimatedDelivery: "2026-04-19",
    carrier: "VK Express",
    history: [
      { time: "08:45 AM", date: "Apr 19", msg: "Out for Delivery — Estimated by 8 PM", location: "Mumbai Central" },
      { time: "06:00 AM", date: "Apr 19", msg: "Arrived at Local Delivery Facility", location: "Mumbai, MH" },
      { time: "11:30 PM", date: "Apr 18", msg: "In Transit on Expressway", location: "Pune–Mumbai Expressway" },
    ],
  },
  "VK-345678": {
    id: "345678",
    item: "Galaxy Swirl Sundae × 3",
    status: "DELIVERED",
    estimatedDelivery: "2026-04-10",
    carrier: "VK Cold Chain",
    history: [
      { time: "03:12 PM", date: "Apr 10", msg: "Delivered — Signed by Resident", location: "Mumbai Central" },
      { time: "09:00 AM", date: "Apr 10", msg: "Out for Delivery", location: "Mumbai, MH" },
      { time: "07:30 AM", date: "Apr 10", msg: "Package at Local Hub", location: "Mumbai, MH" },
    ],
  },
};

const STATUSES = [
  { id: "ORDERED", label: "Ordered", icon: ShoppingCart },
  { id: "PACKED",  label: "Packed",  icon: Box },
  { id: "SHIPPED", label: "Shipped", icon: Truck },
  { id: "OUT_FOR_DELIVERY", label: "Out for Delivery", icon: MapPin },
  { id: "DELIVERED", label: "Delivered", icon: CheckCircle2 },
];

const CITY_ROUTE = [
  "Mumbai Hub", "Pune Transit", "Nashik Center",
  "Nagpur Hub", "Hyderabad Node", "Delhi Gateway",
  "Jaipur Checkpoint", "Ahmedabad Terminal",
];

// ─── SIMULATED MAP COMPONENT ──────────────────────────────────────────────────
const LiveMap = ({ order }: { order: any }) => {
  const [cityIdx, setCityIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const cityTimer = setInterval(() => {
      setCityIdx(i => (i + 1) % CITY_ROUTE.length);
    }, 4000);
    const progTimer = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + 0.5));
    }, 100);
    return () => { clearInterval(cityTimer); clearInterval(progTimer); };
  }, []);

  const currentCity = CITY_ROUTE[cityIdx];
  const nextCity = CITY_ROUTE[(cityIdx + 1) % CITY_ROUTE.length];

  return (
    <div className="md:col-span-2 bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 relative overflow-hidden h-[360px]">
      {/* Grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary),0.04)_0%,transparent_70%)]" />
      </div>

      <div className="relative h-full flex flex-col justify-between">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              LIVE TRACKING — VK FLEET
            </h3>
            <p className="text-[9px] text-muted-foreground uppercase tracking-[0.3em] font-black mt-0.5">Satellite Link Active • Signal Excellent</p>
          </div>
          <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-lg flex items-center gap-1.5">
            <RefreshCw className="w-3 h-3 text-primary animate-spin" style={{ animationDuration: "3s" }} />
            <span className="text-[9px] text-primary font-black">LIVE</span>
          </div>
        </div>

        {/* Route Visualization */}
        <div className="flex items-center justify-between gap-4 px-4 flex-1 my-6">
          {/* Origin */}
          <div className="text-center flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-2">
              <MapPin className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-[9px] font-black uppercase text-muted-foreground">Origin</p>
            <p className="text-[10px] text-white font-bold mt-0.5">VK HQ</p>
          </div>

          {/* Animated track */}
          <div className="flex-1 relative flex items-center">
            <div className="h-0.5 w-full bg-white/5 rounded-full" />
            {/* Progress fill */}
            <div
              className="absolute left-0 h-0.5 bg-gradient-to-r from-primary/40 to-primary rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
            {/* Moving truck */}
            <motion.div
              className="absolute -top-5 bg-[#050505] border border-primary/30 rounded-xl p-1.5 shadow-[0_0_15px_rgba(var(--primary),0.3)]"
              style={{ left: `calc(${progress}% - 20px)` }}
            >
              <Truck className="w-4 h-4 text-primary" />
            </motion.div>
          </div>

          {/* Destination */}
          <div className="text-center flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto mb-2 shadow-[0_0_20px_rgba(var(--primary),0.2)]">
              <MapPin className="w-7 h-7 text-primary" />
            </div>
            <p className="text-[9px] font-black uppercase text-primary/60">Destination</p>
            <p className="text-[10px] text-primary font-bold mt-0.5">Your Address</p>
          </div>
        </div>

        {/* Current Location Banner */}
        <div className="space-y-2">
          <div className="bg-white/3 border border-white/5 rounded-2xl p-4 flex items-center gap-3 hover:border-primary/20 transition-all">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Navigation2 className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">Current Position</p>
              <p className="text-sm font-bold text-white truncate">{currentCity}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">Next Hub</p>
              <p className="text-sm font-bold text-primary/70 truncate">{nextCity}</p>
            </div>
          </div>
          <p className="text-[9px] text-muted-foreground/30 text-center italic">
            Updating every 4s via VK Global Fleet Network • Carrier: {order.carrier}
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
const OrderTracking = () => {
  const [searchParams] = useSearchParams();
  const [trackingId, setTrackingId] = useState(searchParams.get("id") || "");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Auto-track if ID was passed via URL (from Profile page)
  useEffect(() => {
    const urlId = searchParams.get("id");
    if (urlId) {
      setTrackingId(urlId);
      handleTrackById(urlId);
    }
  }, []);

  const handleTrackById = (id: string) => {
    const normalizedId = id.trim().toUpperCase();
    setLoading(true);
    setTimeout(() => {
      const data = MOCK_DB[normalizedId];
      if (data) {
        setOrder(data);
        toast.success("📦 Shipment located!");
      } else {
        // Fallback — generate a plausible shipment for any input
        setOrder({
          id: normalizedId.replace(/[^0-9]/g, "").slice(0, 6) || "000001",
          item: "VK Group Shipment",
          status: "PACKED",
          estimatedDelivery: "2026-04-25",
          carrier: "VK Standard",
          history: [
            { time: "Now", date: "Today", msg: "Order verified and ready for dispatch", location: "VK Group Warehouse" },
          ],
        });
        toast.info("Shipment found in VK network.");
      }
      setLoading(false);
    }, 1200);
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    handleTrackById(trackingId);
  };

  const currentStatusIndex = order ? STATUSES.findIndex(s => s.id === order.status) : -1;

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar cartCount={0} />

      <main className="pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">

          {/* Hero Header */}
          <div className="text-center mb-14">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-[10px] uppercase tracking-[0.4em] font-black text-primary/60 mb-4">VK Group Logistics</p>
              <h1 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tighter mb-4">
                TRACK YOUR <span className="text-primary italic">ORDER</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto font-heading">
                Real-time satellite tracking for all VK Group shipments worldwide.
              </p>
            </motion.div>
          </div>

          {/* Search Box */}
          <div className="bg-[#0c0c0c] p-1.5 rounded-3xl border border-white/5 shadow-2xl mb-12 group">
            <form ref={formRef} onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  value={trackingId}
                  onChange={e => setTrackingId(e.target.value)}
                  placeholder="Enter Tracking ID (e.g. TRK-123456)"
                  className="w-full bg-transparent border-none rounded-2xl pl-16 pr-6 py-5 focus:outline-none text-white font-bold text-base placeholder:text-muted-foreground/30"
                />
              </div>
              <button type="submit" disabled={loading}
                className="bg-primary text-black px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Navigation2 className="w-4 h-4" />Track Now</>}
              </button>
            </form>
          </div>

          {/* Quick Demo Tip */}
          {!order && !loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/3 border border-white/5 rounded-full text-xs text-muted-foreground">
                <Info className="w-3.5 h-3.5 text-primary" />
                Try <button onClick={() => { setTrackingId("TRK-123456"); handleTrackById("TRK-123456"); }} className="text-primary font-bold hover:underline">TRK-123456</button> or <button onClick={() => { setTrackingId("VK-789012"); handleTrackById("VK-789012"); }} className="text-primary font-bold hover:underline">VK-789012</button>
              </div>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {order && (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="space-y-8"
              >
                {/* Package Info Strip */}
                <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-white/3 border border-white/5 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Package</p>
                      <p className="font-bold text-sm">{order.item}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Tracking ID</p>
                    <p className="font-mono font-bold text-primary text-sm">{trackingId.toUpperCase()}</p>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="bg-[#0c0c0c] p-8 sm:p-12 rounded-3xl border border-white/5 shadow-xl relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-10 opacity-40">
                    <Navigation2 className="w-4 h-4 text-primary animate-pulse" />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-black">Delivery Progress</span>
                  </div>

                  <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-0">
                    {/* Background line */}
                    <div className="absolute top-[28px] left-0 right-0 h-[1px] bg-white/5 hidden md:block" />
                    {/* Progress line */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(0, (currentStatusIndex / (STATUSES.length - 1)) * 100)}%` }}
                      className="absolute top-[28px] left-0 h-[1px] bg-primary hidden md:block shadow-[0_0_10px_rgba(var(--primary),0.6)]"
                      transition={{ duration: 1.5, ease: "circOut" }}
                    />

                    {STATUSES.map((step, idx) => {
                      const done = idx <= currentStatusIndex;
                      const current = idx === currentStatusIndex;
                      return (
                        <div key={step.id} className="relative z-10 flex md:flex-col items-center gap-4 md:gap-3 flex-1 text-center">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-700 ${
                            done ? "bg-primary border-primary text-black shadow-[0_0_20px_rgba(var(--primary),0.3)]" : "bg-white/5 border-white/5 text-muted-foreground"
                          } ${current ? "scale-110 ring-4 ring-primary/20" : ""}`}>
                            <step.icon className="w-6 h-6" />
                          </div>
                          <div className="text-left md:text-center">
                            <p className={`text-[10px] font-black uppercase tracking-widest ${done ? "text-primary" : "text-muted-foreground/30"}`}>
                              {step.label}
                            </p>
                            {current && <p className="text-[9px] text-green-400 font-mono uppercase animate-pulse">● Active</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Live Map + Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <LiveMap order={order} />

                  <div className="space-y-5">
                    <div className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-7 hover:border-primary/30 transition-all">
                      <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-4 h-4 text-primary" />
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">ETA</p>
                      </div>
                      <p className="text-2xl font-display font-black text-white">
                        {new Date(order.estimatedDelivery).toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short" })}
                      </p>
                      <p className="text-xs text-primary font-bold uppercase tracking-widest mt-1">By End of Day</p>
                    </div>

                    <div className={`bg-[#0c0c0c] border rounded-3xl p-7 transition-all ${
                      order.status === "DELIVERED" ? "border-green-500/20 hover:border-green-500/40" :
                      order.status === "OUT_FOR_DELIVERY" ? "border-yellow-500/20 hover:border-yellow-500/40" :
                      "border-white/5 hover:border-primary/30"
                    }`}>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4">Status</p>
                      <span className={`inline-block px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${
                        order.status === "DELIVERED" ? "bg-green-500/15 text-green-400" :
                        order.status === "OUT_FOR_DELIVERY" ? "bg-yellow-500/15 text-yellow-400" :
                        "bg-primary/15 text-primary"
                      }`}>
                        {order.status.replace("_", " ")}
                      </span>
                      <p className="text-[10px] text-muted-foreground/50 mt-3 font-bold uppercase">via {order.carrier}</p>
                    </div>
                  </div>
                </div>

                {/* Shipment History Timeline */}
                <div className="bg-[#0c0c0c] rounded-3xl border border-white/5 p-8">
                  <h3 className="font-display font-bold text-xl mb-8 flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center">
                      <RefreshCw className="w-4 h-4 text-primary" />
                    </div>
                    Shipment Activity Log
                  </h3>
                  <div className="space-y-8">
                    {order.history.map((log: any, idx: number) => (
                      <div key={idx} className="flex gap-5 relative">
                        {idx !== order.history.length - 1 && (
                          <div className="absolute left-[9px] top-5 bottom-[-32px] w-[2px] bg-white/5" />
                        )}
                        <div className={`w-5 h-5 rounded-full mt-1 flex-shrink-0 z-10 border-2 transition-all ${
                          idx === 0 ? "bg-primary border-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" : "bg-[#111] border-white/10"
                        }`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                            <p className={`font-bold text-sm ${idx === 0 ? "text-white" : "text-muted-foreground"}`}>{log.msg}</p>
                            <span className="text-[10px] font-mono text-muted-foreground/40 whitespace-nowrap">{log.date} • {log.time}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 text-muted-foreground/40" />
                            <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/40">{log.location}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderTracking;

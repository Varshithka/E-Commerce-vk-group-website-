import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  LayoutDashboard, ShoppingBag, Heart, Package, TrendingUp,
  User, Star, ArrowUpRight, Zap, Bell, ChevronRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/data/products";

const STATS = [
  { label: "Total Orders", value: "12", sub: "+3 this month", icon: ShoppingBag, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
  { label: "Wishlist Items", value: "24", sub: "6 on sale now", icon: Heart, color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20" },
  { label: "Reward Points", value: "9,750", sub: "250 pts to next tier", icon: Star, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
  { label: "Active Shipments", value: "2", sub: "ETA: 2 days", icon: Package, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
];

const RECENT_ORDERS = [
  { id: "123456", item: "Neon Cyberpunk Jacket", amount: 4999, status: "SHIPPED", date: "Today", trackId: "TRK-123456" },
  { id: "789012", item: "Neural VR Headset Pro", amount: 29999, status: "DELIVERED", date: "Apr 15", trackId: "VK-789012" },
  { id: "345678", item: "Galaxy Swirl Sundae × 3", amount: 897, status: "DELIVERED", date: "Apr 10", trackId: "VK-345678" },
];

const QUICK_LINKS = [
  { label: "Track Order", desc: "View live shipment status", icon: Package, to: "/track-order", color: "text-primary" },
  { label: "My Profile", desc: "Edit personal details", icon: User, to: "/profile", color: "text-blue-400" },
  { label: "Wishlist", desc: "24 saved items", icon: Heart, to: "/wishlist", color: "text-pink-400" },
  { label: "Explore", desc: "Browse new arrivals", icon: Zap, to: "/", color: "text-yellow-400" },
];

const NOTIFICATIONS = [
  { msg: "Your order #ORD-123456 has been shipped!", time: "2 hrs ago", read: false },
  { msg: "Flash Sale: Ice Cream — 40% OFF for 2 hours!", time: "5 hrs ago", read: false },
  { msg: "VK Points expiring soon. Redeem now!", time: "Yesterday", read: true },
];

const Dashboard = () => {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const recommended = products.filter(p => p.badge).slice(0, 4);
  const unread = notifications.filter(n => !n.read).length;

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar cartCount={0} />

      <main className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-10">

          {/* Welcome Banner */}
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0c0c0c] to-[#0a0a0a] border border-white/5 p-8 sm:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(var(--primary),0.06),transparent_60%)]" />
            <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <p className="text-[10px] text-primary/60 uppercase font-black tracking-widest mb-2 flex items-center gap-2">
                  <LayoutDashboard className="w-3.5 h-3.5" /> My Dashboard
                </p>
                <h1 className="text-3xl sm:text-4xl font-display font-black mb-2">Welcome back, <span className="text-primary">Alex</span> 👋</h1>
                <p className="text-muted-foreground text-sm">Here's a summary of your VK Group activity today.</p>
              </div>
              <Link to="/profile" className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/5 rounded-2xl hover:border-primary/30 hover:text-primary transition-all group text-sm font-bold">
                <User className="w-4 h-4" /> View Profile
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className={`p-6 rounded-2xl bg-[#0c0c0c] border ${stat.border} hover:scale-[1.02] transition-all`}>
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-4`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className={`text-2xl font-display font-black ${stat.color}`}>{stat.value}</p>
                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-1">{stat.label}</p>
                <p className="text-[10px] text-muted-foreground/40 mt-0.5">{stat.sub}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Orders */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="lg:col-span-2 bg-[#0c0c0c] border border-white/5 rounded-3xl p-7">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display font-bold text-xl flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" /> Recent Orders
                </h2>
                <Link to="/profile" className="text-[10px] text-primary hover:underline font-black uppercase tracking-widest">View All</Link>
              </div>
              <div className="space-y-4">
                {RECENT_ORDERS.map(order => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-white/3 border border-white/5 rounded-2xl hover:border-primary/20 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Package className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">{order.item}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{order.date} • ₹{order.amount.toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${order.status === "DELIVERED" ? "bg-green-500/15 text-green-400" : "bg-primary/15 text-primary"}`}>
                        {order.status}
                      </span>
                      <Link to={`/track-order?id=${order.trackId}`}
                        className="opacity-0 group-hover:opacity-100 p-2 bg-white/5 rounded-xl hover:bg-primary hover:text-black transition-all">
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Notifications */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-7">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display font-bold text-xl flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Notifications
                  {unread > 0 && <span className="w-5 h-5 bg-primary text-black text-[10px] font-black rounded-full flex items-center justify-center">{unread}</span>}
                </h2>
                {unread > 0 && <button onClick={markAllRead} className="text-[10px] text-primary hover:underline font-black uppercase tracking-widest">Mark all read</button>}
              </div>
              <div className="space-y-3">
                {notifications.map((n, i) => (
                  <div key={i} className={`p-4 rounded-2xl border transition-all ${n.read ? "border-white/5 bg-white/3 opacity-50" : "border-primary/10 bg-primary/5"}`}>
                    <p className="text-xs font-bold leading-relaxed">{n.msg}</p>
                    <p className="text-[10px] text-muted-foreground/50 mt-1">{n.time}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <h2 className="font-display font-bold text-2xl mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {QUICK_LINKS.map(link => (
                <Link key={link.label} to={link.to}
                  className="p-6 bg-[#0c0c0c] border border-white/5 rounded-2xl hover:border-primary/20 hover:scale-[1.02] transition-all group">
                  <link.icon className={`w-7 h-7 ${link.color} mb-4 group-hover:scale-110 transition-transform`} />
                  <p className="font-bold text-sm mb-1">{link.label}</p>
                  <p className="text-[10px] text-muted-foreground">{link.desc}</p>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Recommended Products */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display font-bold text-2xl">Recommended For You</h2>
              <Link to="/" className="text-[10px] text-primary hover:underline font-black uppercase tracking-widest">See All</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {recommended.map(p => (
                <Link to="/" key={p.id} className="group rounded-2xl overflow-hidden bg-[#0c0c0c] border border-white/5 hover:border-primary/30 transition-all">
                  <div className="aspect-square overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <p className="text-[9px] text-primary/60 uppercase font-black tracking-widest">{p.category}</p>
                    <p className="font-bold text-sm line-clamp-1 mt-1">{p.name}</p>
                    <p className="text-primary font-display font-black mt-1">₹{p.price.toLocaleString("en-IN")}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

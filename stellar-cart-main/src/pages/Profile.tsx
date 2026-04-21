import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, MapPin, Package, Plus, ShieldCheck,
  ChevronRight, Loader2, LogOut, Camera, Phone, Star,
  Bell, Lock, CreditCard, Navigation2
} from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MOCK_USER = {
  name: "Alex Johnson",
  email: "alex.johnson@vkgroup.com",
  phone: "+91 98765 43210",
  membership: "Elite Platinum",
  joined: "January 2025",
};

const MOCK_ORDERS = [
  { id: "123456", items: "Neon Cyberpunk Jacket", totalAmount: 4999, createdAt: new Date().toISOString(), orderStatus: "SHIPPED", trackingId: "TRK-123456" },
  { id: "789012", items: "Neural VR Headset Pro", totalAmount: 29999, createdAt: "2026-04-15T10:00:00Z", orderStatus: "DELIVERED", trackingId: "VK-789012" },
  { id: "345678", items: "Galaxy Swirl Sundae × 3", totalAmount: 897, createdAt: "2026-04-10T08:00:00Z", orderStatus: "DELIVERED", trackingId: "VK-345678" },
];

const STATS = [
  { label: "Total Orders", value: "12" },
  { label: "Items Saved", value: "48" },
  { label: "Points Earned", value: "9,750" },
  { label: "Tier", value: "Platinum" },
];

const INITIAL_NOTIFICATIONS = [
  { label: "Order Updates", desc: "Shipment status, delivery alerts", enabled: true },
  { label: "Promotions & Deals", desc: "Exclusive offers and flash sales", enabled: true },
  { label: "New Arrivals", desc: "Products matching your interests", enabled: false },
  { label: "Account Alerts", desc: "Login activity and security notices", enabled: false },
];

const navItems = [
  { id: "account", label: "My Account", icon: User },
  { id: "orders", label: "Order History", icon: Package },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "payment", label: "Payment Methods", icon: CreditCard },
  { id: "security", label: "Security", icon: ShieldCheck },
  { id: "notifications", label: "Notifications", icon: Bell },
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [isUpdating, setIsUpdating] = useState(false);
  const [editForm, setEditForm] = useState({ name: MOCK_USER.name, email: MOCK_USER.email, phone: MOCK_USER.phone });
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setTimeout(() => {
      toast.success("✅ Profile updated successfully!");
      setIsUpdating(false);
    }, 1000);
  };

  const handleLogout = () => {
    toast.info("Signing you out...");
    setTimeout(() => (window.location.href = "/"), 1500);
  };

  const toggleNotification = (index: number) => {
    setNotifications(prev => {
      const next = [...prev];
      next[index] = { ...next[index], enabled: !next[index].enabled };
      toast.info(`${next[index].label} ${next[index].enabled ? "enabled" : "disabled"}`);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar cartCount={0} />

      <main className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">

          {/* Profile Header Banner */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-3xl overflow-hidden mb-10 bg-gradient-to-br from-[#0c0c0c] via-[#111] to-[#0a0a0a] border border-white/5 shadow-2xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(var(--primary),0.08),transparent_60%)]" />
            <div className="relative p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center gap-8">

              {/* Avatar */}
              <div className="relative group flex-shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-primary/10 flex items-center justify-center border-2 border-primary/20 shadow-[0_0_30px_rgba(var(--primary),0.1)]">
                  <User className="w-12 h-12 text-primary" />
                </div>
                <button className="absolute -bottom-2 -right-2 p-2 bg-primary text-black rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
                  <Camera className="w-4 h-4" />
                </button>
                <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-yellow-500 text-black text-[9px] font-black uppercase tracking-widest rounded-full">
                  {MOCK_USER.membership.split(" ")[0]}
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 space-y-2">
                <h1 className="text-3xl sm:text-4xl font-display font-black text-white">{editForm.name}</h1>
                <p className="text-muted-foreground font-mono text-sm">{editForm.email}</p>
                <p className="text-xs font-black uppercase tracking-widest text-primary/60">Member since {MOCK_USER.joined}</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full sm:w-auto">
                {STATS.map(s => (
                  <div key={s.label} className="bg-white/5 rounded-2xl p-4 text-center border border-white/5 hover:border-primary/20 transition-all">
                    <p className="text-xl font-display font-black text-primary">{s.value}</p>
                    <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">

            {/* Sidebar */}
            <aside className="w-full lg:w-64 space-y-2 flex-shrink-0">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between group px-5 py-4 rounded-2xl transition-all text-left ${
                    activeTab === item.id
                      ? "bg-primary text-black font-black shadow-[0_0_20px_rgba(var(--primary),0.2)]"
                      : "text-muted-foreground hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-5 h-5 ${activeTab === item.id ? "text-black" : "text-primary/60 group-hover:text-primary"}`} />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 opacity-40 transition-transform ${activeTab === item.id ? "rotate-90 opacity-100" : ""}`} />
                </button>
              ))}

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-red-500/60 hover:bg-red-500/10 hover:text-red-400 transition-all mt-4"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-bold">Sign Out</span>
              </button>
            </aside>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-6 sm:p-10 shadow-2xl"
                >

                  {/* ── ACCOUNT ── */}
                  {activeTab === "account" && (
                    <div className="space-y-10">
                      <div>
                        <h2 className="text-3xl font-display font-bold mb-1">Account Details</h2>
                        <p className="text-muted-foreground text-sm">Update your personal information.</p>
                      </div>
                      <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-2xl">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-primary ml-1">Full Name</label>
                            <div className="relative group">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                              <input type="text" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-primary ml-1">Email Address</label>
                            <div className="relative group">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                              <input type="email" value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-primary ml-1">Phone Number</label>
                            <div className="relative group">
                              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                              <input type="tel" value={editForm.phone} onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all" />
                            </div>
                          </div>
                        </div>
                        <button type="submit" disabled={isUpdating}
                          className="px-8 py-4 bg-primary text-black font-black text-xs uppercase tracking-widest rounded-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(var(--primary),0.4)] transition-all flex items-center gap-2 disabled:opacity-50">
                          {isUpdating && <Loader2 className="w-4 h-4 animate-spin" />}
                          {isUpdating ? "Saving..." : "Save Changes"}
                        </button>
                      </form>
                    </div>
                  )}

                  {/* ── ORDERS ── */}
                  {activeTab === "orders" && (
                    <div className="space-y-8">
                      <div>
                        <h2 className="text-3xl font-display font-bold mb-1">Order History</h2>
                        <p className="text-muted-foreground text-sm">Track and review your recent shipments.</p>
                      </div>
                      <div className="grid gap-4">
                        {MOCK_ORDERS.map((order) => (
                          <div key={order.id}
                            className="p-6 bg-white/3 border border-white/8 rounded-2xl hover:border-primary/30 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Package className="w-6 h-6 text-primary" />
                              </div>
                              <div>
                                <p className="text-[10px] font-black text-primary uppercase tracking-widest">#ORD-{order.id}</p>
                                <p className="font-bold text-white">{order.items}</p>
                                <div className="flex items-center gap-3 mt-0.5">
                                  <p className="text-lg font-display font-black">₹{order.totalAmount.toLocaleString()}</p>
                                  <p className="text-[10px] text-muted-foreground">{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 w-full sm:w-auto">
                              <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${
                                order.orderStatus === "DELIVERED"
                                  ? "bg-green-500/15 text-green-400 border border-green-500/20"
                                  : "bg-primary/15 text-primary border border-primary/20"
                              }`}>
                                {order.orderStatus.replace("_", " ")}
                              </span>
                              <Link to={`/track-order?id=${order.trackingId}`}
                                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-xl hover:bg-primary hover:text-black hover:border-primary font-black text-[10px] uppercase tracking-widest transition-all">
                                <Navigation2 className="w-3.5 h-3.5" />Track
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── ADDRESSES ── */}
                  {activeTab === "addresses" && (
                    <div className="space-y-8">
                      <div className="flex justify-between items-end">
                        <div>
                          <h2 className="text-3xl font-display font-bold mb-1">Saved Addresses</h2>
                          <p className="text-muted-foreground text-sm">Manage shipping and billing locations.</p>
                        </div>
                        <button onClick={() => toast.success("Add address form opened!")}
                          className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 text-xs font-black rounded-xl hover:bg-primary hover:text-black transition-all flex items-center gap-2">
                          <Plus className="w-4 h-4" /> Add New
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-6 bg-white/5 border-2 border-primary/20 rounded-2xl relative">
                          <div className="absolute top-4 right-4 px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest rounded-full">Default</div>
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                            <MapPin className="w-5 h-5 text-primary" />
                          </div>
                          <h3 className="font-bold mb-2">Home</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">Flat 402, Skyline Residency<br />Mumbai Central, MH 400001<br />India</p>
                          <div className="flex gap-3 mt-4">
                            <button onClick={() => toast.info("Edit address")} className="text-[10px] font-black text-primary hover:underline">Edit</button>
                            <button onClick={() => toast.error("Address removed")} className="text-[10px] font-black text-red-500/60 hover:text-red-500">Remove</button>
                          </div>
                        </div>
                        <button onClick={() => toast.info("Add new address")}
                          className="p-6 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-primary/30 transition-all group py-16">
                          <Plus className="w-8 h-8 text-white/10 group-hover:text-primary transition-colors" />
                          <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">Add Another Address</p>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── PAYMENT ── */}
                  {activeTab === "payment" && (
                    <div className="space-y-8">
                      <div>
                        <h2 className="text-3xl font-display font-bold mb-1">Payment Methods</h2>
                        <p className="text-muted-foreground text-sm">Manage your saved cards and wallets.</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/10 border border-primary/20 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -translate-y-10 translate-x-10" />
                          <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/5 translate-y-8 -translate-x-8" />
                          <div className="relative space-y-4">
                            <div className="flex justify-between items-start">
                              <CreditCard className="w-8 h-8 text-primary" />
                              <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-2 py-1 rounded-full">Visa</span>
                            </div>
                            <p className="font-mono text-lg tracking-[0.2em]">•••• •••• •••• 4242</p>
                            <div className="flex justify-between items-end">
                              <div>
                                <p className="text-[9px] text-muted-foreground uppercase font-black">Card Holder</p>
                                <p className="font-bold text-sm">{editForm.name}</p>
                              </div>
                              <div>
                                <p className="text-[9px] text-muted-foreground uppercase font-black">Expires</p>
                                <p className="font-bold text-sm">12/28</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button onClick={() => toast.info("Add new payment method")}
                          className="p-6 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-primary/30 transition-all group py-16">
                          <Plus className="w-8 h-8 text-white/10 group-hover:text-primary transition-colors" />
                          <p className="text-sm text-muted-foreground group-hover:text-primary">Add Payment Method</p>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── SECURITY ── */}
                  {activeTab === "security" && (
                    <div className="space-y-8">
                      <div>
                        <h2 className="text-3xl font-display font-bold mb-1">Privacy & Security</h2>
                        <p className="text-muted-foreground text-sm">Manage your account security settings.</p>
                      </div>
                      <div className="space-y-4">
                        {[
                          { label: "Change Password", desc: "Last changed 30 days ago", icon: Lock, action: "Update" },
                          { label: "Two-Factor Authentication", desc: "Not enabled — adds extra security", icon: ShieldCheck, action: "Enable" },
                        ].map(item => (
                          <div key={item.label} className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-2xl hover:border-primary/20 transition-all group">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <item.icon className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-bold text-sm">{item.label}</p>
                                <p className="text-xs text-muted-foreground">{item.desc}</p>
                              </div>
                            </div>
                            <button onClick={() => toast.info(`${item.action} security setting`)}
                              className="px-4 py-2 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all">
                              {item.action}
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="mt-10 pt-8 border-t border-white/5">
                        <h3 className="font-display font-bold text-xl mb-6">Leave a Review</h3>
                        <div className="flex items-center gap-2 mb-4">
                          {[1, 2, 3, 4, 5].map(r => (
                            <button key={r} onClick={() => setReviewRating(r)}>
                              <Star className={`w-7 h-7 transition-all ${r <= reviewRating ? "fill-primary text-primary scale-110" : "text-white/10"}`} />
                            </button>
                          ))}
                          <span className="text-xs text-muted-foreground ml-2 font-bold">{reviewRating}/5</span>
                        </div>
                        <textarea rows={3} value={reviewText} onChange={e => setReviewText(e.target.value)}
                          placeholder="Share your experience with VK Group..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-primary/50 resize-none transition-all" />
                        <button onClick={() => { toast.success("Thank you for your review! ⭐"); setReviewText(""); setReviewRating(5); }}
                          className="mt-4 px-6 py-3 bg-primary text-black font-black text-xs uppercase tracking-widest rounded-xl hover:scale-105 transition-all">
                          Submit Review
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── NOTIFICATIONS ── */}
                  {activeTab === "notifications" && (
                    <div className="space-y-8">
                      <div>
                        <h2 className="text-3xl font-display font-bold mb-1">Notification Preferences</h2>
                        <p className="text-muted-foreground text-sm">Control how VK Group contacts you.</p>
                      </div>
                      <div className="space-y-4">
                        {notifications.map((notif, i) => (
                          <div key={notif.label} className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-2xl hover:border-primary/10 transition-all">
                            <div>
                              <p className="font-bold text-sm">{notif.label}</p>
                              <p className="text-xs text-muted-foreground">{notif.desc}</p>
                            </div>
                            <button
                              onClick={() => toggleNotification(i)}
                              className={`w-12 h-6 rounded-full transition-all relative border-2 ${notif.enabled ? "bg-primary border-primary" : "bg-white/10 border-white/10"}`}
                            >
                              <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-all duration-300 ${notif.enabled ? "translate-x-6" : "translate-x-0"}`} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;

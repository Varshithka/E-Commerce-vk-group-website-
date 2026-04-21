import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield, Users, Package, ShoppingBag, TrendingUp, Settings,
  Plus, Trash2, Edit, Search, Tag, Star, BarChart3,
  ArrowUpRight, CheckCircle2, XCircle, ChevronRight, Zap
} from "lucide-react";
import { toast } from "sonner";
import { products as allProducts, categories, type Product } from "@/data/products";

const ADMIN_STATS = [
  { label: "Total Revenue", value: "₹8.4L", sub: "+18% this month", icon: TrendingUp, color: "text-primary", bg: "bg-primary/10" },
  { label: "Products", value: "40", sub: "8 categories", icon: Package, color: "text-blue-400", bg: "bg-blue-500/10" },
  { label: "Total Users", value: "12,400", sub: "+340 today", icon: Users, color: "text-purple-400", bg: "bg-purple-500/10" },
  { label: "Orders Today", value: "148", sub: "₹2.1L GMV", icon: ShoppingBag, color: "text-yellow-400", bg: "bg-yellow-500/10" },
];

const RECENT_ORDERS_ADMIN = [
  { id: "ORD-9983", user: "Alex Johnson", item: "VR Headset Pro", amount: 29999, status: "SHIPPED" },
  { id: "ORD-9982", user: "Priya Sharma", item: "Galaxy Swirl Sundae", amount: 897, status: "DELIVERED" },
  { id: "ORD-9981", user: "Ravi Kumar", item: "Cyberpunk Jacket", amount: 4999, status: "PROCESSING" },
  { id: "ORD-9980", user: "Meera Iyer", item: "Quantum Earbuds X1", amount: 7999, status: "DELIVERED" },
  { id: "ORD-9979", user: "Vikram Rao", item: "Galaxy Projector Lamp", amount: 3499, status: "CANCELLED" },
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders" | "users" | "settings">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>(allProducts);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "clothes", image: "", badge: "" });

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast.success("Product removed from catalog");
  };

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price) { toast.error("Name and price are required"); return; }
    const p: Product = {
      id: "custom-" + Date.now(),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      image: newProduct.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 0,
      badge: newProduct.badge || undefined,
      glowColor: "cyan",
    };
    setProducts(prev => [p, ...prev]);
    setShowAddModal(false);
    setNewProduct({ name: "", price: "", category: "clothes", image: "", badge: "" });
    toast.success(`"${p.name}" added to catalog!`);
  };

  const navItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "users", label: "Users", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ] as const;

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Admin Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] border-b border-white/5 px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary p-1 rounded-lg"><Zap className="w-4 h-4 text-black fill-black" /></div>
          <span className="font-display font-black text-sm uppercase">VK <span className="text-primary">Admin</span></span>
          <div className="ml-2 px-2 py-0.5 bg-red-500/10 border border-red-500/20 rounded text-[9px] text-red-400 font-black uppercase tracking-widest flex items-center gap-1">
            <Shield className="w-2.5 h-2.5" /> Restricted
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-[10px] text-muted-foreground hover:text-white font-black uppercase tracking-widest">← Back to Store</Link>
        </div>
      </nav>

      <div className="flex pt-16 min-h-screen">
        {/* Sidebar */}
        <aside className="w-56 fixed left-0 top-16 bottom-0 bg-[#080808] border-r border-white/5 flex flex-col p-4 gap-1">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id as any)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${activeTab === item.id ? "bg-primary text-black font-black" : "text-muted-foreground hover:bg-white/5 hover:text-white"}`}>
              <item.icon className="w-4 h-4" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </aside>

        {/* Main Content */}
        <main className="ml-56 flex-1 p-8">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>

              {/* ── OVERVIEW ── */}
              {activeTab === "overview" && (
                <div className="space-y-8">
                  <div>
                    <h1 className="text-3xl font-display font-black mb-1">Admin Dashboard</h1>
                    <p className="text-muted-foreground text-sm">VK Group Company — Live Store Overview</p>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {ADMIN_STATS.map((s, i) => (
                      <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                        className={`p-6 bg-[#0c0c0c] border border-white/5 rounded-2xl hover:border-primary/20 transition-all`}>
                        <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-4`}>
                          <s.icon className={`w-5 h-5 ${s.color}`} />
                        </div>
                        <p className={`text-2xl font-display font-black ${s.color}`}>{s.value}</p>
                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-1">{s.label}</p>
                        <p className="text-[10px] text-green-400/60 font-bold mt-0.5">{s.sub}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-[#0c0c0c] border border-white/5 rounded-2xl p-7">
                    <h2 className="font-display font-bold text-xl mb-6">Live Order Feed</h2>
                    <div className="space-y-3">
                      {RECENT_ORDERS_ADMIN.map(order => (
                        <div key={order.id} className="flex items-center justify-between p-4 bg-white/3 border border-white/5 rounded-xl hover:border-primary/20 transition-all">
                          <div className="flex items-center gap-4">
                            <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                              <ShoppingBag className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs font-bold">{order.id} — {order.item}</p>
                              <p className="text-[10px] text-muted-foreground">{order.user} • ₹{order.amount.toLocaleString("en-IN")}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                            order.status === "DELIVERED" ? "bg-green-500/15 text-green-400" :
                            order.status === "CANCELLED" ? "bg-red-500/15 text-red-400" :
                            order.status === "SHIPPED" ? "bg-primary/15 text-primary" :
                            "bg-yellow-500/15 text-yellow-400"
                          }`}>{order.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── PRODUCTS ── */}
              {activeTab === "products" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h1 className="text-3xl font-display font-black mb-1">Product Catalog</h1>
                      <p className="text-muted-foreground text-sm">{products.length} products across {categories.length} categories</p>
                    </div>
                    <button onClick={() => setShowAddModal(true)}
                      className="flex items-center gap-2 px-5 py-3 bg-primary text-black font-black text-xs uppercase tracking-widest rounded-xl hover:scale-105 hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all">
                      <Plus className="w-4 h-4" /> Add Product
                    </button>
                  </div>

                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search products by name or category..."
                      className="w-full bg-[#0c0c0c] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all" />
                  </div>

                  <div className="grid gap-3">
                    {filteredProducts.map(product => (
                      <div key={product.id} className="flex items-center gap-4 p-4 bg-[#0c0c0c] border border-white/5 rounded-2xl hover:border-primary/20 transition-all group">
                        <img src={product.image} alt={product.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm truncate">{product.name}</p>
                          <div className="flex items-center gap-3 mt-0.5">
                            <span className="text-[9px] text-primary/60 uppercase font-black tracking-widest">{product.category}</span>
                            <span className="text-[10px] text-yellow-400 flex items-center gap-1"><Star className="w-2.5 h-2.5 fill-yellow-400" />{product.rating}</span>
                            {product.badge && <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-[8px] font-black rounded uppercase">{product.badge}</span>}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-display font-black text-primary">₹{product.price.toLocaleString("en-IN")}</p>
                          {product.originalPrice && <p className="text-[10px] text-muted-foreground line-through">₹{product.originalPrice.toLocaleString("en-IN")}</p>}
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => toast.info(`Edit "${product.name}"`)}
                            className="p-2 bg-white/5 rounded-xl hover:bg-primary/20 hover:text-primary transition-all">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteProduct(product.id)}
                            className="p-2 bg-white/5 rounded-xl hover:bg-red-500/20 hover:text-red-400 transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── ORDERS ── */}
              {activeTab === "orders" && (
                <div className="space-y-6">
                  <h1 className="text-3xl font-display font-black">Order Management</h1>
                  <div className="grid gap-3">
                    {RECENT_ORDERS_ADMIN.map(order => (
                      <div key={order.id} className="p-5 bg-[#0c0c0c] border border-white/5 rounded-2xl hover:border-primary/20 transition-all">
                        <div className="flex flex-wrap justify-between items-center gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                              <ShoppingBag className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-bold">{order.id}</p>
                              <p className="text-xs text-muted-foreground">{order.user} — {order.item}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="font-display font-black text-primary">₹{order.amount.toLocaleString("en-IN")}</p>
                            <select className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border bg-[#0a0a0a] focus:outline-none cursor-pointer ${
                              order.status === "DELIVERED" ? "text-green-400 border-green-500/20" :
                              order.status === "CANCELLED" ? "text-red-400 border-red-500/20" :
                              "text-primary border-primary/20"
                            }`}
                              defaultValue={order.status}
                              onChange={() => toast.success("Order status updated!")}>
                              {["PROCESSING", "SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"].map(s => (
                                <option key={s} value={s}>{s.replace("_", " ")}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── USERS ── */}
              {activeTab === "users" && (
                <div className="space-y-6">
                  <h1 className="text-3xl font-display font-black">User Management</h1>
                  <div className="grid gap-4">
                    {[
                      { name: "Alex Johnson", email: "alex@vkgroup.com", orders: 12, role: "User", status: "Active" },
                      { name: "VK Admin", email: "admin@vkgroup.com", orders: 0, role: "Admin", status: "Active" },
                      { name: "Priya Sharma", email: "priya@vkgroup.com", orders: 5, role: "User", status: "Active" },
                      { name: "Ravi Kumar", email: "ravi@vkgroup.com", orders: 3, role: "User", status: "Suspended" },
                    ].map(user => (
                      <div key={user.email} className="flex items-center justify-between p-5 bg-[#0c0c0c] border border-white/5 rounded-2xl hover:border-primary/20 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Users className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-bold">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email} • {user.orders} orders</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${user.role === "Admin" ? "bg-yellow-500/15 text-yellow-400" : "bg-white/5 text-muted-foreground"}`}>
                            {user.role}
                          </span>
                          {user.status === "Active"
                            ? <CheckCircle2 className="w-5 h-5 text-green-400" />
                            : <XCircle className="w-5 h-5 text-red-400" />}
                          <button onClick={() => toast.info(`Manage ${user.name}`)}
                            className="p-2 bg-white/5 rounded-xl hover:bg-primary/20 hover:text-primary transition-all">
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── SETTINGS ── */}
              {activeTab === "settings" && (
                <div className="space-y-8">
                  <h1 className="text-3xl font-display font-black">Store Settings</h1>
                  <div className="grid gap-4 max-w-2xl">
                    {[
                      { label: "Store Name", value: "VK Group Company", type: "text" },
                      { label: "Support Email", value: "support@vkgroup.com", type: "email" },
                      { label: "GST Number", value: "29AAFCG1234L1Z5", type: "text" },
                      { label: "COD Threshold (₹)", value: "1000", type: "number" },
                    ].map(field => (
                      <div key={field.label} className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.2em] font-black text-primary ml-1">{field.label}</label>
                        <input type={field.type} defaultValue={field.value}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary/50 transition-all" />
                      </div>
                    ))}
                    <button onClick={() => toast.success("Settings saved!")}
                      className="mt-2 px-8 py-4 bg-primary text-black font-black text-xs uppercase tracking-widest rounded-xl hover:scale-105 transition-all">
                      Save Settings
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-8 w-full max-w-md shadow-2xl"
              onClick={e => e.stopPropagation()}>
              <h2 className="font-display font-black text-2xl mb-6 flex items-center gap-2">
                <Plus className="w-6 h-6 text-primary" /> Add New Product
              </h2>
              <div className="space-y-4">
                {[
                  { label: "Product Name", field: "name", placeholder: "e.g. Galaxy Projector Lamp" },
                  { label: "Price (₹)", field: "price", placeholder: "e.g. 2999" },
                  { label: "Image URL", field: "image", placeholder: "https://..." },
                  { label: "Badge (optional)", field: "badge", placeholder: "e.g. NEW, HOT, SALE" },
                ].map(f => (
                  <div key={f.field}>
                    <label className="text-[10px] uppercase tracking-[0.2em] font-black text-primary ml-1 block mb-1.5">{f.label}</label>
                    <input type="text" value={newProduct[f.field as keyof typeof newProduct]}
                      onChange={e => setNewProduct({ ...newProduct, [f.field]: e.target.value })}
                      placeholder={f.placeholder}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all" />
                  </div>
                ))}
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-black text-primary ml-1 block mb-1.5">Category</label>
                  <select value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all">
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <button onClick={addProduct}
                  className="w-full py-4 bg-primary text-black font-black text-xs uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                  <Tag className="w-4 h-4" /> Publish Product
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;

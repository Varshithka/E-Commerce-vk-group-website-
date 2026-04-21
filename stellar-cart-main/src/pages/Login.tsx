import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, Eye, EyeOff, Zap, Sparkles, User } from "lucide-react";
import { toast } from "sonner";

const DEMO_USERS = [
  { email: "alex@vkgroup.com", password: "demo123", name: "Alex Johnson", role: "user" },
  { email: "admin@vkgroup.com", password: "admin123", name: "VK Admin", role: "admin" },
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const found = DEMO_USERS.find(u => u.email === email && u.password === password);
      if (found) {
        localStorage.setItem("vk_user", JSON.stringify(found));
        toast.success(`Welcome back, ${found.name}! 👋`);
        if (found.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        toast.error("Invalid credentials. Try: alex@vkgroup.com / demo123");
      }
      setLoading(false);
    }, 1200);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupForm.name || !signupForm.email || !signupForm.password) {
      toast.error("Please fill all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const newUser = { ...signupForm, role: "user" };
      localStorage.setItem("vk_user", JSON.stringify(newUser));
      toast.success(`Account created! Welcome, ${signupForm.name}! 🎉`);
      navigate("/");
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#050505] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] -ml-48 -mb-48" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group mb-6">
            <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform">
              <Zap className="w-6 h-6 text-black fill-black" />
            </div>
            <span className="font-display font-black text-xl text-white tracking-tight uppercase">
              VK <span className="text-primary">GROUP</span>
            </span>
          </Link>
          <p className="text-muted-foreground text-sm">India's fastest growing premium marketplace</p>
        </div>

        <div className="bg-[#0c0c0c] border border-white/5 rounded-3xl shadow-2xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-white/5">
            {(["login", "signup"] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-sm font-black uppercase tracking-widest transition-all ${activeTab === tab ? "text-primary border-b-2 border-primary bg-primary/5" : "text-muted-foreground hover:text-white"}`}>
                {tab === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, x: activeTab === "login" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="p-8">

              {/* Sign In */}
              {activeTab === "login" && (
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 text-xs text-muted-foreground">
                    <p className="font-black text-primary mb-1 flex items-center gap-1.5"><Sparkles className="w-3 h-3" /> Demo Credentials</p>
                    <p>User: <span className="text-white font-mono">alex@vkgroup.com</span> / <span className="font-mono text-white">demo123</span></p>
                    <p>Admin: <span className="text-white font-mono">admin@vkgroup.com</span> / <span className="font-mono text-white">admin123</span></p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-black text-primary ml-1">Email</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center ml-1">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-black text-primary">Password</label>
                      <button type="button" className="text-[10px] text-primary hover:underline">Forgot?</button>
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input type={showPassword ? "text" : "password"} required value={password} onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <motion.button type="submit" disabled={loading}
                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                    className="w-full py-4 bg-primary text-black font-black text-sm uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(var(--primary),0.4)] transition-all disabled:opacity-50">
                    {loading ? <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <LogIn className="w-4 h-4" />}
                    {loading ? "Signing In..." : "Sign In"}
                  </motion.button>
                </form>
              )}

              {/* Sign Up */}
              {activeTab === "signup" && (
                <form onSubmit={handleSignup} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-black text-primary ml-1">Full Name</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input type="text" required value={signupForm.name} onChange={e => setSignupForm({...signupForm, name: e.target.value})}
                        placeholder="Your full name"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-black text-primary ml-1">Email</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input type="email" required value={signupForm.email} onChange={e => setSignupForm({...signupForm, email: e.target.value})}
                        placeholder="name@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-black text-primary ml-1">Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input type={showPassword ? "text" : "password"} required value={signupForm.password} onChange={e => setSignupForm({...signupForm, password: e.target.value})}
                        placeholder="Create a strong password"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <motion.button type="submit" disabled={loading}
                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                    className="w-full py-4 bg-primary text-black font-black text-sm uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(var(--primary),0.4)] transition-all disabled:opacity-50">
                    {loading ? <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    {loading ? "Creating Account..." : "Create Account"}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="text-center text-xs text-muted-foreground/40 mt-6">
          By continuing, you agree to VK Group's Terms of Service & Privacy Policy
        </p>
      </motion.div>
    </div>
  );
};

export default Login;

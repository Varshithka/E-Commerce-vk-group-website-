import { Link } from "react-router-dom";
import { Zap, Instagram, Twitter, Youtube, Github } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => (
  <footer className="border-t border-white/5 bg-[#050505] py-16 px-4 mt-8">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        
        {/* Brand Column */}
        <div className="md:col-span-1 space-y-4">
          <Link to="/" className="flex items-center gap-2 group w-fit">
            <div className="bg-primary p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
              <Zap className="w-5 h-5 text-black fill-black" />
            </div>
            <span className="font-display text-base font-black text-white tracking-tight uppercase">
              VK <span className="text-primary">GROUP</span>
            </span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The future of online shopping. Immersive, intelligent, and insanely fast delivery across India.
          </p>
          <div className="flex items-center gap-3 pt-2">
            {[
              { icon: Instagram, href: "#" },
              { icon: Twitter, href: "#" },
              { icon: Youtube, href: "#" },
              { icon: Github, href: "#" },
            ].map(({ icon: Icon, href }) => (
              <motion.a key={href + Icon.name} href={href} whileHover={{ scale: 1.2, y: -2 }}
                className="w-9 h-9 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors">
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Links Columns */}
        {[
          {
            title: "Shop",
            links: [
              { label: "Fashion", to: "/" },
              { label: "Electronics", to: "/" },
              { label: "Food Items", to: "/" },
              { label: "Lifestyle", to: "/" },
              { label: "Ice Cream", to: "/" },
            ]
          },
          {
            title: "Company",
            links: [
              { label: "About VK Group", to: "/" },
              { label: "Careers", to: "/" },
              { label: "Press & Media", to: "/" },
              { label: "Blog", to: "/" },
            ]
          },
          {
            title: "Support",
            links: [
              { label: "Help Center", to: "/" },
              { label: "Returns Policy", to: "/" },
              { label: "Track Order", to: "/track-order" },
              { label: "My Profile", to: "/profile" },
            ]
          },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-display font-black text-white text-sm uppercase tracking-widest mb-5">{col.title}</h4>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block hover:duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground font-black uppercase tracking-widest">
          © 2026 VK Group Company. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(item => (
            <button key={item} className="text-[10px] text-muted-foreground/50 hover:text-muted-foreground transition-colors uppercase tracking-widest font-bold">
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

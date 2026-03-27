"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteData } from "@/lib/data";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-stone-900/95 backdrop-blur-md shadow-lg"
          : "bg-stone-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-amber-500 rounded-sm flex items-center justify-center group-hover:bg-amber-400 transition-colors">
                <Zap className="w-7 h-7 text-stone-900" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <span className="text-2xl font-display text-white tracking-wide">
                MR. WISE
              </span>
              <span className="block text-xs text-amber-500 font-medium tracking-widest">
                ELECTRIC
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-stone-300 hover:text-white font-medium transition-colors group"
              >
                {item.label}
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            {/* Phone - always visible */}
            <a
              href={`tel:${siteData.phone}`}
              className="flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span className="hidden md:inline font-semibold">
                {siteData.phone}
              </span>
            </a>

            {/* Estimate Button - hidden on mobile */}
            <Button
              asChild
              className="hidden sm:inline-flex bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold uppercase tracking-wide"
            >
              <Link href="/contact">Free Estimate</Link>
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-white hover:text-amber-500 transition-colors"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
              <span className="sr-only">Toggle menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-stone-900 border-t border-stone-800 overflow-hidden"
          >
            <nav className="px-4 py-6 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-xl font-display text-white hover:text-amber-500 hover:bg-stone-800 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <div className="pt-6 border-t border-stone-800 space-y-4">
                <a
                  href={`tel:${siteData.phone}`}
                  className="flex items-center gap-3 px-4 py-3 bg-stone-800 rounded-lg"
                >
                  <Phone className="w-5 h-5 text-amber-500" />
                  <span className="text-white font-semibold">
                    {siteData.phone}
                  </span>
                </a>
                <Button
                  asChild
                  className="w-full bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold uppercase tracking-wide h-12"
                >
                  <Link href="/contact" onClick={() => setMobileOpen(false)}>
                    Get Free Estimate
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

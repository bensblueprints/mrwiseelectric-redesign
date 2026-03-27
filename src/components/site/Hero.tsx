"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, ArrowRight, Shield, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteData } from "@/lib/data";
import { CountUp } from "./CountUp";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-900"
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-bg-3.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/90 to-stone-900/70" />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </motion.div>

      {/* Diagonal Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stone-50 to-transparent z-10" />
      <div className="absolute -bottom-1 left-0 right-0">
        <svg viewBox="0 0 1440 100" className="w-full h-auto">
          <path
            fill="#FAFAF9"
            d="M0,100 L0,60 C360,100 720,20 1080,60 C1260,80 1380,40 1440,60 L1440,100 Z"
          />
        </svg>
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-40"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6"
            >
              <Shield className="w-4 h-4 text-amber-500" />
              <span className="text-amber-500 text-sm font-medium">
                Licensed & Insured Since 1989
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-display text-white leading-none mb-6"
            >
              ATLANTA'S MOST
              <span className="block text-amber-500">TRUSTED ELECTRICIAN</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-stone-300 mb-8 max-w-xl"
            >
              Professional residential and commercial electrical services.
              From panel upgrades to complete rewiring, we deliver expert quality
              work backed by over four decades of experience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold uppercase tracking-wide h-14 px-8 text-lg group"
              >
                <Link href="/contact">
                  Get Free Estimate
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-stone-900 font-bold uppercase tracking-wide h-14 px-8 text-lg"
              >
                <a href={`tel:${siteData.phone}`}>
                  <Phone className="mr-2 w-5 h-5" />
                  {siteData.phone}
                </a>
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-6 mt-10 pt-10 border-t border-stone-700"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                <span className="text-stone-400 text-sm">Same-Day Service</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-500" />
                <span className="text-stone-400 text-sm">1-Year Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span className="text-stone-400 text-sm">5-Star Rated</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-6">
              <StatCard
                value={42}
                suffix="+"
                label="Years of Experience"
                delay={0.6}
              />
              <StatCard
                value={10000}
                suffix="+"
                label="Jobs Completed"
                delay={0.7}
              />
              <StatCard
                value={100}
                suffix="%"
                label="Licensed & Insured"
                delay={0.8}
              />
              <StatCard
                value={7}
                suffix="/7"
                label="Days Available"
                delay={0.9}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function StatCard({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 100 }}
      className="bg-stone-800/50 backdrop-blur-sm border border-stone-700 rounded-xl p-6 hover:border-amber-500/50 transition-colors group"
    >
      <div className="flex items-baseline gap-1">
        <span className="text-5xl font-display text-amber-500 group-hover:scale-110 transition-transform origin-left">
          <CountUp end={value} duration={2} delay={delay} />
        </span>
        <span className="text-3xl font-display text-amber-500">{suffix}</span>
      </div>
      <p className="text-stone-400 mt-2">{label}</p>
    </motion.div>
  );
}

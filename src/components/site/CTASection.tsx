"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, ArrowRight, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteData } from "@/lib/data";

export function CTASection() {
  return (
    <section className="py-24 bg-amber-500 relative overflow-hidden">
      {/* Diagonal Lines Pattern */}
      <div className="absolute inset-0 diagonal-lines opacity-50" />

      {/* Decorative Elements */}
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -right-32 -top-32 w-96 h-96 border-[40px] border-amber-400/30 rounded-full"
      />
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -left-32 -bottom-32 w-64 h-64 border-[30px] border-amber-600/20 rounded-full"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-stone-900 rounded-2xl mb-8"
          >
            <Zap className="w-10 h-10 text-amber-500" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display text-stone-900 mb-4"
          >
            NEED ELECTRICAL HELP TODAY?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-stone-800 max-w-2xl mx-auto mb-10"
          >
            Our mobile units are strategically located across Atlanta for rapid
            response times. Call now for same-day service or get a free estimate.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-stone-900 hover:bg-stone-800 text-white font-bold uppercase tracking-wide h-16 px-10 text-lg"
            >
              <a href={`tel:${siteData.phone}`}>
                <Phone className="mr-3 w-6 h-6" />
                Call {siteData.phone}
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white font-bold uppercase tracking-wide h-16 px-10 text-lg"
            >
              <Link href="/contact">
                Get Free Estimate
                <ArrowRight className="ml-3 w-6 h-6" />
              </Link>
            </Button>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 mt-12"
          >
            <div className="flex items-center gap-2 text-stone-800">
              <Clock className="w-5 h-5" />
              <span>Mon-Fri: {siteData.business_hours.weekdays}</span>
            </div>
            <div className="flex items-center gap-2 text-stone-800">
              <Clock className="w-5 h-5" />
              <span>Sat-Sun: {siteData.business_hours.weekends}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

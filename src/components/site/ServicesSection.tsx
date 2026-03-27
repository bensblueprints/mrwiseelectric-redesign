"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Building2, CircuitBoard, Cable, Lightbulb, Wrench, ArrowRight } from "lucide-react";
import { services } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  home: Home,
  building: Building2,
  "circuit-board": CircuitBoard,
  cable: Cable,
  lightbulb: Lightbulb,
  wrench: Wrench,
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export function ServicesSection() {
  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-amber-600 font-medium uppercase tracking-widest text-sm">
            What We Do
          </span>
          <h2 className="text-4xl sm:text-5xl font-display text-stone-900 mt-2">
            OUR ELECTRICAL SERVICES
          </h2>
          <p className="text-stone-600 mt-4 max-w-2xl mx-auto text-lg">
            Comprehensive electrical solutions for homes and businesses throughout
            the Atlanta metro area, backed by 42+ years of expertise.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Wrench;
            return (
              <motion.div
                key={service.slug}
                variants={itemVariants}
                className="group"
              >
                <Link href={`/services/${service.slug}`}>
                  <div className="relative bg-white rounded-xl p-8 h-full border border-stone-200 hover:border-amber-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    {/* Amber accent bar */}
                    <div className="absolute left-0 top-8 bottom-8 w-1 bg-amber-500 rounded-r opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-stone-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 transition-colors">
                        <Icon className="w-7 h-7 text-amber-600 group-hover:text-stone-900 transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-display text-stone-900 mb-2 group-hover:text-amber-600 transition-colors">
                          {service.name.toUpperCase()}
                        </h3>
                        <p className="text-stone-600 text-sm leading-relaxed">
                          {service.short_description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center text-amber-600 font-medium text-sm">
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-stone-900 font-semibold hover:text-amber-600 transition-colors"
          >
            View All Services
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

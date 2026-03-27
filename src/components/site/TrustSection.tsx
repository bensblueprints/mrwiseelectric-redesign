"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  "42+ years of trusted experience in Atlanta",
  "Fully licensed and insured professionals",
  "Same-day emergency service available",
  "Premium quality materials on every job",
  "1-year warranty on all installations",
  "Transparent, upfront pricing",
  "Mobile units for rapid response times",
  "Free phone consultations",
];

export function TrustSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/work-image-1.jpg"
                alt="Mr. Wise Electric professional at work"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-8 -right-8 bg-amber-500 rounded-xl p-6 shadow-xl"
            >
              <div className="text-stone-900">
                <span className="text-5xl font-display">42+</span>
                <p className="font-medium mt-1">Years Serving Atlanta</p>
              </div>
            </motion.div>

            {/* Background accent */}
            <div className="absolute -z-10 -top-4 -left-4 w-full h-full bg-stone-100 rounded-2xl" />
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-amber-600 font-medium uppercase tracking-widest text-sm">
              Why Choose Us
            </span>
            <h2 className="text-4xl sm:text-5xl font-display text-stone-900 mt-2 mb-6">
              EXPERIENCE YOU CAN TRUST
            </h2>
            <p className="text-stone-600 text-lg mb-8">
              Since 1989, Mr. Wise Electric has been the go-to electrical contractor
              for Atlanta homeowners and businesses. We&apos;ve built our reputation on
              quality workmanship, honest pricing, and reliable service that our
              community can depend on.
            </p>

            {/* Feature List */}
            <ul className="grid sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span className="text-stone-700">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <Button
              asChild
              size="lg"
              className="bg-stone-900 hover:bg-stone-800 text-white font-bold uppercase tracking-wide h-14 px-8"
            >
              <Link href="/about">
                Learn More About Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

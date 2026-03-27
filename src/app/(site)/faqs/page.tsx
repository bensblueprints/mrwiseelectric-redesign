"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Phone, ArrowRight } from "lucide-react";
import { faqs, siteData } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-amber-500 font-medium uppercase tracking-widest text-sm">
              Questions & Answers
            </span>
            <h1 className="text-5xl sm:text-6xl font-display text-white mt-2 mb-6">
              FREQUENTLY ASKED QUESTIONS
            </h1>
            <p className="text-xl text-stone-300">
              Find answers to common electrical questions. Can&apos;t find what
              you&apos;re looking for? Give us a call.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-stone-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-stone-900 pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-500 flex-shrink-0 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="border-t border-stone-100 pt-4">
                          <p className="text-stone-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200">
              <h2 className="text-2xl font-display text-stone-900 mb-4">
                STILL HAVE QUESTIONS?
              </h2>
              <p className="text-stone-600 mb-6">
                Our team is here to help. Give us a call or send us a message.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold uppercase tracking-wide"
                >
                  <a href={`tel:${siteData.phone}`}>
                    <Phone className="mr-2 w-5 h-5" />
                    {siteData.phone}
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white font-bold uppercase tracking-wide"
                >
                  <Link href="/contact">
                    Contact Us
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

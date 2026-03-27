import { Metadata } from "next";
import Link from "next/link";
import { Home, Building2, CircuitBoard, Cable, Lightbulb, Wrench, ArrowRight, Phone } from "lucide-react";
import { services, siteData } from "@/lib/data";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Our Electrical Services",
  description:
    "Comprehensive residential and commercial electrical services in Atlanta. Panel upgrades, wiring, lighting, troubleshooting, and more. 42+ years of experience.",
};

const iconMap: Record<string, React.ElementType> = {
  home: Home,
  building: Building2,
  "circuit-board": CircuitBoard,
  cable: Cable,
  lightbulb: Lightbulb,
  wrench: Wrench,
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-amber-500 font-medium uppercase tracking-widest text-sm">
              What We Do
            </span>
            <h1 className="text-5xl sm:text-6xl font-display text-white mt-2 mb-6">
              OUR ELECTRICAL SERVICES
            </h1>
            <p className="text-xl text-stone-300">
              Comprehensive electrical solutions for homes and businesses
              throughout the Atlanta metro area. From simple repairs to complete
              rewiring, we have the expertise to handle any project.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || Wrench;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-8 h-full border border-stone-200 hover:border-amber-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-stone-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 transition-colors">
                        <Icon className="w-8 h-8 text-amber-600 group-hover:text-stone-900 transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-display text-stone-900 mb-3 group-hover:text-amber-600 transition-colors">
                          {service.name.toUpperCase()}
                        </h2>
                        <p className="text-stone-600 mb-4">
                          {service.short_description}
                        </p>
                        <p className="text-stone-500 text-sm leading-relaxed">
                          {service.full_description.slice(0, 200)}...
                        </p>
                        <div className="mt-6 flex items-center text-amber-600 font-medium">
                          <span>Learn more</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-display text-stone-900">
                READY TO GET STARTED?
              </h2>
              <p className="text-stone-800 mt-2">
                Call now for a free estimate on your electrical project.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-stone-900 hover:bg-stone-800 text-white font-bold uppercase tracking-wide h-14 px-8"
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
                className="border-2 border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white font-bold uppercase tracking-wide h-14 px-8"
              >
                <Link href="/contact">Request Estimate</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

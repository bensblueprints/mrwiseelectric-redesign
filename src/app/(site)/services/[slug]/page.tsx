import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Home, Building2, CircuitBoard, Cable, Lightbulb, Wrench, ArrowRight, Phone, CheckCircle2, ArrowLeft } from "lucide-react";
import { services, siteData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/site";

const iconMap: Record<string, React.ElementType> = {
  home: Home,
  building: Building2,
  "circuit-board": CircuitBoard,
  cable: Cable,
  lightbulb: Lightbulb,
  wrench: Wrench,
};

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.name,
    description: service.short_description,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const Icon = iconMap[service.icon] || Wrench;
  const relatedServices = services.filter((s) => s.slug !== slug).slice(0, 3);

  const benefits = [
    "Licensed and insured professionals",
    "42+ years of experience",
    "Quality materials guaranteed",
    "1-year warranty on all work",
    "Same-day service available",
    "Competitive, upfront pricing",
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center text-stone-400 hover:text-amber-500 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            All Services
          </Link>

          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon className="w-10 h-10 text-stone-900" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-display text-white mb-4">
                {service.name.toUpperCase()}
              </h1>
              <p className="text-xl text-stone-300 max-w-2xl">
                {service.short_description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 border border-stone-200">
                <h2 className="text-2xl font-display text-stone-900 mb-6">
                  ABOUT THIS SERVICE
                </h2>
                <p className="text-stone-600 text-lg leading-relaxed mb-8">
                  {service.full_description}
                </p>

                <h3 className="text-xl font-display text-stone-900 mb-4">
                  WHY CHOOSE MR. WISE ELECTRIC
                </h3>
                <ul className="grid sm:grid-cols-2 gap-4 mb-8">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span className="text-stone-700">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-stone-200 pt-8">
                  <h3 className="text-xl font-display text-stone-900 mb-4">
                    READY TO GET STARTED?
                  </h3>
                  <p className="text-stone-600 mb-6">
                    Contact us today for a free estimate on your {service.name.toLowerCase()} project.
                    We&apos;ll assess your needs and provide transparent, competitive pricing.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      asChild
                      size="lg"
                      className="bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold uppercase tracking-wide"
                    >
                      <a href={`tel:${siteData.phone}`}>
                        <Phone className="mr-2 w-5 h-5" />
                        Call {siteData.phone}
                      </a>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-2 border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white font-bold uppercase tracking-wide"
                    >
                      <Link href="/contact">Request Estimate</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Related Services */}
              <div className="mt-12">
                <h3 className="text-xl font-display text-stone-900 mb-6">
                  RELATED SERVICES
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {relatedServices.map((related) => {
                    const RelatedIcon = iconMap[related.icon] || Wrench;
                    return (
                      <Link
                        key={related.slug}
                        href={`/services/${related.slug}`}
                        className="group bg-white rounded-xl p-6 border border-stone-200 hover:border-amber-500 transition-all"
                      >
                        <RelatedIcon className="w-8 h-8 text-amber-600 mb-3" />
                        <h4 className="font-display text-stone-900 group-hover:text-amber-600 transition-colors">
                          {related.name.toUpperCase()}
                        </h4>
                        <ArrowRight className="w-4 h-4 text-amber-500 mt-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar - Contact Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="bg-white rounded-2xl p-6 border border-stone-200">
                  <h3 className="text-xl font-display text-stone-900 mb-4">
                    GET A FREE ESTIMATE
                  </h3>
                  <p className="text-stone-600 text-sm mb-6">
                    Fill out the form below and we&apos;ll get back to you within 2 hours.
                  </p>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

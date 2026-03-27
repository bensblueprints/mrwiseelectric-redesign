import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Phone,
  MapPin,
  Clock,
  Shield,
  CheckCircle,
  Zap,
  Home,
  Building,
  Wrench,
  Lightbulb,
  ArrowRight,
  Star,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  serviceAreasData,
  getServiceAreaBySlug,
  getAllServiceAreaSlugs,
} from "@/lib/service-areas-data";
import { services, siteData } from "@/lib/data";

interface Props {
  params: Promise<{ city: string; service: string }>;
}

// Generate all combinations of city + service
export async function generateStaticParams() {
  const cities = getAllServiceAreaSlugs();
  const serviceSlugs = services.map((s) => s.slug);

  const params = [];
  for (const city of cities) {
    for (const service of serviceSlugs) {
      params.push({ city, service });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, service } = await params;
  const area = getServiceAreaBySlug(city);
  const serviceData = services.find((s) => s.slug === service);

  if (!area || !serviceData) {
    return { title: "Service Not Found" };
  }

  const title = `${serviceData.name} in ${area.name}, GA | Mr. Wise Electric`;
  const description = `Professional ${serviceData.name.toLowerCase()} services in ${area.name}, Georgia. ${serviceData.short_description} Licensed electrician with 42+ years experience. Call 404-671-9488 for a free estimate.`;

  return {
    title,
    description,
    keywords: [
      `${serviceData.name.toLowerCase()} ${area.name}`,
      `${service.replace(/-/g, " ")} ${area.name} GA`,
      `electrician ${area.name}`,
      `${area.name} electrical services`,
      `licensed electrician ${area.county} County`,
      `${serviceData.name.toLowerCase()} near me`,
    ],
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_US",
      siteName: "Mr. Wise Electric",
      url: `https://mrwiseelectric.com/service-areas/${area.slug}/${serviceData.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://mrwiseelectric.com/service-areas/${area.slug}/${serviceData.slug}`,
    },
  };
}

function getServiceIcon(iconName: string) {
  const icons: Record<string, React.ReactNode> = {
    home: <Home className="w-8 h-8" />,
    building: <Building className="w-8 h-8" />,
    "circuit-board": <Zap className="w-8 h-8" />,
    cable: <Zap className="w-8 h-8" />,
    lightbulb: <Lightbulb className="w-8 h-8" />,
    wrench: <Wrench className="w-8 h-8" />,
  };
  return icons[iconName] || <Zap className="w-8 h-8" />;
}

// Service-specific benefits for each type
const serviceSpecificContent: Record<
  string,
  { benefits: string[]; processSteps: string[] }
> = {
  "residential-electrical": {
    benefits: [
      "Complete home electrical system assessment",
      "Code-compliant installations and upgrades",
      "Energy-efficient solutions to reduce bills",
      "Child-safe outlet and switch installations",
      "Whole-home surge protection",
    ],
    processSteps: [
      "Free in-home consultation and estimate",
      "Detailed scope of work and pricing",
      "Professional installation by licensed electricians",
      "Final inspection and code compliance verification",
      "Cleanup and walkthrough with homeowner",
    ],
  },
  "commercial-electrical": {
    benefits: [
      "Minimize business downtime with efficient service",
      "3-phase power distribution expertise",
      "Commercial lighting design and installation",
      "Emergency backup power solutions",
      "Tenant improvement electrical work",
    ],
    processSteps: [
      "Site assessment and load calculation",
      "Detailed commercial bid and timeline",
      "Coordinated installation around business hours",
      "Code inspection and documentation",
      "Training and system handover",
    ],
  },
  "electrical-panels": {
    benefits: [
      "Upgrade from 100A to 200A or 400A service",
      "Replace dangerous Federal Pacific or Zinsco panels",
      "Add circuits for new appliances or additions",
      "Proper grounding and bonding",
      "Surge protection integration",
    ],
    processSteps: [
      "Panel inspection and load analysis",
      "Permit acquisition and utility coordination",
      "Safe disconnection and panel replacement",
      "Circuit labeling and documentation",
      "Final inspection approval",
    ],
  },
  "wiring-services": {
    benefits: [
      "Replace dangerous knob-and-tube wiring",
      "Upgrade aluminum wiring connections",
      "Add dedicated circuits for heavy appliances",
      "Whole-home rewiring with minimal disruption",
      "Future-proof wiring for smart home systems",
    ],
    processSteps: [
      "Wiring assessment and scope planning",
      "Strategic access point planning",
      "Section-by-section rewiring",
      "Patch and repair coordination",
      "Testing and certification",
    ],
  },
  lighting: {
    benefits: [
      "Recessed lighting design and installation",
      "Dimmer switch conversions for any room",
      "LED retrofits for energy savings",
      "Landscape and security lighting",
      "Ceiling fan installation with proper support",
    ],
    processSteps: [
      "Lighting design consultation",
      "Fixture selection guidance",
      "Professional installation with proper circuits",
      "Dimmer and control programming",
      "Fixture adjustment and cleanup",
    ],
  },
  troubleshooting: {
    benefits: [
      "Same-day emergency response available",
      "Accurate diagnosis prevents repeat issues",
      "Transparent pricing before work begins",
      "Safety hazard identification and correction",
      "Preventive maintenance recommendations",
    ],
    processSteps: [
      "Symptom assessment and initial testing",
      "Systematic troubleshooting protocol",
      "Root cause identification",
      "Repair options and pricing",
      "Fix and verify with testing",
    ],
  },
};

export default async function LocationServicePage({ params }: Props) {
  const { city, service } = await params;
  const area = getServiceAreaBySlug(city);
  const serviceData = services.find((s) => s.slug === service);

  if (!area || !serviceData) {
    notFound();
  }

  const content = serviceSpecificContent[service] || {
    benefits: [
      "Professional licensed electricians",
      "Quality workmanship guaranteed",
      "Competitive pricing",
      "Timely service completion",
      "Full warranty coverage",
    ],
    processSteps: [
      "Initial consultation",
      "Detailed estimate",
      "Professional installation",
      "Quality inspection",
      "Final walkthrough",
    ],
  };

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://mrwiseelectric.com/service-areas/${area.slug}/${serviceData.slug}`,
    name: `${serviceData.name} in ${area.name}`,
    description: `Professional ${serviceData.name.toLowerCase()} services in ${area.name}, Georgia. ${serviceData.full_description}`,
    provider: {
      "@type": "LocalBusiness",
      name: "Mr. Wise Electric",
      telephone: siteData.phone,
      email: siteData.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "141 Harlan Rd SW",
        addressLocality: "Atlanta",
        addressRegion: "GA",
        postalCode: "30311",
        addressCountry: "US",
      },
    },
    areaServed: {
      "@type": "City",
      name: area.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: `${area.county} County, Georgia`,
      },
    },
    serviceType: serviceData.name,
  };

  const otherServices = services.filter((s) => s.slug !== service);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-stone-900 py-20 lg:py-28 overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${area.heroImage})`,
            }}
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-stone-900/85" />
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 20px,
                  #F59E0B 20px,
                  #F59E0B 22px
                )`,
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Breadcrumb */}
              <nav className="flex justify-center items-center gap-2 text-sm text-stone-400 mb-6 flex-wrap">
                <Link href="/" className="hover:text-amber-500 transition-colors">
                  Home
                </Link>
                <span>/</span>
                <Link
                  href="/service-areas"
                  className="hover:text-amber-500 transition-colors"
                >
                  Service Areas
                </Link>
                <span>/</span>
                <Link
                  href={`/service-areas/${area.slug}`}
                  className="hover:text-amber-500 transition-colors"
                >
                  {area.name}
                </Link>
                <span>/</span>
                <span className="text-amber-500">{serviceData.name}</span>
              </nav>

              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2 mb-6">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span className="text-amber-500 font-medium text-sm">
                  Serving {area.name}, {area.county} County
                </span>
              </div>

              <div className="w-20 h-20 bg-amber-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-stone-900">
                  {getServiceIcon(serviceData.icon)}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-6">
                {serviceData.name.toUpperCase()} IN{" "}
                <span className="text-amber-500">{area.name.toUpperCase()}</span>
              </h1>

              <p className="text-xl text-stone-300 mb-8 max-w-3xl mx-auto">
                {serviceData.short_description} Professional, licensed
                electricians serving {area.name} and {area.county} County with
                42+ years of experience.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold text-lg px-8 py-6"
                >
                  <a href={`tel:${siteData.phone}`}>
                    <Phone className="w-5 h-5 mr-2" />
                    Call {siteData.phone}
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-stone-900 font-bold text-lg px-8 py-6"
                >
                  <Link href="/contact">Get Free Estimate</Link>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-6 mt-10">
                <div className="flex items-center gap-2 text-stone-400">
                  <Shield className="w-5 h-5 text-amber-500" />
                  <span>Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2 text-stone-400">
                  <Clock className="w-5 h-5 text-amber-500" />
                  <span>Same-Day Service</span>
                </div>
                <div className="flex items-center gap-2 text-stone-400">
                  <CheckCircle className="w-5 h-5 text-amber-500" />
                  <span>42+ Years Experience</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Details Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-display text-stone-900 mb-6">
                  {serviceData.name.toUpperCase()} SERVICES FOR {area.name.toUpperCase()}
                </h2>
                <p className="text-lg text-stone-600 mb-6">
                  {serviceData.full_description}
                </p>
                <p className="text-lg text-stone-600 mb-8">
                  Our team understands the unique electrical needs of {area.name}{" "}
                  properties. From {area.neighborhoods[0]} to{" "}
                  {area.neighborhoods[area.neighborhoods.length - 1]}, we provide
                  expert {serviceData.name.toLowerCase()} services tailored to
                  your specific requirements.
                </p>

                <div className="bg-stone-50 rounded-xl p-6">
                  <h3 className="font-display text-xl text-stone-900 mb-4">
                    SERVICE BENEFITS
                  </h3>
                  <ul className="space-y-3">
                    {content.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span className="text-stone-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <div className="bg-stone-900 rounded-xl p-8">
                  <h3 className="font-display text-2xl text-white mb-6">
                    OUR PROCESS
                  </h3>
                  <ol className="space-y-4">
                    {content.processSteps.map((step, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <span className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-stone-900 font-bold flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-stone-300 pt-1">{step}</span>
                      </li>
                    ))}
                  </ol>

                  <hr className="border-stone-700 my-6" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">Service Area</span>
                      <span className="text-white font-medium">{area.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">ZIP Codes</span>
                      <span className="text-white font-medium">
                        {area.zipCodes.slice(0, 3).join(", ")}
                        {area.zipCodes.length > 3 && "..."}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">Response Time</span>
                      <span className="text-amber-500 font-medium">
                        Same Day Available
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Contact Card */}
                <div className="mt-6 bg-amber-50 rounded-xl p-6 border border-amber-200">
                  <h4 className="font-display text-xl text-stone-900 mb-4">
                    READY TO GET STARTED?
                  </h4>
                  <p className="text-stone-600 mb-4">
                    Call now for a free estimate on your{" "}
                    {serviceData.name.toLowerCase()} project in {area.name}.
                  </p>
                  <Button
                    asChild
                    className="w-full bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold"
                  >
                    <a href={`tel:${siteData.phone}`}>
                      <Phone className="w-4 h-4 mr-2" />
                      {siteData.phone}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us for This Service */}
        <section className="py-16 lg:py-24 bg-stone-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display text-stone-900 mb-4">
                WHY CHOOSE MR. WISE FOR {serviceData.name.toUpperCase()}
              </h2>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                {area.name} residents trust us for quality electrical work and
                exceptional customer service.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-display text-xl text-stone-900 mb-2">
                  LICENSED & INSURED
                </h3>
                <p className="text-stone-600">
                  Fully licensed Georgia electrical contractor serving{" "}
                  {area.county} County.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-display text-xl text-stone-900 mb-2">
                  42+ YEARS EXPERIENCE
                </h3>
                <p className="text-stone-600">
                  Trusted {serviceData.name.toLowerCase()} expertise since 1989.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-display text-xl text-stone-900 mb-2">
                  5-STAR SERVICE
                </h3>
                <p className="text-stone-600">
                  Consistently rated excellent by {area.name} customers.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-display text-xl text-stone-900 mb-2">
                  WARRANTY GUARANTEED
                </h3>
                <p className="text-stone-600">
                  All {serviceData.name.toLowerCase()} work backed by warranty.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Other Services in This Area */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display text-stone-900 mb-4">
                OTHER SERVICES IN {area.name.toUpperCase()}
              </h2>
              <p className="text-lg text-stone-600">
                Complete electrical services for your {area.name} property
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherServices.map((otherService) => (
                <Link
                  key={otherService.slug}
                  href={`/service-areas/${area.slug}/${otherService.slug}`}
                  className="group bg-stone-50 rounded-xl p-6 hover:bg-stone-100 transition-colors border border-stone-200 hover:border-amber-300"
                >
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                    {getServiceIcon(otherService.icon)}
                  </div>
                  <h3 className="font-display text-xl text-stone-900 mb-2">
                    {otherService.name}
                  </h3>
                  <p className="text-stone-600 mb-4">
                    {otherService.short_description}
                  </p>
                  <span className="inline-flex items-center text-amber-600 font-medium group-hover:text-amber-700">
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-amber-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-display text-stone-900 mb-4">
              NEED {serviceData.name.toUpperCase()} IN {area.name.toUpperCase()}?
            </h2>
            <p className="text-xl text-stone-800 mb-8 max-w-2xl mx-auto">
              Call now for a free estimate. Our licensed electricians are ready
              to help with your {serviceData.name.toLowerCase()} needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-lg px-8 py-6"
              >
                <a href={`tel:${siteData.phone}`}>
                  <Phone className="w-5 h-5 mr-2" />
                  {siteData.phone}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white font-bold text-lg px-8 py-6"
              >
                <Link href="/contact">Request Free Estimate</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Back to Service Area */}
        <section className="py-8 bg-stone-100">
          <div className="container mx-auto px-4">
            <Link
              href={`/service-areas/${area.slug}`}
              className="inline-flex items-center text-stone-600 hover:text-amber-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to all {area.name} services
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  MapPin,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { serviceAreasData } from "@/lib/service-areas-data";
import { siteData } from "@/lib/data";

export const metadata: Metadata = {
  title: "Service Areas | Licensed Electrician in Atlanta Metro | Mr. Wise Electric",
  description:
    "Mr. Wise Electric serves 15+ cities across the Atlanta metro area including East Atlanta, Decatur, Sandy Springs, College Park, and more. Licensed residential & commercial electrician. Call 404-671-9488.",
  keywords: [
    "Atlanta electrician",
    "Georgia electrical contractor",
    "Metro Atlanta electrical services",
    "licensed electrician near me",
    "Atlanta area electrician",
    "Fulton County electrician",
    "DeKalb County electrician",
    "Cobb County electrician",
    "Henry County electrician",
  ],
  openGraph: {
    title: "Service Areas | Licensed Electrician in Atlanta Metro | Mr. Wise Electric",
    description:
      "Mr. Wise Electric serves 15+ cities across the Atlanta metro area. Licensed residential & commercial electrician with 42+ years experience.",
    type: "website",
    locale: "en_US",
    siteName: "Mr. Wise Electric",
    url: "https://mrwiseelectric.com/service-areas",
  },
  alternates: {
    canonical: "https://mrwiseelectric.com/service-areas",
  },
};

export default function ServiceAreasPage() {
  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Mr. Wise Electric",
    description:
      "Licensed electrician serving the greater Atlanta metro area with residential and commercial electrical services.",
    url: "https://mrwiseelectric.com/service-areas",
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
    areaServed: serviceAreasData.map((area) => ({
      "@type": "City",
      name: area.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: `${area.county} County, Georgia`,
      },
    })),
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "150",
    },
  };

  // Group areas by county
  const areasByCounty = serviceAreasData.reduce(
    (acc, area) => {
      const county = area.county;
      if (!acc[county]) {
        acc[county] = [];
      }
      acc[county].push(area);
      return acc;
    },
    {} as Record<string, typeof serviceAreasData>
  );

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
          {/* Background Pattern */}
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
              <nav className="flex justify-center items-center gap-2 text-sm text-stone-400 mb-6">
                <Link href="/" className="hover:text-amber-500 transition-colors">
                  Home
                </Link>
                <span>/</span>
                <span className="text-amber-500">Service Areas</span>
              </nav>

              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2 mb-6">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span className="text-amber-500 font-medium text-sm">
                  Serving 15+ Cities Across Metro Atlanta
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-6">
                AREAS WE <span className="text-amber-500">SERVE</span>
              </h1>

              <p className="text-xl text-stone-300 mb-8 max-w-3xl mx-auto">
                Licensed electrical services for homes and businesses throughout
                the Atlanta metro area. From East Atlanta to Sandy Springs, we
                bring 42+ years of experience to your neighborhood.
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
            </div>
          </div>
        </section>

        {/* Map Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2">
                <h2 className="text-3xl md:text-4xl font-display text-stone-900 mb-6">
                  METRO ATLANTA ELECTRICAL SERVICES
                </h2>
                <p className="text-lg text-stone-600 mb-6">
                  Mr. Wise Electric is proud to serve communities across Fulton,
                  DeKalb, Cobb, Clayton, and Henry counties. Whether you need
                  panel upgrades in East Atlanta, whole-home rewiring in Decatur,
                  or commercial electrical services in Sandy Springs, our licensed
                  electricians are ready to help.
                </p>
                <p className="text-lg text-stone-600 mb-8">
                  Click on any service area below to learn more about the specific
                  electrical services we offer in your neighborhood.
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-stone-50 rounded-lg p-4 text-center">
                    <p className="text-3xl font-display text-amber-500">15+</p>
                    <p className="text-sm text-stone-600">Cities Served</p>
                  </div>
                  <div className="bg-stone-50 rounded-lg p-4 text-center">
                    <p className="text-3xl font-display text-amber-500">5</p>
                    <p className="text-sm text-stone-600">Counties</p>
                  </div>
                  <div className="bg-stone-50 rounded-lg p-4 text-center">
                    <p className="text-3xl font-display text-amber-500">42+</p>
                    <p className="text-sm text-stone-600">Years Experience</p>
                  </div>
                  <div className="bg-stone-50 rounded-lg p-4 text-center">
                    <p className="text-3xl font-display text-amber-500">500K+</p>
                    <p className="text-sm text-stone-600">People Reached</p>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-stone-900 rounded-xl p-8">
                <h3 className="font-display text-2xl text-white mb-6">
                  WHY CHOOSE US
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-amber-500 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-white">Licensed & Insured</p>
                      <p className="text-sm text-stone-400">
                        Georgia licensed electrical contractor
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="w-6 h-6 text-amber-500 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-white">Same-Day Service</p>
                      <p className="text-sm text-stone-400">
                        Available 7 days a week
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-amber-500 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-white">Warranty Guaranteed</p>
                      <p className="text-sm text-stone-400">
                        All work backed by warranty
                      </p>
                    </div>
                  </li>
                </ul>

                <hr className="border-stone-700 my-6" />

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
        </section>

        {/* Service Areas by County */}
        <section className="py-16 lg:py-24 bg-stone-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display text-stone-900 mb-4">
                SERVICE AREAS BY COUNTY
              </h2>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                Select your area to learn about the specific electrical services
                and expertise we bring to your community.
              </p>
            </div>

            <div className="space-y-12">
              {Object.entries(areasByCounty).map(([county, areas]) => (
                <div key={county}>
                  <h3 className="text-2xl font-display text-stone-900 mb-6 flex items-center gap-3">
                    <span className="w-2 h-8 bg-amber-500 rounded-full" />
                    {county} COUNTY
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {areas.map((area) => (
                      <Link
                        key={area.slug}
                        href={`/service-areas/${area.slug}`}
                        className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border border-stone-200 hover:border-amber-300"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-display text-xl text-stone-900 group-hover:text-amber-600 transition-colors">
                              {area.name}
                            </h4>
                            <p className="text-sm text-stone-500">
                              Pop. {area.population}
                            </p>
                          </div>
                          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                            <MapPin className="w-5 h-5 text-amber-600 group-hover:text-white transition-colors" />
                          </div>
                        </div>

                        <p className="text-stone-600 text-sm mb-4 line-clamp-2">
                          {area.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {area.zipCodes.slice(0, 3).map((zip) => (
                            <span
                              key={zip}
                              className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded"
                            >
                              {zip}
                            </span>
                          ))}
                          {area.zipCodes.length > 3 && (
                            <span className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded">
                              +{area.zipCodes.length - 3} more
                            </span>
                          )}
                        </div>

                        <span className="inline-flex items-center text-amber-600 font-medium group-hover:text-amber-700">
                          View Services <ArrowRight className="w-4 h-4 ml-1" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-amber-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-display text-stone-900 mb-4">
              DON&apos;T SEE YOUR AREA?
            </h2>
            <p className="text-xl text-stone-800 mb-8 max-w-2xl mx-auto">
              We serve additional communities throughout the Atlanta metro area.
              Call us to discuss your electrical project and see if we can help.
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
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

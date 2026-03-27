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
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return getAllServiceAreaSlugs().map((slug) => ({ city: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const area = getServiceAreaBySlug(city);

  if (!area) {
    return { title: "Service Area Not Found" };
  }

  const title = `Electrician in ${area.name}, GA | Licensed Electrical Contractor | Mr. Wise Electric`;
  const description = `Need an electrician in ${area.name}? Mr. Wise Electric provides licensed residential & commercial electrical services. Panel upgrades, rewiring, repairs & more. 42+ years experience. Call 404-671-9488.`;

  return {
    title,
    description,
    keywords: [
      `electrician ${area.name}`,
      `electrical contractor ${area.name} GA`,
      `${area.name} electrician`,
      `electrical services ${area.name}`,
      `panel upgrade ${area.name}`,
      `electrical repair ${area.name}`,
      `licensed electrician ${area.county} County`,
      `emergency electrician ${area.name}`,
      `residential electrician ${area.name}`,
      `commercial electrician ${area.name}`,
    ],
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_US",
      siteName: "Mr. Wise Electric",
      url: `https://mrwiseelectric.com/service-areas/${area.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://mrwiseelectric.com/service-areas/${area.slug}`,
    },
  };
}

function getServiceIcon(iconName: string) {
  const icons: Record<string, React.ReactNode> = {
    home: <Home className="w-6 h-6" />,
    building: <Building className="w-6 h-6" />,
    "circuit-board": <Zap className="w-6 h-6" />,
    cable: <Zap className="w-6 h-6" />,
    lightbulb: <Lightbulb className="w-6 h-6" />,
    wrench: <Wrench className="w-6 h-6" />,
  };
  return icons[iconName] || <Zap className="w-6 h-6" />;
}

export default async function ServiceAreaPage({ params }: Props) {
  const { city } = await params;
  const area = getServiceAreaBySlug(city);

  if (!area) {
    notFound();
  }

  // JSON-LD structured data for local SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://mrwiseelectric.com/service-areas/${area.slug}`,
    name: "Mr. Wise Electric",
    description: `Licensed electrician serving ${area.name}, Georgia. Residential and commercial electrical services including panel upgrades, rewiring, repairs, and installations.`,
    url: `https://mrwiseelectric.com/service-areas/${area.slug}`,
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
    geo: {
      "@type": "GeoCoordinates",
      latitude: 33.749,
      longitude: -84.388,
    },
    areaServed: {
      "@type": "City",
      name: area.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: `${area.county} County, Georgia`,
      },
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "08:00",
        closes: "19:00",
      },
    ],
    priceRange: "$$",
    image: "https://mrwiseelectric.com/og-image.jpg",
    sameAs: [
      siteData.social_links.facebook,
      siteData.social_links.twitter,
      siteData.social_links.instagram,
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Electrical Services",
      itemListElement: services.map((service, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.short_description,
        },
        position: index + 1,
      })),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "150",
    },
  };

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
                <Link
                  href="/service-areas"
                  className="hover:text-amber-500 transition-colors"
                >
                  Service Areas
                </Link>
                <span>/</span>
                <span className="text-amber-500">{area.name}</span>
              </nav>

              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2 mb-6">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span className="text-amber-500 font-medium text-sm">
                  Serving {area.county} County
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-6">
                ELECTRICIAN IN{" "}
                <span className="text-amber-500">{area.name.toUpperCase()}</span>
              </h1>

              <p className="text-xl text-stone-300 mb-8 max-w-3xl mx-auto">
                Licensed and insured electrical services for {area.name} homes
                and businesses. 42+ years of trusted experience serving the
                Atlanta metro area.
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

        {/* About This Area */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-display text-stone-900 mb-6">
                  ELECTRICAL SERVICES IN {area.name.toUpperCase()}
                </h2>
                <p className="text-lg text-stone-600 mb-6">{area.description}</p>

                <div className="bg-stone-50 rounded-xl p-6 mb-6">
                  <h3 className="font-display text-xl text-stone-900 mb-4">
                    COMMON ELECTRICAL NEEDS IN {area.name.toUpperCase()}
                  </h3>
                  <ul className="space-y-3">
                    {area.electricalChallenges.map((challenge, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span className="text-stone-600">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-amber-50 rounded-lg p-4">
                    <p className="text-sm text-stone-500 mb-1">ZIP Codes Served</p>
                    <p className="font-bold text-stone-900">
                      {area.zipCodes.join(", ")}
                    </p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4">
                    <p className="text-sm text-stone-500 mb-1">Population</p>
                    <p className="font-bold text-stone-900">{area.population}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-stone-900 rounded-xl p-8">
                  <h3 className="font-display text-2xl text-white mb-6">
                    NEIGHBORHOODS WE SERVE
                  </h3>
                  <ul className="grid grid-cols-2 gap-3">
                    {area.neighborhoods.map((neighborhood, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-stone-300"
                      >
                        <MapPin className="w-4 h-4 text-amber-500" />
                        {neighborhood}
                      </li>
                    ))}
                  </ul>

                  <hr className="border-stone-700 my-6" />

                  <h3 className="font-display text-xl text-white mb-4">
                    LOCAL LANDMARKS
                  </h3>
                  <ul className="space-y-2">
                    {area.localLandmarks.map((landmark, index) => (
                      <li key={index} className="text-stone-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                        {landmark}
                      </li>
                    ))}
                  </ul>
                </div>

                {area.testimonialText && (
                  <div className="mt-6 bg-amber-50 rounded-xl p-6 border border-amber-100">
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-amber-500 fill-amber-500"
                        />
                      ))}
                    </div>
                    <p className="text-stone-700 italic mb-4">
                      &ldquo;{area.testimonialText}&rdquo;
                    </p>
                    <p className="font-bold text-stone-900">
                      {area.testimonialName}
                    </p>
                    <p className="text-sm text-stone-500">{area.name} Resident</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 lg:py-24 bg-stone-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display text-stone-900 mb-4">
                OUR SERVICES IN {area.name.toUpperCase()}
              </h2>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                Full-service electrical contractor providing residential and
                commercial services throughout {area.name} and {area.county}{" "}
                County.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border border-stone-200 hover:border-amber-300"
                >
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                    {getServiceIcon(service.icon)}
                  </div>
                  <h3 className="font-display text-xl text-stone-900 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-stone-600 mb-4">{service.short_description}</p>
                  <span className="inline-flex items-center text-amber-600 font-medium group-hover:text-amber-700">
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display text-stone-900 mb-4">
                WHY {area.name.toUpperCase()} TRUSTS MR. WISE ELECTRIC
              </h2>
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
                  Fully licensed Georgia electrical contractor with comprehensive
                  insurance coverage.
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
                  Serving Atlanta since 1989 with decades of residential and
                  commercial expertise.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-display text-xl text-stone-900 mb-2">
                  SAME-DAY SERVICE
                </h3>
                <p className="text-stone-600">
                  Emergency electrical service available 7 days a week with rapid
                  response times.
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
                  All work backed by at least a one-year warranty for your peace
                  of mind.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-amber-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-display text-stone-900 mb-4">
              NEED AN ELECTRICIAN IN {area.name.toUpperCase()}?
            </h2>
            <p className="text-xl text-stone-800 mb-8 max-w-2xl mx-auto">
              Call now for a free estimate. Our licensed electricians are ready
              to help with any residential or commercial electrical project.
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

        {/* Other Service Areas */}
        <section className="py-16 lg:py-24 bg-stone-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display text-white mb-4">
                OTHER AREAS WE SERVE
              </h2>
              <p className="text-stone-400">
                Mr. Wise Electric provides electrical services throughout the
                Atlanta metro area
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {serviceAreasData
                .filter((a) => a.slug !== area.slug)
                .map((otherArea) => (
                  <Link
                    key={otherArea.slug}
                    href={`/service-areas/${otherArea.slug}`}
                    className="bg-stone-800 hover:bg-stone-700 rounded-lg p-4 text-center transition-colors"
                  >
                    <span className="text-white font-medium">
                      {otherArea.name}
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

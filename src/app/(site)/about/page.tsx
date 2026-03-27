import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Shield, Clock, Award, Users, CheckCircle2, ArrowRight } from "lucide-react";
import { siteData, serviceAreas } from "@/lib/data";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Mr. Wise Electric - Atlanta's trusted electrical contractor since 1989. 42+ years of experience, licensed & insured, serving the greater Atlanta area.",
};

const milestones = [
  { year: "1989", event: "Mr. Wise Electric founded in Atlanta" },
  { year: "1995", event: "Expanded to commercial electrical services" },
  { year: "2005", event: "Launched mobile service units for faster response" },
  { year: "2015", event: "Celebrated 25+ years of service to Atlanta" },
  { year: "2024", event: "Over 10,000 jobs completed and counting" },
];

const values = [
  {
    icon: Shield,
    title: "Quality First",
    description:
      "We always use the best quality materials and tools that exist in the market. No shortcuts, no compromises.",
  },
  {
    icon: Clock,
    title: "Rapid Response",
    description:
      "Our strategically located mobile units ensure fast response times. Same-day service available for emergencies.",
  },
  {
    icon: Award,
    title: "Expert Workmanship",
    description:
      "42+ years of experience means we've seen it all. Our licensed professionals deliver expert solutions every time.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description:
      "We treat your home or business like our own. Honest assessments, transparent pricing, and respectful service.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-amber-500 font-medium uppercase tracking-widest text-sm">
              About Us
            </span>
            <h1 className="text-5xl sm:text-6xl font-display text-white mt-2 mb-6">
              42+ YEARS OF TRUSTED SERVICE
            </h1>
            <p className="text-xl text-stone-300">
              Since 1989, Mr. Wise Electric has been the go-to electrical contractor
              for Atlanta homeowners and businesses. We&apos;ve built our reputation on
              quality workmanship, honest pricing, and reliable service.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/work-image-1.jpg"
                  alt="Mr. Wise Electric team at work"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-amber-500 rounded-xl p-6 shadow-xl">
                <div className="text-stone-900">
                  <span className="text-5xl font-display">1989</span>
                  <p className="font-medium mt-1">Established</p>
                </div>
              </div>
              <div className="absolute -z-10 -top-4 -left-4 w-full h-full bg-stone-200 rounded-2xl" />
            </div>

            {/* Content */}
            <div>
              <h2 className="text-4xl font-display text-stone-900 mb-6">
                OUR STORY
              </h2>
              <div className="space-y-4 text-stone-600 text-lg">
                <p>
                  Mr. Wise Electric was founded in 1989 with a simple mission: provide
                  Atlanta with honest, reliable electrical services at fair prices.
                  What started as a one-person operation has grown into a trusted team
                  of licensed professionals serving residential and commercial clients
                  across the greater Atlanta metro area.
                </p>
                <p>
                  Over four decades, we&apos;ve completed over 10,000 jobs - from simple
                  outlet repairs to complete commercial installations. Our success is
                  built on the relationships we&apos;ve forged with our customers, many of
                  whom have trusted us with their electrical needs for generations.
                </p>
                <p>
                  Today, we operate mobile units strategically located throughout Atlanta,
                  ensuring rapid response times whether you&apos;re in South Fulton, College
                  Park, Decatur, or anywhere in between. When you call Mr. Wise Electric,
                  you&apos;re not just getting an electrician - you&apos;re getting 42+ years of
                  accumulated knowledge and expertise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-medium uppercase tracking-widest text-sm">
              Our Values
            </span>
            <h2 className="text-4xl font-display text-stone-900 mt-2">
              WHAT SETS US APART
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6"
              >
                <div className="w-16 h-16 bg-amber-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-stone-900" />
                </div>
                <h3 className="text-xl font-display text-stone-900 mb-2">
                  {value.title.toUpperCase()}
                </h3>
                <p className="text-stone-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-500 font-medium uppercase tracking-widest text-sm">
              Our History
            </span>
            <h2 className="text-4xl font-display text-white mt-2">
              MILESTONES
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex-shrink-0 w-20">
                  <span className="text-2xl font-display text-amber-500">
                    {milestone.year}
                  </span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-stone-700 pl-6 relative">
                  <div className="absolute left-0 top-1 w-3 h-3 bg-amber-500 rounded-full -translate-x-1/2" />
                  <p className="text-stone-300 text-lg">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-amber-600 font-medium uppercase tracking-widest text-sm">
                Coverage Area
              </span>
              <h2 className="text-4xl font-display text-stone-900 mt-2 mb-6">
                SERVING GREATER ATLANTA
              </h2>
              <p className="text-stone-600 text-lg mb-8">
                Our mobile units are strategically located across the Atlanta
                metropolitan area, ensuring rapid response times wherever you are.
                We proudly serve:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {serviceAreas.map((area, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span className="text-stone-700">{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-lg">
              <h3 className="text-2xl font-display text-stone-900 mb-6">
                CONTACT US TODAY
              </h3>
              <div className="space-y-4">
                <a
                  href={`tel:${siteData.phone}`}
                  className="flex items-center gap-4 p-4 bg-stone-50 rounded-xl hover:bg-amber-50 transition-colors"
                >
                  <Phone className="w-6 h-6 text-amber-600" />
                  <div>
                    <p className="text-sm text-stone-500">Phone</p>
                    <p className="text-stone-900 font-semibold">{siteData.phone}</p>
                  </div>
                </a>
                <a
                  href={`mailto:${siteData.email}`}
                  className="flex items-center gap-4 p-4 bg-stone-50 rounded-xl hover:bg-amber-50 transition-colors"
                >
                  <Mail className="w-6 h-6 text-amber-600" />
                  <div>
                    <p className="text-sm text-stone-500">Email</p>
                    <p className="text-stone-900 font-semibold">{siteData.email}</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-xl">
                  <MapPin className="w-6 h-6 text-amber-600" />
                  <div>
                    <p className="text-sm text-stone-500">Address</p>
                    <p className="text-stone-900 font-semibold">{siteData.address}</p>
                  </div>
                </div>
              </div>
              <Button
                asChild
                size="lg"
                className="w-full mt-6 bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold uppercase tracking-wide h-14"
              >
                <Link href="/contact">
                  Get a Free Estimate
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

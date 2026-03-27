import { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { siteData } from "@/lib/data";
import { ContactForm } from "@/components/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Mr. Wise Electric for a free estimate. Call 404-671-9488 or fill out our form. Serving Atlanta 7 days a week.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-amber-500 font-medium uppercase tracking-widest text-sm">
              Get In Touch
            </span>
            <h1 className="text-5xl sm:text-6xl font-display text-white mt-2 mb-6">
              CONTACT US
            </h1>
            <p className="text-xl text-stone-300">
              Ready to start your electrical project? Contact us for a free estimate.
              We typically respond within 2 hours during business hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-8 border border-stone-200 h-full">
                <h2 className="text-2xl font-display text-stone-900 mb-6">
                  CONTACT INFORMATION
                </h2>

                <div className="space-y-6">
                  <a
                    href={`tel:${siteData.phone}`}
                    className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-stone-900" />
                    </div>
                    <div>
                      <p className="text-sm text-stone-500">Call Us</p>
                      <p className="text-xl font-semibold text-stone-900 group-hover:text-amber-600 transition-colors">
                        {siteData.phone}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${siteData.email}`}
                    className="flex items-start gap-4 p-4 bg-stone-50 rounded-xl hover:bg-stone-100 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-stone-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-stone-700" />
                    </div>
                    <div>
                      <p className="text-sm text-stone-500">Email Us</p>
                      <p className="text-stone-900 font-semibold group-hover:text-amber-600 transition-colors">
                        {siteData.email}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-4 bg-stone-50 rounded-xl">
                    <div className="w-12 h-12 bg-stone-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-stone-700" />
                    </div>
                    <div>
                      <p className="text-sm text-stone-500">Location</p>
                      <p className="text-stone-900 font-semibold">
                        {siteData.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-stone-50 rounded-xl">
                    <div className="w-12 h-12 bg-stone-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-stone-700" />
                    </div>
                    <div>
                      <p className="text-sm text-stone-500">Business Hours</p>
                      <p className="text-stone-900 font-semibold">
                        Mon-Fri: {siteData.business_hours.weekdays}
                      </p>
                      <p className="text-stone-900 font-semibold">
                        Sat-Sun: {siteData.business_hours.weekends}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-stone-200">
                  <p className="text-sm text-stone-500 mb-4">Follow Us</p>
                  <div className="flex gap-3">
                    <a
                      href={siteData.social_links.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center hover:bg-amber-500 hover:text-stone-900 transition-colors"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a
                      href={siteData.social_links.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center hover:bg-amber-500 hover:text-stone-900 transition-colors"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a
                      href={siteData.social_links.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center hover:bg-amber-500 hover:text-stone-900 transition-colors"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 border border-stone-200">
                <h2 className="text-2xl font-display text-stone-900 mb-2">
                  GET A FREE ESTIMATE
                </h2>
                <p className="text-stone-600 mb-8">
                  Fill out the form below and we&apos;ll get back to you within 2 hours
                  during business hours.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 bg-stone-200 relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3320.1234567890123!2d-84.4567890!3d33.6789012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDQwJzQ0LjAiTiA4NMKwMjcnMjQuNCJX!5e0!3m2!1sen!2sus!4v1234567890123"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mr. Wise Electric Location"
        />
        <div className="absolute bottom-4 left-4 bg-white rounded-xl p-4 shadow-lg">
          <p className="font-display text-stone-900">MR. WISE ELECTRIC</p>
          <p className="text-sm text-stone-600">{siteData.address}</p>
        </div>
      </section>
    </>
  );
}

import { Service, FAQ, Testimonial, SiteData } from "@/types";

export const services: Service[] = [
  {
    name: "Residential Electrical Work",
    slug: "residential-electrical",
    short_description: "Complete home electrical services from panel upgrades to outlet installation.",
    full_description: "Our residential services include main electric service upgrades, panel installation, electric meter base installation, riser installation, grounding electrode with rods, single-phase powered breaker box panels, wiring devices, circuit breaker panels, outlets, switches, lighting, dimmer switches, and recessed lighting.",
    icon: "home"
  },
  {
    name: "Commercial Electrical Work",
    slug: "commercial-electrical",
    short_description: "Industrial and commercial electrical solutions for businesses of all sizes.",
    full_description: "EMT electrical conduit installation for 3-phase power machinery and compressors, cord-dropped twist-lock receptacles and plugs installation, power supply connections, circuit breaker panel installation for production lines, lighting and receptacle connections, transformer installation (480 volts to 120/208 volts conversion), and 3-phase power distribution systems.",
    icon: "building"
  },
  {
    name: "Electrical Panel Services",
    slug: "electrical-panels",
    short_description: "Panel upgrades, replacements, and circuit breaker services.",
    full_description: "Circuit assessment, panel upgrades, main breaker replacements, code compliance inspections, and troubleshooting for both single-phase and three-phase systems. We handle everything from 100-amp residential panels to industrial 3-phase distribution.",
    icon: "circuit-board"
  },
  {
    name: "Wiring & Rewiring",
    slug: "wiring-services",
    short_description: "New construction wiring and whole-home rewiring for older homes.",
    full_description: "NM/NMB cable installation for residential, Metal Clad/EMT conduit for commercial, circuit analysis including capacitance, inductance, and impedance, old wiring upgrades, and code-compliant installations. All work backed by at least one year warranty.",
    icon: "cable"
  },
  {
    name: "Lighting Installation",
    slug: "lighting",
    short_description: "Indoor and outdoor lighting installation and upgrades.",
    full_description: "Recessed lighting, dimmer switches, ceiling fans (with proper fan-rated junction boxes), exterior lighting, and LED upgrades. We ensure proper circuit capacity and junction box ratings for all installations.",
    icon: "lightbulb"
  },
  {
    name: "Troubleshooting & Repairs",
    slug: "troubleshooting",
    short_description: "Emergency electrical repairs and diagnostic services.",
    full_description: "Same-day service for electrical emergencies, circuit breaker troubleshooting, flickering light diagnosis, outlet and switch repairs, and hazard detection including double-tap inspections. Our mobile units ensure rapid response times.",
    icon: "wrench"
  }
];

export const faqs: FAQ[] = [
  {
    question: "Can one circuit power multiple portable space heaters?",
    answer: "In most cases, no. Many portable heaters require more of the capacity of a circuit than is safely available when shared with other devices."
  },
  {
    question: "Can a standard light fixture junction box support a ceiling fan?",
    answer: "Ceiling fans are required to be installed using a special fan-rated junction box only. Standard junction boxes are not rated for the weight and vibration of ceiling fans."
  },
  {
    question: "How do I restore power after a tripped circuit breaker?",
    answer: "You would have to turn the circuit breaker to the off position first, before you could turn it back on. This resets the breaker mechanism."
  },
  {
    question: "What should I do if lights flicker between bright and dim?",
    answer: "We recommend that you turn them off at the circuit breaker. It's safer. Immediately contact a licensed electrician and the electric power company as this could indicate a serious electrical issue."
  },
  {
    question: "Does the electric company replace meter bases and service entrance wiring?",
    answer: "No. Electric meter bases, service entrance wiring, and interior wiring are jobs that must be performed by a licensed and insured electrical contractor or company."
  },
  {
    question: "Do you offer emergency electrical services?",
    answer: "Yes! We have mobile units strategically located across Atlanta for rapid response. We're available 7 days a week with same-day service for urgent electrical issues."
  },
  {
    question: "What areas do you serve?",
    answer: "We serve the entire Atlanta metro area including East Atlanta, Southwest Atlanta, South Fulton, Fairburn, College Park, Mableton, Union City, Stockbridge, McDonough, East Point, Decatur, and Sandy Springs."
  },
  {
    question: "Are you licensed and insured?",
    answer: "Absolutely. Mr. Wise Electric is fully licensed and insured. We've been serving Atlanta for over 42 years and maintain all required certifications and insurance coverage."
  }
];

export const testimonials: Testimonial[] = [
  {
    name: "Michael Johnson",
    location: "South Fulton, GA",
    text: "Mr. Wise Electric upgraded our entire panel in one day. Professional, clean work, and fair pricing. 42 years of experience really shows.",
    rating: 5
  },
  {
    name: "Sarah Williams",
    location: "College Park, GA",
    text: "Had an emergency with flickering lights late evening. They came out first thing the next morning and fixed the issue quickly. Highly recommend!",
    rating: 5
  },
  {
    name: "Robert Davis",
    location: "East Atlanta",
    text: "We've used Mr. Wise for both our home and our small business. Always reliable, always honest. They explain everything clearly.",
    rating: 5
  },
  {
    name: "Jennifer Martinez",
    location: "Mableton, GA",
    text: "Best electrician in Atlanta. Period. They rewired our 1960s home and it was a huge job. Done on time, on budget. Can't say enough good things.",
    rating: 5
  }
];

export const serviceAreas = [
  "East Atlanta",
  "West Side Atlanta",
  "Southwest Atlanta",
  "City of South Fulton",
  "Fairburn",
  "College Park",
  "Mableton",
  "Union City",
  "Stockbridge",
  "McDonough",
  "East Point",
  "West Midtown Atlanta",
  "Atlanta Northwest",
  "Decatur",
  "Sandy Springs"
];

export const siteData: SiteData = {
  business_name: "Mr. Wise Electric",
  tagline: "Serving Atlanta for 42+ Years",
  phone: "404-671-9488",
  email: "info@mrwiseelectric.com",
  address: "141 Harlan Rd SW, Atlanta, Georgia 30311",
  years_in_business: 42,
  services,
  faqs,
  business_hours: {
    weekdays: "7:00 AM - 7:00 PM",
    weekends: "8:00 AM - 7:00 PM"
  },
  service_areas: serviceAreas,
  social_links: {
    facebook: "https://facebook.com/Mr-Wise-Electric-397488437295534/",
    twitter: "https://twitter.com/mrwiseelectric",
    instagram: "https://instagram.com/misterwise/"
  }
};

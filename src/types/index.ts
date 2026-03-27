export interface Service {
  name: string;
  slug: string;
  short_description: string;
  full_description: string;
  icon: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  location?: string;
  text: string;
  rating: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service?: string;
  message: string;
}

export interface BusinessHours {
  weekdays: string;
  weekends: string;
}

export interface SocialLinks {
  facebook: string;
  twitter: string;
  instagram: string;
}

export interface SiteData {
  business_name: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  years_in_business: number;
  services: Service[];
  faqs: FAQ[];
  business_hours: BusinessHours;
  service_areas: string[];
  social_links: SocialLinks;
}

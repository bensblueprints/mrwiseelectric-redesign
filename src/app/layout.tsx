import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mr. Wise Electric | Atlanta's Trusted Electrician Since 1989",
    template: "%s | Mr. Wise Electric",
  },
  description:
    "Professional residential and commercial electrical services in Atlanta. 42+ years of experience, licensed & insured. Same-day service available. Call 404-671-9488.",
  keywords: [
    "electrician Atlanta",
    "electrical contractor Atlanta",
    "residential electrician",
    "commercial electrician",
    "panel upgrade Atlanta",
    "electrical wiring Atlanta",
    "Mr Wise Electric",
  ],
  authors: [{ name: "Mr. Wise Electric" }],
  creator: "Mr. Wise Electric",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mrwiseelectric.com",
    siteName: "Mr. Wise Electric",
    title: "Mr. Wise Electric | Atlanta's Trusted Electrician Since 1989",
    description:
      "Professional residential and commercial electrical services in Atlanta. 42+ years of experience.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mr. Wise Electric | Atlanta's Trusted Electrician",
    description:
      "Professional residential and commercial electrical services in Atlanta. 42+ years of experience.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}

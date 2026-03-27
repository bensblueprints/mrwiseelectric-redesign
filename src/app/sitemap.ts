import { MetadataRoute } from "next";
import { services } from "@/lib/data";
import { serviceAreasData } from "@/lib/service-areas-data";

const baseUrl = "https://irkelectricalservices.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/service-areas`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Individual service pages
  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Service area pages (city level)
  const serviceAreaPages: MetadataRoute.Sitemap = serviceAreasData.map(
    (area) => ({
      url: `${baseUrl}/service-areas/${area.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })
  );

  // Service area + service combination pages
  const serviceAreaServicePages: MetadataRoute.Sitemap = serviceAreasData.flatMap(
    (area) =>
      services.map((service) => ({
        url: `${baseUrl}/service-areas/${area.slug}/${service.slug}`,
        lastModified: currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
  );

  return [
    ...staticPages,
    ...servicePages,
    ...serviceAreaPages,
    ...serviceAreaServicePages,
  ];
}

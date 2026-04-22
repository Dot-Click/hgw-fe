import { MetadataRoute } from "next";
import { SEO_CONFIG } from "@/lib/config/seo";

/**
 * PRODUCTION-GRADE SITEMAP GENERATOR
 * Dynamically lists all crawlable pages for search engines.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/login", "/register", "/death-match"];
  
  return routes.map((route) => ({
    url: `${SEO_CONFIG.siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: route === "" ? 1 : 0.8,
  }));
}

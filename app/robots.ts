import { MetadataRoute } from "next";
import { SEO_CONFIG } from "@/lib/config/seo";

/**
 * PRODUCTION-GRADE ROBOTS.TXT
 * Optimizes crawlability while protecting sensitive admin areas.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"], // Protect admin and api endpoints from crawlers
    },
    sitemap: `${SEO_CONFIG.siteUrl}/sitemap.xml`,
  };
}

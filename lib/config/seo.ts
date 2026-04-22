/**
 * PRODUCTION-GRADE SEO CONFIGURATION
 * Centralized settings for metadata, OpenGraph, and Twitter.
 */
export const SEO_CONFIG = {
  defaultTitle: "HGW Legend Vault | The Definitive Legend Archive",
  titleTemplate: "%s | HGW Legend Vault",
  description: "The definitive archive ranking and managing the greatest legends across sports, culture, and beyond.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://hgw-legend-vault.vercel.app",
  keywords: [
    "HGW", 
    "Legend Vault", 
    "SaaS", 
    "Admin Dashboard", 
    "Sports Archive", 
    "Legend Management", 
    "Production Grade App"
  ],
  author: "DotClick LLC",
  themeColor: "#0B0F19",
  twitterHandle: "@hgw_vault",
  ogImage: "/og-image.png",
};

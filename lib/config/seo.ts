/**
 * PRODUCTION-GRADE SEO CONFIGURATION
 * Centralized settings for metadata, OpenGraph, and Twitter.
 */
export const SEO_CONFIG = {
  defaultTitle: "How Good Was | The Ultimate Legend Ranking System",
  titleTemplate: "%s | How Good Was",
  description: "Discover the HGW Score: The definitive archive for grading and ranking the greatest legends in sport and culture. Analyze stats, dominance, and legacies in one place.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://howgoodwas.com",
  keywords: [
    "How Good Was", 
    "HGW Score", 
    "Sport Rankings", 
    "Legend Archive", 
    "Player Comparison", 
    "All Time Greats", 
    "Sports Analytics",
    "Legendary Athletes"
  ],
  author: "How Good Was Team",
  themeColor: "#00CCFF",
  twitterHandle: "@howgoodwas",
  ogImage: "/assets/og-image.png",
};

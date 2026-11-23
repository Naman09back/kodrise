import type {MetadataRoute} from "next";
import {sanityClient} from "../sanity/lib/client";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kodrise.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  let serviceUrls: MetadataRoute.Sitemap = [];
  const nativeServiceSlugs = new Set([
    "generative-ai-development-company", "ai-agents-and-automation-solutions", "ai-app-development-company",
    "ai-chatbot-development-company", "machine-learning", "nlp-development", "rag-as-a-service", "outsourcing-ai-development",
  ]);
  try {
    const slugs = await sanityClient.fetch<Array<{slug: string}>>(`*[_type == "service" && defined(slug.current)]{"slug": slug.current}`);
    serviceUrls = slugs.filter(({slug}) => nativeServiceSlugs.has(slug)).map(({slug}) => ({url: `${siteUrl}/services/${slug}`, lastModified: now}));
  } catch {
    // Keep the core sitemap available while the CMS is unavailable.
  }
  const migrationUrls = ["/shopify-services/shopify-migration", ...["adobe-commerce", "bigcommerce", "woocommerce", "salesforce", "magento", "squarespace", "wix"].map((slug) => `/shopify-services/shopify-migration/${slug}`)];
  const coreUrls: MetadataRoute.Sitemap = ["", "/services", "/ai-consulting-services", "/about", "/overview", "/process-methodology", "/contact", "/portfolio", "/case-studies", "/resources", "/careers", "/devresources", ...[
    "website-design", "website-development", "b2b-ecommerce-solutions", "headless-commerce", "mobile-app-development", "custom-ecommerce-solutions", "ai-agentic-commerce", "ongoing-support", "marketing", "seo", "ppc", "content-marketing", "social-media-marketing", "email-marketing", "dedicated-commerce-teams",
  ].map((slug) => `/shopify-services/${slug}`), ...migrationUrls].map((path) => ({url: `${siteUrl}${path}`, lastModified: now}));
  return [...coreUrls, ...serviceUrls];
}

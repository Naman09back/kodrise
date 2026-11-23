import type {MetadataRoute} from "next";
import {sanityClient} from "../sanity/lib/client";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kodrise.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  let serviceUrls: MetadataRoute.Sitemap = [];
  const servicePathOverrides: Record<string, string> = {
    "shopify-website-development": "/shopify-services/website-development",
    "recover-shopify-abandoned-checkouts": "/shopify-services/abandoned-checkout-recovery",
  };
  try {
    const slugs = await sanityClient.fetch<Array<{slug: string}>>(`*[_type == "service" && defined(slug.current)]{"slug": slug.current}`);
    serviceUrls = slugs.filter(({slug}) => slug !== "shopify-development" && slug !== "shopify-app-development-company").map(({slug}) => ({url: `${siteUrl}${servicePathOverrides[slug] || `/services/${slug}`}`, lastModified: now}));
  } catch {
    // Keep the core sitemap available while the CMS is unavailable.
  }
  const migrationUrls = ["/shopify-services/shopify-migration", ...["adobe-commerce", "bigcommerce", "woocommerce", "salesforce", "magento", "squarespace", "wix"].map((slug) => `/shopify-services/shopify-migration/${slug}`)];
  const coreUrls: MetadataRoute.Sitemap = ["", "/services", "/shopify-services", "/shopify-services/website-design", "/shopify-services/website-development", "/shopify-services/b2b-ecommerce-solutions", "/shopify-services/headless-commerce", "/shopify-services/mobile-app-development", "/shopify-services/custom-ecommerce-solutions", "/shopify-services/ai-agentic-commerce", "/shopify-services/ongoing-support", "/shopify-services/dedicated-commerce-teams", "/shopify-services/marketing", "/case-studies", "/about", "/careers", "/contact", "/resources", "/devresources", ...migrationUrls].map((path) => ({url: `${siteUrl}${path}`, lastModified: now}));
  return [...coreUrls, ...serviceUrls];
}

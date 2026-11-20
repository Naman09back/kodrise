import type {MetadataRoute} from "next";
import {sanityClient} from "../sanity/lib/client";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kodrise.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  let serviceUrls: MetadataRoute.Sitemap = [];
  const servicePathOverrides: Record<string, string> = {
    "shopify-development": "/shopify-services/shopify-development",
    "shopify-app-development-company": "/shopify-services/shopify-app-development",
    "shopify-website-development": "/shopify-services/website-development",
    "recover-shopify-abandoned-checkouts": "/shopify-services/abandoned-checkout-recovery",
  };
  try {
    const slugs = await sanityClient.fetch<Array<{slug: string}>>(`*[_type == "service" && defined(slug.current)]{"slug": slug.current}`);
    serviceUrls = slugs.map(({slug}) => ({url: `${siteUrl}${servicePathOverrides[slug] || `/services/${slug}`}`, lastModified: now}));
  } catch {
    // Keep the core sitemap available while the CMS is unavailable.
  }
  const coreUrls: MetadataRoute.Sitemap = ["", "/services", "/shopify-services", "/shopify-services/marketing", "/case-studies", "/about", "/careers", "/contact", "/resources", "/devresources"].map((path) => ({url: `${siteUrl}${path}`, lastModified: now}));
  return [...coreUrls, ...serviceUrls];
}

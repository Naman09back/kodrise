import type {MetadataRoute} from "next";
import {sanityClient} from "../sanity/lib/client";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  let serviceUrls: MetadataRoute.Sitemap = [];
  try {
    const slugs = await sanityClient.fetch<Array<{slug: string}>>(`*[_type == "service" && defined(slug.current)]{"slug": slug.current}`);
    serviceUrls = slugs.map(({slug}) => ({url: `${siteUrl}/services/${slug}`, lastModified: now}));
  } catch {
    // Keep the core sitemap available while the CMS is unavailable.
  }
  const coreUrls: MetadataRoute.Sitemap = ["", "/services", "/case-studies", "/about", "/careers", "/contact", "/devresources"].map((path) => ({url: `${siteUrl}${path}`, lastModified: now}));
  return [...coreUrls, ...serviceUrls];
}

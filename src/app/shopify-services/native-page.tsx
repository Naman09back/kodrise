import type {ReactNode} from "react";
import CmsNativePageGate from "../cms-native-page-gate";
import {getSitePage} from "@/sanity/lib/pages";
import {sanityClient} from "@/sanity/lib/client";
import {urlForImage} from "@/sanity/lib/image";
import {unstable_cache} from "next/cache";
import {ShopifyAssetsProvider, type ShopifyImageAsset} from "./shopify-assets";

const PAGE_IMAGE_SLOTS: Record<string, string[]> = {
  "/shopify-services/website-design": ["shopify-marketing-hero-marketing-b", "shopify-marketing-mkt-team-a", "homepage-industry-ecommerce", "services-mobile", "services-web"],
  "/shopify-services/website-development": ["shopify-marketing-hero-marketing-b", "homepage-industry-ecommerce"],
  "/shopify-services/b2b-ecommerce-solutions": ["shopify-marketing-hero-marketing-b", "shopify-marketing-mkt-team-a", "homepage-industry-ecommerce"],
  "/shopify-services/headless-commerce": ["shopify-marketing-hero-marketing-b", "shopify-marketing-mkt-team-a", "homepage-industry-ecommerce", "services-mobile", "services-web"],
  "/shopify-services/marketing": ["shopify-marketing-hero-marketing-b", "shopify-marketing-mkt-team-a"],
  "/shopify-services/ppc": ["shopify-ppc-hero"],
  "/shopify-services/content-marketing": ["shopify-content-marketing-hero", "shopify-content-marketing-content-team"],
  "/shopify-services/social-media-marketing": ["shopify-social-marketing-hero"],
  "/shopify-services/email-marketing": ["shopify-email-marketing-hero", "shopify-email-marketing-email-team"],
  "/shopify-services/ai-agentic-commerce": ["services-ai", "homepage-industry-ecommerce"],
  "/shopify-services/mobile-app-development": ["services-mobile"],
  "/shopify-services/custom-ecommerce-solutions": ["services-custom", "services-teams", "homepage-industry-ecommerce"],
  "/shopify-services/dedicated-commerce-teams": ["services-teams", "services-custom", "services-web"],
  "/shopify-services/ongoing-support": ["shopify-marketing-hero-marketing-b", "shopify-marketing-mkt-team-a", "services-teams"],
};

const getCachedShopifyImages = unstable_cache(async (slotsKey: string): Promise<Record<string, ShopifyImageAsset>> => {
  const slots = JSON.parse(slotsKey) as string[];
  if (!slots.length) return {};
  const records = await sanityClient.fetch<Array<{slot:string; title?:string; alt?:string; image?:unknown}>>(
    `*[_type == "siteAsset" && slot in $slots && defined(image.asset) && defined(sourceLicense) && defined(licenseVerifiedAt)]{slot,title,alt,image{asset->{_id,url},crop,hotspot}}`,
    {slots},
  ).catch(() => []);
  return Object.fromEntries(records.filter((record) => record.image).map((record) => [record.slot, {
    // A 1600px modern-format rendition is sharp on desktop and substantially
    // smaller than sending the original high-resolution Sanity asset.
    src: urlForImage(record.image).width(1600).quality(72).auto("format").url(),
    alt: record.alt || record.title || "Kodrise Shopify commerce",
  }]));
}, ["shopify-image-assets-v2"], {revalidate: 300});

async function getShopifyImages(path: string): Promise<Record<string, ShopifyImageAsset>> {
  return getCachedShopifyImages(JSON.stringify(PAGE_IMAGE_SLOTS[path] || []));
}

export default async function ShopifyNativePage({path, children}: {path: string; children: ReactNode}) {
  const [page, assets] = await Promise.all([getSitePage(path), getShopifyImages(path)]);
  return <ShopifyAssetsProvider assets={assets}><CmsNativePageGate page={page} label={path.split("/").filter(Boolean).at(-1)?.replaceAll("-", " ") || "Shopify Services"}>{children}</CmsNativePageGate></ShopifyAssetsProvider>;
}

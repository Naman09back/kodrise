import type {Metadata} from "next";
import {getSitePage} from "@/sanity/lib/pages";
import {sanityClient} from "@/sanity/lib/client";
import {urlForImage} from "@/sanity/lib/image";
import ShopifySeoExperience from "./seo-experience";

const PAGE_KEY = "/shopify-services/seo";
const ASSETS_QUERY = `*[_type == "siteAsset" && slot in [
  "shopify-seo-hero", "shopify-seo-google-partner", "shopify-seo-team", "shopify-seo-claude-partner"
]]{slot, title, alt, image {asset->{_id, url}, crop, hotspot}}`;
type SeoAsset = {slot: string; title?: string; alt?: string; image?: unknown};
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage(PAGE_KEY);
  return {
    title: {absolute: page?.seo?.title || "Shopify SEO Services | Kodrise"},
    description: page?.seo?.description || "Grow organic traffic for your Shopify store with technical SEO, on-page optimization, analytics, and authority building.",
    ...(page?.seo?.noIndex ? {robots: {index: false, follow: false}} : {}),
    alternates: {canonical: PAGE_KEY},
  };
}

export default async function ShopifySeoPage() {
  const [page, assets] = await Promise.all([
    getSitePage(PAGE_KEY),
    sanityClient.fetch<SeoAsset[]>(ASSETS_QUERY).catch(() => []),
  ]);
  const images = Object.fromEntries(assets.filter((asset) => asset.image).map((asset) => [
    asset.slot,
    {src: urlForImage(asset.image).width(asset.slot === "shopify-seo-hero" ? 1920 : 900).auto("format").url(), alt: asset.alt || asset.title || "Shopify SEO by Kodrise"},
  ]));
  return <ShopifySeoExperience page={page} images={images} />;
}

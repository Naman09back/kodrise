import type {Metadata} from "next";
import {getSitePage} from "@/sanity/lib/pages";
import {sanityClient} from "@/sanity/lib/client";
import {urlForImage} from "@/sanity/lib/image";
import AiOutsourcingExperience from "./outsourcing-experience";

const PAGE_KEY = "/services/outsourcing-ai-development";
const ASSETS_QUERY = `*[_type == "siteAsset" && slot in [
  "outsourcing-banner", "outsourcing-trend", "outsourcing-prompts", "outsourcing-genai", "outsourcing-industries", "outsourcing-process", "portfolio-calcounts", "portfolio-scribeflo", "portfolio-hiregroww"
]]{slot, title, alt, image {asset->{_id, url}, crop, hotspot}}`;

type ServiceAsset = {slot: string; title?: string; alt?: string; image?: unknown};
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage(PAGE_KEY);
  return {
    title: {absolute: page?.seo?.title || "AI Outsourcing Services | Kodrise"},
    description: page?.seo?.description || "Scale AI delivery with experienced engineers and flexible teams for strategy, development, integration, and ongoing support.",
    ...(page?.seo?.noIndex ? {robots: {index: false, follow: false}} : {}),
    alternates: {canonical: PAGE_KEY},
  };
}

export default async function AiOutsourcingPage() {
  const [page, assets] = await Promise.all([
    getSitePage(PAGE_KEY),
    sanityClient.fetch<ServiceAsset[]>(ASSETS_QUERY).catch(() => []),
  ]);
  const images = Object.fromEntries(assets.filter((asset) => asset.image).map((asset) => [
    asset.slot,
    {src: urlForImage(asset.image).width(960).fit("max").auto("format").url(), alt: asset.alt || asset.title || "Kodrise AI outsourcing"},
  ]));
  const heroImage = page?.heroImage ? urlForImage(page.heroImage).width(1920).height(900).fit("crop").auto("format").url() : images["outsourcing-banner"]?.src;
  return <AiOutsourcingExperience page={page} images={images} heroImage={heroImage} />;
}

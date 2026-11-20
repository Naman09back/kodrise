import type {Metadata} from "next";
import {getSitePage} from "@/sanity/lib/pages";
import {sanityClient} from "@/sanity/lib/client";
import {urlForImage} from "@/sanity/lib/image";
import AiAppExperience from "./ai-app-experience";

const PAGE_KEY = "/services/ai-app-development-company";
const ASSETS_QUERY = `*[_type == "siteAsset" && slot in [
  "ai-app-banner", "ai-app-discovery", "ai-app-analytics", "ai-app-ux", "ai-app-development", "ai-app-testing", "ai-app-support", "ai-app-industries", "ai-app-capabilities", "portfolio-calcounts", "portfolio-scribeflo", "portfolio-hiregroww"
]]{slot, title, alt, image {asset->{_id, url}, crop, hotspot}}`;

type ServiceAsset = {slot: string; title?: string; alt?: string; image?: unknown};

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage(PAGE_KEY);
  return {
    title: {absolute: page?.seo?.title || "AI App Development Services | Kodrise"},
    description: page?.seo?.description || "Build custom AI applications that automate workflows, improve decisions, and deliver intelligent mobile and web experiences.",
    ...(page?.seo?.noIndex ? {robots: {index: false, follow: false}} : {}),
    alternates: {canonical: PAGE_KEY},
  };
}

export default async function AiAppDevelopmentPage() {
  const [page, assets] = await Promise.all([
    getSitePage(PAGE_KEY),
    sanityClient.fetch<ServiceAsset[]>(ASSETS_QUERY).catch(() => []),
  ]);
  const images = Object.fromEntries(assets.filter((asset) => asset.image).map((asset) => [
    asset.slot,
    {src: urlForImage(asset.image).width(960).fit("max").auto("format").url(), alt: asset.alt || asset.title || "Kodrise AI app development"},
  ]));
  const heroImage = page?.heroImage ? urlForImage(page.heroImage).width(1920).height(900).fit("crop").auto("format").url() : images["ai-app-banner"]?.src;
  return <AiAppExperience page={page} images={images} heroImage={heroImage} />;
}

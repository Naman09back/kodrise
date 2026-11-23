import type {Metadata} from "next";
import {getSitePage} from "@/sanity/lib/pages";
import {sanityClient} from "@/sanity/lib/client";
import {urlForImage} from "@/sanity/lib/image";
import GenerativeAiExperience from "./generative-ai-experience";
import CmsNativePageGate from "../../cms-native-page-gate";

const PAGE_KEY = "/services/generative-ai-development-company";
const ASSETS_QUERY = `*[_type == "siteAsset" && slot in [
  "generative-ai-banner", "generative-ai-discovery", "generative-ai-launchpad", "generative-ai-adoption", "generative-ai-reinvention",
  "generative-ai-applications", "generative-ai-consultation", "portfolio-calcounts", "portfolio-scribeflo", "portfolio-hiregroww"
]]{slot, title, alt, image {asset->{_id, url}, crop, hotspot}}`;

type ServiceAsset = {slot: string; title?: string; alt?: string; image?: unknown};

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage(PAGE_KEY);
  return {
    title: {absolute: page?.seo?.title || "Generative AI Development Services | Kodrise"},
    description: page?.seo?.description || "Build secure generative AI solutions that automate workflows, connect trusted knowledge, and turn business data into useful insights.",
    ...(page?.seo?.noIndex ? {robots: {index: false, follow: false}} : {}),
    alternates: {canonical: PAGE_KEY},
  };
}

export default async function GenerativeAiPage() {
  const [page, assets] = await Promise.all([
    getSitePage(PAGE_KEY),
    sanityClient.fetch<ServiceAsset[]>(ASSETS_QUERY).catch(() => []),
  ]);
  const images = Object.fromEntries(assets.filter((asset) => asset.image).map((asset) => [
    asset.slot,
    {src: urlForImage(asset.image).width(960).fit("max").auto("format").url(), alt: asset.alt || asset.title || "Kodrise generative AI service"},
  ]));
  const heroImage = page?.heroImage ? urlForImage(page.heroImage).width(1920).height(900).fit("crop").auto("format").url() : images["generative-ai-banner"]?.src;
  return <CmsNativePageGate page={page} label="Generative AI Development"><GenerativeAiExperience page={page} images={images} heroImage={heroImage} /></CmsNativePageGate>;
}

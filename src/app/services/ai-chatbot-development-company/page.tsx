import type {Metadata} from "next";
import {getSitePage} from "@/sanity/lib/pages";
import {sanityClient} from "@/sanity/lib/client";
import {urlForImage} from "@/sanity/lib/image";
import AiChatbotExperience from "./ai-chatbot-experience";

const PAGE_KEY = "/services/ai-chatbot-development-company";
const ASSETS_QUERY = `*[_type == "siteAsset" && slot in [
  "ai-chatbot-banner", "ai-chatbot-conversations", "ai-chatbot-knowledge", "ai-chatbot-integrations", "ai-chatbot-security", "ai-chatbot-industries", "ai-chatbot-process", "portfolio-calcounts", "portfolio-scribeflo", "portfolio-hiregroww"
]]{slot, title, alt, image {asset->{_id, url}, crop, hotspot}}`;

type ServiceAsset = {slot: string; title?: string; alt?: string; image?: unknown};

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage(PAGE_KEY);
  return {
    title: {absolute: page?.seo?.title || "AI Chatbot Development Services | Kodrise"},
    description: page?.seo?.description || "Build secure AI chatbots that support customers, qualify leads, connect business systems, and automate conversations across channels.",
    ...(page?.seo?.noIndex ? {robots: {index: false, follow: false}} : {}),
    alternates: {canonical: PAGE_KEY},
  };
}

export default async function AiChatbotDevelopmentPage() {
  const [page, assets] = await Promise.all([
    getSitePage(PAGE_KEY),
    sanityClient.fetch<ServiceAsset[]>(ASSETS_QUERY).catch(() => []),
  ]);
  const images = Object.fromEntries(assets.filter((asset) => asset.image).map((asset) => [
    asset.slot,
    {src: urlForImage(asset.image).width(960).fit("max").auto("format").url(), alt: asset.alt || asset.title || "Kodrise AI chatbot development"},
  ]));
  const heroImage = page?.heroImage ? urlForImage(page.heroImage).width(1920).height(900).fit("crop").auto("format").url() : images["ai-chatbot-banner"]?.src;
  return <AiChatbotExperience page={page} images={images} heroImage={heroImage} />;
}

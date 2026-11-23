import type {Metadata} from "next";
import {getSitePage} from "@/sanity/lib/pages";
import {sanityClient} from "@/sanity/lib/client";
import {urlForImage} from "@/sanity/lib/image";
import AiAgentExperience from "./ai-agent-experience";
import CmsNativePageGate from "../../cms-native-page-gate";

const PAGE_KEY = "/services/ai-agents-and-automation-solutions";
const ASSETS_QUERY = `*[_type == "siteAsset" && slot in [
  "ai-agent-banner", "ai-agent-discovery", "ai-agent-architecture", "ai-agent-models", "ai-agent-deployment", "ai-agent-industries", "ai-agent-capabilities", "portfolio-calcounts", "portfolio-scribeflo", "portfolio-hiregroww"
]]{slot, title, alt, image {asset->{_id, url}, crop, hotspot}}`;

type ServiceAsset = {slot: string; title?: string; alt?: string; image?: unknown};

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage(PAGE_KEY);
  return {
    title: {absolute: page?.seo?.title || "AI Agent Development Services | Kodrise"},
    description: page?.seo?.description || "Build secure AI agents that automate business workflows, connect to trusted systems, and keep people in control.",
    ...(page?.seo?.noIndex ? {robots: {index: false, follow: false}} : {}),
    alternates: {canonical: PAGE_KEY},
  };
}

export default async function AiAgentDevelopmentPage() {
  const [page, assets] = await Promise.all([
    getSitePage(PAGE_KEY),
    sanityClient.fetch<ServiceAsset[]>(ASSETS_QUERY).catch(() => []),
  ]);
  const images = Object.fromEntries(assets.filter((asset) => asset.image).map((asset) => [
    asset.slot,
    {src: urlForImage(asset.image).width(960).fit("max").auto("format").url(), alt: asset.alt || asset.title || "Kodrise AI agent development"},
  ]));
  const heroImage = page?.heroImage ? urlForImage(page.heroImage).width(1920).height(900).fit("crop").auto("format").url() : images["ai-agent-banner"]?.src;
  return <CmsNativePageGate page={page} label="AI Agent Development"><AiAgentExperience page={page} images={images} heroImage={heroImage} /></CmsNativePageGate>;
}

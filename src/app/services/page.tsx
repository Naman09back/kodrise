import type { Metadata } from "next";
import { getSitePage } from "@/sanity/lib/pages";
import { sanityClient } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import AiServicesExperience from "./ai-services-experience";

type ServiceAsset = { slot: string; title?: string; alt?: string; image?: unknown };
const SERVICE_ASSETS_QUERY = `
  *[_type == "siteAsset" && slot in [
    "services-banner", "services-ai", "services-teams", "services-web", "services-mobile", "services-custom", "services-devops"
  ]]{slot, title, alt, image {asset->{_id, url}, crop, hotspot}}
`;

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("services");
  return {
    title: { absolute: page?.seo?.title || "AI Services | Kodrise" },
    description: page?.seo?.description || "Explore Kodrise AI services, from generative AI and agents to machine learning, chatbots, NLP, RAG, and AI consulting.",
    ...(page?.seo?.noIndex ? { robots: { index: false, follow: false } } : {}),
    alternates: { canonical: "/services" },
  };
}

export default async function ServicesPage() {
  const [page, assets] = await Promise.all([
    getSitePage("services"),
    sanityClient.fetch<ServiceAsset[]>(SERVICE_ASSETS_QUERY).catch(() => []),
  ]);
  const images = Object.fromEntries(assets.filter((asset) => asset.image).map((asset) => [
    asset.slot,
    { src: urlForImage(asset.image).auto("format").fit("max").url(), alt: asset.alt || asset.title || "Kodrise AI service" },
  ]));
  return <AiServicesExperience page={page} images={images} />;
}

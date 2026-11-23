import type {Metadata} from "next";
import {getSitePage} from "@/sanity/lib/pages";
import {sanityClient} from "@/sanity/lib/client";
import {urlForImage} from "@/sanity/lib/image";
import RagExperience from "./rag-experience";
import CmsNativePageGate from "../../cms-native-page-gate";

const PAGE_KEY = "/services/rag-as-a-service";
const ASSETS_QUERY = `*[_type == "siteAsset" && slot in [
  "rag-banner", "rag-retriever", "rag-vector-store", "rag-chunking", "rag-industries", "rag-process", "portfolio-calcounts", "portfolio-scribeflo", "portfolio-hiregroww"
]]{slot, title, alt, image {asset->{_id, url}, crop, hotspot}}`;

type ServiceAsset = {slot: string; title?: string; alt?: string; image?: unknown};

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage(PAGE_KEY);
  return {
    title: {absolute: page?.seo?.title || "RAG as a Service | Kodrise"},
    description: page?.seo?.description || "Build retrieval-augmented generation systems that ground AI responses in relevant business knowledge and sources.",
    ...(page?.seo?.noIndex ? {robots: {index: false, follow: false}} : {}),
    alternates: {canonical: PAGE_KEY},
  };
}

export default async function RagAsAServicePage() {
  const [page, assets] = await Promise.all([
    getSitePage(PAGE_KEY),
    sanityClient.fetch<ServiceAsset[]>(ASSETS_QUERY).catch(() => []),
  ]);
  const images = Object.fromEntries(assets.filter((asset) => asset.image).map((asset) => [
    asset.slot,
    {src: urlForImage(asset.image).width(960).fit("max").auto("format").url(), alt: asset.alt || asset.title || "Kodrise RAG service"},
  ]));
  const heroImage = page?.heroImage ? urlForImage(page.heroImage).width(1920).height(900).fit("crop").auto("format").url() : images["rag-banner"]?.src;
  return <CmsNativePageGate page={page} label="RAG as a Service"><RagExperience page={page} images={images} heroImage={heroImage} /></CmsNativePageGate>;
}

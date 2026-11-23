import type {Metadata} from "next";
import {getSitePage} from "@/sanity/lib/pages";
import {sanityClient} from "@/sanity/lib/client";
import {urlForImage} from "@/sanity/lib/image";
import NlpExperience from "./nlp-experience";
import CmsNativePageGate from "../../cms-native-page-gate";

const PAGE_KEY = "/services/nlp-development";
const ASSETS_QUERY = `*[_type == "siteAsset" && slot in [
  "nlp-banner", "nlp-text-mining", "nlp-enterprise-search", "nlp-contextual-content", "nlp-industries", "nlp-process", "portfolio-calcounts", "portfolio-scribeflo", "portfolio-hiregroww"
]]{slot, title, alt, image {asset->{_id, url}, crop, hotspot}}`;

type ServiceAsset = {slot: string; title?: string; alt?: string; image?: unknown};

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage(PAGE_KEY);
  return {
    title: {absolute: page?.seo?.title || "Natural Language Processing Services | Kodrise"},
    description: page?.seo?.description || "Build NLP systems that understand text and speech, automate language workflows, and turn unstructured data into business insight.",
    ...(page?.seo?.noIndex ? {robots: {index: false, follow: false}} : {}),
    alternates: {canonical: PAGE_KEY},
  };
}

export default async function NlpDevelopmentPage() {
  const [page, assets] = await Promise.all([
    getSitePage(PAGE_KEY),
    sanityClient.fetch<ServiceAsset[]>(ASSETS_QUERY).catch(() => []),
  ]);
  const images = Object.fromEntries(assets.filter((asset) => asset.image).map((asset) => [
    asset.slot,
    {src: urlForImage(asset.image).width(960).fit("max").auto("format").url(), alt: asset.alt || asset.title || "Kodrise natural language processing"},
  ]));
  const heroImage = page?.heroImage ? urlForImage(page.heroImage).width(1920).height(900).fit("crop").auto("format").url() : images["nlp-banner"]?.src;
  return <CmsNativePageGate page={page} label="NLP Development"><NlpExperience page={page} images={images} heroImage={heroImage} /></CmsNativePageGate>;
}

import type {Metadata} from "next";
import {getSitePage} from "@/sanity/lib/pages";
import {sanityClient} from "@/sanity/lib/client";
import {urlForImage} from "@/sanity/lib/image";
import MachineLearningExperience from "./machine-learning-experience";
import CmsNativePageGate from "../../cms-native-page-gate";

const PAGE_KEY = "/services/machine-learning";
const ASSETS_QUERY = `*[_type == "siteAsset" && slot in [
  "machine-learning-banner", "ml-aws", "ml-google-cloud", "ml-azure", "machine-learning-industries", "machine-learning-process", "portfolio-calcounts", "portfolio-scribeflo", "portfolio-hiregroww"
]]{slot, title, alt, image {asset->{_id, url}, crop, hotspot}}`;

type ServiceAsset = {slot: string; title?: string; alt?: string; image?: unknown};

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage(PAGE_KEY);
  return {
    title: {absolute: page?.seo?.title || "Machine Learning Development Services | Kodrise"},
    description: page?.seo?.description || "Build custom machine learning solutions for forecasting, recommendations, computer vision, and better business decisions.",
    ...(page?.seo?.noIndex ? {robots: {index: false, follow: false}} : {}),
    alternates: {canonical: PAGE_KEY},
  };
}

export default async function MachineLearningPage() {
  const [page, assets] = await Promise.all([
    getSitePage(PAGE_KEY),
    sanityClient.fetch<ServiceAsset[]>(ASSETS_QUERY).catch(() => []),
  ]);
  const images = Object.fromEntries(assets.filter((asset) => asset.image).map((asset) => [
    asset.slot,
    {src: urlForImage(asset.image).width(960).fit("max").auto("format").url(), alt: asset.alt || asset.title || "Kodrise machine learning development"},
  ]));
  const heroImage = page?.heroImage ? urlForImage(page.heroImage).width(1920).height(900).fit("crop").auto("format").url() : images["machine-learning-banner"]?.src;
  return <CmsNativePageGate page={page} label="Machine Learning"><MachineLearningExperience page={page} images={images} heroImage={heroImage} /></CmsNativePageGate>;
}

import type { Metadata } from "next";
import { getSitePage } from "@/sanity/lib/pages";
import { sanityClient } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import OverviewExperience from "./overview-experience";

type OverviewAsset = { slot: string; title?: string; alt?: string; image?: unknown };
const OVERVIEW_ASSETS_QUERY = `
  *[_type == "siteAsset" && slot in [
    "overview-banner", "portfolio-ucpa", "portfolio-calcounts", "portfolio-scribeflo", "portfolio-hiregroww"
  ]]{slot, title, alt, image {asset->{_id, url}, crop, hotspot}}
`;

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("overview");
  return {
    title: page?.seo?.title || "Kodrise Overview | Our Journey",
    description: page?.seo?.description || "Explore Kodrise’s journey in software engineering, digital products, and AI-first development.",
    ...(page?.seo?.noIndex ? { robots: { index: false, follow: false } } : {}),
    alternates: { canonical: "/overview" },
  };
}

export default async function OverviewPage() {
  const [page, assets] = await Promise.all([
    getSitePage("overview"),
    sanityClient.fetch<OverviewAsset[]>(OVERVIEW_ASSETS_QUERY).catch(() => []),
  ]);
  const images = Object.fromEntries(assets.filter((asset) => asset.image).map((asset) => [
    asset.slot,
    { src: urlForImage(asset.image).auto("format").fit("max").url(), alt: asset.alt || asset.title || "Kodrise project" },
  ]));
  return <OverviewExperience page={page} images={images} />;
}

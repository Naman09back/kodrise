import type { Metadata } from "next";
import { getSitePage } from "@/sanity/lib/pages";
import { sanityClient } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import ProcessExperience from "./process-experience";
import CmsNativePageGate from "../cms-native-page-gate";

type ProcessAsset = { slot: string; title?: string; alt?: string; image?: unknown };

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("process-methodology");
  return {
    title: { absolute: page?.seo?.title || "Process Methodology | Kodrise" },
    description: page?.seo?.description || "See how Kodrise takes digital product and software projects from discovery and planning through delivery and ongoing improvement.",
    ...(page?.seo?.noIndex ? { robots: { index: false, follow: false } } : {}),
    alternates: { canonical: "/process-methodology" },
  };
}

export default async function ProcessMethodologyPage() {
  const [page, assets] = await Promise.all([
    getSitePage("process-methodology"),
    sanityClient.fetch<ProcessAsset[]>(`*[_type == "siteAsset" && slot in ["process-methodology-banner", "process-methodology-agile"]]{slot, title, alt, image {asset->{_id, url}, crop, hotspot}}`).catch(() => []),
  ]);
  const images = Object.fromEntries(assets.filter((asset) => asset.image).map((asset) => [
    asset.slot,
    { src: urlForImage(asset.image).auto("format").fit("max").url(), alt: asset.alt || asset.title || "Kodrise software engineering" },
  ]));
  return <CmsNativePageGate page={page} label="Process Methodology"><ProcessExperience page={page} images={images} /></CmsNativePageGate>;
}

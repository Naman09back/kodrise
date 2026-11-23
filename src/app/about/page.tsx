import type {Metadata} from "next";
import {defineQuery} from "next-sanity";
import AboutExperience from "./about-experience";
import {getSitePage, getSitePageMetadata} from "@/sanity/lib/pages";
import {sanityClient} from "@/sanity/lib/client";
import {urlForImage} from "@/sanity/lib/image";
import CmsNativePageGate from "../cms-native-page-gate";

type AboutImage = {slot: string; title?: string; alt?: string; image?: unknown};

const ABOUT_IMAGES_QUERY = defineQuery(`
  *[_type == "siteAsset" && slot match "about-*"] | order(slot asc){
    slot, title, alt, image {asset->{_id, url}, crop, hotspot}
  }
`);

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getSitePageMetadata("about", "/about");
}

export default async function AboutPage() {
  const [page, assets] = await Promise.all([
    getSitePage("about"),
    sanityClient.fetch<AboutImage[]>(ABOUT_IMAGES_QUERY).catch(() => []),
  ]);
  const images = Object.fromEntries(assets.filter((asset) => asset.image).map((asset) => [asset.slot, {src: urlForImage(asset.image).auto("format").fit("max").url(), alt: asset.alt || asset.title || ""}]));
  return <CmsNativePageGate page={page} label="About Kodrise"><AboutExperience images={images} page={page} /></CmsNativePageGate>;
}

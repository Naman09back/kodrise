import type { Metadata } from "next";
import { getSitePage, getSitePageMetadata } from "@/sanity/lib/pages";
import { sanityClient } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import ContactExperience from "./contact-experience";

type ContactAsset = {
  slot: string;
  title?: string;
  alt?: string;
  image?: unknown;
};

const CONTACT_ASSETS_QUERY = `
  *[_type == "siteAsset" && slot in [
    "about-testimonial-distri-logo",
    "about-testimonial-autism-logo",
    "about-testimonial-labayh-logo",
    "about-testimonial-cosmetic-choice-logo",
    "about-testimonial-clinical-trial-logo",
    "about-testimonial-same-day-dispatch-logo"
  ]]{slot, title, alt, image {asset->{_id, url}, crop, hotspot}}
`;

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getSitePageMetadata("contact", "/contact");
}

export default async function ContactPage() {
  const [page, assets] = await Promise.all([
    getSitePage("contact"),
    sanityClient.fetch<ContactAsset[]>(CONTACT_ASSETS_QUERY).catch(() => []),
  ]);

  const images = Object.fromEntries(
    assets
      .filter((asset) => asset.image)
      .map((asset) => [
        asset.slot,
        {
          src: urlForImage(asset.image).auto("format").fit("max").url(),
          alt: asset.alt || asset.title || "Kodrise client",
        },
      ]),
  );

  return <ContactExperience page={page} images={images} />;
}

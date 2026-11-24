import type {Metadata} from "next";
import {sanityClient} from "@/sanity/lib/client";
import {getSitePage, getSitePageMetadata, type SitePageContent} from "@/sanity/lib/pages";
import CareersExperience, {type CareerOpening} from "./careers-experience";
import CmsNativePageGate from "../cms-native-page-gate";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getSitePageMetadata("careers", "/careers");
}

export default async function CareersPage() {
  const [page, openings] = await Promise.all([
    getSitePage("careers"),
    sanityClient.fetch<CareerOpening[]>(
      `*[_type == "job" && isOpen == true] | order(title asc){_id,title,summary,location,employmentType}`,
    ).catch(() => []),
  ]);

  return <CmsNativePageGate page={page} label="Careers">
    <CareersExperience page={page} openings={openings} />
  </CmsNativePageGate>;
}

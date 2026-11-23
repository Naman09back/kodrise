import type {Metadata} from "next";
import CmsCollectionPage, {type CmsCard} from "../cms-collection-page";
import {sanityClient} from "@/sanity/lib/client";
import {getSitePage, getSitePageMetadata} from "@/sanity/lib/pages";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getSitePageMetadata("careers", "/careers");
}

export default async function CareersPage() {
  const [page, jobs] = await Promise.all([
    getSitePage("careers"),
    sanityClient.fetch<Array<{title: string; slug?: {current?: string}; summary?: string; location?: string; employmentType?: string}>>(
      `*[_type == "job" && isOpen == true] | order(title asc){title,slug,summary,location,employmentType}`,
    ).catch(() => []),
  ]);
  const cards: CmsCard[] = jobs.map((job) => ({title: job.title, description: job.summary, eyebrow: job.employmentType || "Open position", meta: job.location, href: `/contact?role=${encodeURIComponent(job.title)}`}));
  return <CmsCollectionPage page={page} label="Careers" fallbackTitle="Build your next chapter" fallbackAccent="with Kodrise." fallbackDescription="Work with a team building useful digital products and engineering systems for what comes next." cards={cards} sectionTitle={page?.careerIntroTitle || "Open opportunities"} sectionDescription={page?.careerIntroDescription || "Explore current roles and tell us where you can make an impact."} />;
}

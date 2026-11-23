import type {Metadata} from "next";
import CmsCollectionPage, {type CmsCard} from "../cms-collection-page";
import {sanityClient} from "@/sanity/lib/client";
import {getSitePage, getSitePageMetadata} from "@/sanity/lib/pages";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getSitePageMetadata("devresources", "/devresources");
}

export default async function DeveloperResourcesPage() {
  const [page, developers] = await Promise.all([
    getSitePage("devresources"),
    sanityClient.fetch<Array<{name?: string; role: string; experience?: string; skills?: string[]; availability?: string; engagement?: string}>>(
      `*[_type == "developer" && isPublished == true] | order(role asc){name,role,experience,skills,availability,engagement}`,
    ).catch(() => []),
  ]);
  const cards: CmsCard[] = developers.map((developer) => ({title: developer.name || developer.role, eyebrow: developer.role, description: [developer.experience, developer.skills?.join(" · ")].filter(Boolean).join(" — "), meta: [developer.availability, developer.engagement].filter(Boolean).join(" · "), href: `/contact?role=${encodeURIComponent(developer.role)}`}));
  return <CmsCollectionPage page={page} label="Hire Developers" fallbackTitle="Find the right people" fallbackAccent="for your next build." fallbackDescription="Explore experienced engineers across AI, software, cloud, mobile, and commerce." cards={cards} sectionTitle="Developer profiles" sectionDescription="Tell us about the skills and experience your team needs." />;
}

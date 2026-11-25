import type {Metadata} from "next";
import {sanityClient} from "@/sanity/lib/client";
import {getSitePageMetadata} from "@/sanity/lib/pages";
import DeveloperBench, {type DeveloperProfile} from "./developer-bench";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getSitePageMetadata("devresources", "/hire-developers");
}

export default async function DeveloperResourcesPage() {
  const developers = await sanityClient.fetch<DeveloperProfile[]>(
    `*[_type == "developer" && isPublished == true] | order(profileId asc){profileId, name, role, experience, skills, availability, engagement, bio}`,
  ).catch(() => []);

  return <DeveloperBench developers={developers} />;
}

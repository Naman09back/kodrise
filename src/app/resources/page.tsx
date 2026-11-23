import type {Metadata} from "next";
import CmsCollectionPage, {type CmsCard} from "../cms-collection-page";
import {sanityClient} from "@/sanity/lib/client";
import {getSitePage, getSitePageMetadata} from "@/sanity/lib/pages";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getSitePageMetadata("resources", "/resources");
}

export default async function ResourcesPage() {
  const [page, content] = await Promise.all([
    getSitePage("resources"),
    sanityClient.fetch<Array<{title: string; category?: string; excerpt?: string; url?: string; slug?: {current?: string}; image?: {asset?: {url?: string}; alt?: string}}>>(
      `*[(_type == "insight" || _type == "resource") && isPublished != false] | order(publishedAt desc,order asc,_createdAt desc)[0...48]{title,category,excerpt,url,"slug":slug.current,image{asset->{url},alt}}`,
    ).catch(() => []),
  ]);
  const cards: CmsCard[] = content.map((item) => ({title: item.title, eyebrow: item.category || "Kodrise insights", description: item.excerpt, image: item.image, href: item.slug ? `/resources/${item.slug}` : item.url}));
  return <CmsCollectionPage page={page} label="Resources" fallbackTitle="Ideas for what comes next" fallbackAccent="and how to build it." fallbackDescription="Insights and useful resources for teams planning their next digital product, AI initiative, or commerce experience." cards={cards} sectionTitle="Latest resources" sectionDescription="Browse articles and resources published by the Kodrise team." />;
}

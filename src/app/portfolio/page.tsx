import type {Metadata} from "next";
import CmsCollectionPage, {type CmsCard} from "../cms-collection-page";
import {sanityClient} from "@/sanity/lib/client";
import {getSitePage, getSitePageMetadata} from "@/sanity/lib/pages";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getSitePageMetadata("portfolio", "/portfolio");
}

export default async function PortfolioPage() {
  const [page, projects] = await Promise.all([
    getSitePage("portfolio"),
    sanityClient.fetch<Array<{title: string; client?: string; description?: string; outcome?: string; slug?: {current?: string}; category?: {title?: string}; image?: {asset?: {url?: string}; alt?: string}}>>(
      `*[_type == "caseStudy" && isPublished != false] | order(client asc){title,client,description,outcome,"slug":slug.current,category->{title},image{asset->{url},alt}}`,
    ).catch(() => []),
  ]);
  const cards: CmsCard[] = projects.map((project) => ({title: project.title, eyebrow: project.client, description: project.description || project.outcome, meta: project.category?.title, image: project.image}));
  return <CmsCollectionPage page={page} label="Our Work" fallbackTitle="Work built around real needs" fallbackAccent="and real people." fallbackDescription="A selection of digital products and commerce experiences shaped with our clients." cards={cards} sectionTitle="Selected projects" sectionDescription="Explore the goals, decisions, and outcomes behind work delivered by Kodrise." />;
}

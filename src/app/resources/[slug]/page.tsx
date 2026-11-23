import type {Metadata} from "next";
import Image from "next/image";
import {notFound} from "next/navigation";
import {sanityClient} from "@/sanity/lib/client";

type Insight = {title: string; category?: string; excerpt?: string; body?: string; author?: string; publishedAt?: string; image?: {asset?: {url?: string}; alt?: string}; seo?: {title?: string; description?: string}};

async function getInsight(slug: string): Promise<Insight | null> {
  return sanityClient.fetch<Insight | null>(`*[_type == "insight" && slug.current == $slug && isPublished != false][0]{title,category,excerpt,body,author,publishedAt,image{asset->{url},alt},seo{title,description}}`, {slug}).catch(() => null);
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const {slug} = await params;
  const insight = await getInsight(slug);
  return {title: insight?.seo?.title || insight?.title || "Resources | Kodrise", description: insight?.seo?.description || insight?.excerpt, alternates: {canonical: `/resources/${slug}`}};
}

export default async function ResourceDetailPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const item = await getInsight(slug);
  if (!item) notFound();
  return <main id="main" className="container" style={{maxWidth: 1000, paddingTop: 72, paddingBottom: 100}}>
    <a href="/resources">← All resources</a>
    <p className="interior-eyebrow" style={{marginTop: 38}}>{item.category || "Kodrise insights"}</p>
    <h1 style={{maxWidth: 900, fontSize: "clamp(38px, 6vw, 72px)", lineHeight: 1.08}}>{item.title}</h1>
    {item.excerpt && <p style={{maxWidth: 780, color: "#676973", fontSize: 20, lineHeight: 1.6}}>{item.excerpt}</p>}
    {item.image?.asset?.url && <div style={{position: "relative", width: "100%", height: "min(55vw, 480px)", margin: "38px 0", background: "#f1f1f2"}}><Image src={item.image.asset.url} alt={item.image.alt || item.title} fill unoptimized sizes="(max-width: 1000px) 100vw, 1000px" style={{objectFit: "cover"}} /></div>}
    <div style={{maxWidth: 780, whiteSpace: "pre-line", fontSize: 17, lineHeight: 1.8}}>{item.body || item.excerpt}</div>
    {item.author && <p style={{marginTop: 32, color: "#686a73"}}>By {item.author}</p>}
  </main>;
}

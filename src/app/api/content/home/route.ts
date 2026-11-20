import {NextResponse} from "next/server";
import {sanityClient} from "../../../../sanity/lib/client";

export async function GET() {
  const content = await sanityClient.fetch(`{
    "page": *[_type == "sitePage" && pageKey == "home"][0]{heroTitle, heroAccent, heroDescription, announcement, primaryCta, secondaryCta},
    "assets": *[_type == "siteAsset"]{slot, title, alt, sourcePath, image {asset->{url}, alt}},
    "services": *[_type == "service" && isPublished != false] | order(title asc)[0...6]{title, lead, image {asset->{url}, alt}},
    "industries": *[_type == "industry" && isFeatured != false] | order(title asc)[0...8]{title, description, image {asset->{url}, alt}},
    "insights": *[_type == "insight" && isFeatured != false] | order(_createdAt desc)[0...3]{title, category, excerpt, url, image {asset->{url}, alt}},
    "faqs": *[_type == "faq" && isPublished != false] | order(order asc, _createdAt asc)[0...10]{question, answer}
  }`);
  return NextResponse.json(content || {page: {}, assets: []});
}

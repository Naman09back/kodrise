import type { Metadata } from "next";
import HomeExperience from "./home-experience";
import { getSitePageMetadata } from "@/sanity/lib/pages";
import { defineQuery } from "next-sanity";
import { sanityClient } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import CmsNativePageGate from "./cms-native-page-gate";
import type {SitePageContent} from "@/sanity/lib/pages";

const HOME_QUERY = defineQuery(`{
  "page": *[_type == "sitePage" && pageKey == "home"][0]{title,heroTitle,heroAccent,heroDescription,heroImage{asset->{url},alt},announcement,primaryCta,primaryCtaUrl,secondaryCta,secondaryCtaUrl,useSanitySections,sections[]{layout,eyebrow,heading,body,image{asset->{url},alt},items[]{title,description,href,image{asset->{url},alt}} ,buttonLabel,buttonUrl}},
  "assets": *[_type == "siteAsset" && slot in ["services-ai","services-mobile","services-web","services-teams","services-devops","services-custom","services-banner","portfolio-calcounts","portfolio-scribeflo","portfolio-ucpa","portfolio1","portfolio2","portfolio3","awards","about-testimonial-distri-logo","about-testimonial-gezabel-perroti","about-testimonial-autism-logo","about-testimonial-catherine-kleins","about-testimonial-labayh-logo","about-testimonial-basim-albeladi","homepage-home-insights-legacy-modernization","homepage-home-insights-ai-app-maintenance","homepage-home-insights-ai-voice-agents","homepage-industry-healthcare","homepage-industry-ecommerce","homepage-industry-transport","homepage-industry-real-estate","homepage-industry-education","homepage-industry-travel","homepage-industry-media","homepage-industry-on-demand"]]{slot,title,alt,image{asset->{_id,url},crop,hotspot}},
  "insights": *[_type == "insight" && isPublished != false && isFeatured != false] | order(publishedAt desc,_createdAt desc)[0...3]{title,category,excerpt,url,slug,image{asset->{_id,url},alt,crop,hotspot}},
  "industries": *[_type == "industry" && isFeatured != false] | order(title asc)[0...8]{title,description,slug,image{asset->{_id,url},alt,crop,hotspot}},
  "faqs": *[_type == "faq" && isPublished != false] | order(order asc,_createdAt asc)[0...8]{question,answer}
}`);

type CmsImage = {
  asset?: { _id?: string };
  alt?: string;
  crop?: object;
  hotspot?: object;
};

type HomeData = {
  page?: {
    title?: string;
    heroTitle?: string;
    heroAccent?: string;
    heroDescription?: string;
    heroImage?: {asset?: {url?: string}; alt?: string};
    announcement?: string;
    primaryCta?: string;
    primaryCtaUrl?: string;
    secondaryCta?: string;
    secondaryCtaUrl?: string;
    useSanitySections?: boolean;
    sections?: SitePageContent["sections"];
  } | null;
  assets?: Array<{
    slot: string;
    title?: string;
    alt?: string;
    image?: unknown;
  }>;
  insights?: Array<{
    title: string;
    category?: string;
    excerpt?: string;
    url?: string;
    slug?: { current?: string };
    image?: CmsImage;
  }>;
  industries?: Array<{
    title: string;
    description?: string;
    slug?: { current?: string };
    image?: CmsImage;
  }>;
  faqs?: Array<{ question: string; answer: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return getSitePageMetadata("home", "/");
}

export default async function HomePage() {
  const data = await sanityClient
    .fetch<HomeData>(HOME_QUERY)
    .catch(() => ({}) as HomeData);
  const images = Object.fromEntries(
    (data.assets || [])
      .filter((asset) => asset.image)
      .map((asset) => [
        asset.slot,
        {
          src: urlForImage(asset.image).width(1400).auto("format").url(),
          alt: asset.alt || asset.title || "",
        },
      ]),
  );
  const insights = (data.insights || []).map((item) => ({
    title: item.title,
    category: item.category,
    excerpt: item.excerpt,
    url: item.slug?.current ? `/resources/${item.slug.current}` : item.url,
    image: item.image?.asset
      ? {
          src: urlForImage(item.image).width(900).auto("format").url(),
          alt: item.image.alt || item.title,
        }
      : images[
          [
            "homepage-home-insights-legacy-modernization",
            "homepage-home-insights-ai-app-maintenance",
            "homepage-home-insights-ai-voice-agents",
          ][(data.insights || []).indexOf(item) % 3]
        ],
  }));
  const homeInsights = insights.length
    ? insights
    : [
        {
          title: "Legacy Application Modernization Services: Approach, Cost and Timeline",
          category: "BLOG",
          excerpt: "A practical guide to modernization approaches, project timelines, and the costs involved in replacing or upgrading legacy systems.",
          url: "/resources",
          image: images["homepage-home-insights-legacy-modernization"],
        },
        {
          title: "AI App Maintenance and MLOps: Post-Launch Monitoring, Retraining and Cost",
          category: "BLOG",
          excerpt: "How to keep application health, data pipelines, models, and integrations working after launch with a thoughtful MLOps plan.",
          url: "/resources",
          image: images["homepage-home-insights-ai-app-maintenance"],
        },
        {
          title: "What Are AI Voice Agents? Automate Phone Calls in Minutes",
          category: "BLOG",
          excerpt: "How AI voice agents understand callers, respond in real time, and help teams automate everyday phone workflows.",
          url: "/resources",
          image: images["homepage-home-insights-ai-voice-agents"],
        },
      ];
  const industries = (data.industries || []).map((item) => ({
    title: item.title,
    description: item.description,
    slug: item.slug?.current,
    image: item.image?.asset
      ? {
          src: urlForImage(item.image)
            .width(1800)
            .height(950)
            .fit("crop")
            .auto("format")
            .url(),
          alt: item.image.alt || item.title,
        }
      : images[
          item.title.toLowerCase().includes("health")
            ? "homepage-industry-healthcare"
            : item.title.toLowerCase().includes("education")
              ? "homepage-industry-education"
              : item.title.toLowerCase().includes("transport") ||
                  item.title.toLowerCase().includes("logistic")
                ? "homepage-industry-transport"
                : item.title.toLowerCase().includes("real estate")
                  ? "homepage-industry-real-estate"
                  : item.title.toLowerCase().includes("travel")
                    ? "homepage-industry-travel"
                    : item.title.toLowerCase().includes("media")
                      ? "homepage-industry-media"
                      : item.title.toLowerCase().includes("delivery")
                        ? "homepage-industry-on-demand"
                        : "homepage-industry-ecommerce"
        ],
  }));
  const primaryIndustries = [
    ["Healthcare & Lifesciences", "healthcare", /health/i],
    ["E-Commerce Solutions", "ecommerce", /e-?commerce|fintech/i],
    ["Transport & Logistics", "transport", /transport|logistic/i],
    ["Real Estate", "real-estate", /real estate/i],
  ] as const;
  const primaryIndustryRecords = primaryIndustries.map(([title, key, match]) => {
    const record = industries.find((industry) => match.test(industry.title));
    return {
      title,
      slug: record?.slug || title.toLowerCase().replaceAll(" ", "-"),
      description: record?.description,
      image: record?.image || images[`homepage-industry-${key}`],
    };
  });
  const matchedPrimaryTitles = primaryIndustries
    .map(([, , match]) => industries.find((industry) => match.test(industry.title)))
    .filter((industry): industry is (typeof industries)[number] => Boolean(industry));
  const homeIndustries = [
    ...primaryIndustryRecords,
    ...industries.filter((industry) => !matchedPrimaryTitles.includes(industry)),
  ];
  return (
    <CmsNativePageGate page={data.page || null} label="Kodrise Home">
    <HomeExperience
      images={images}
      insights={homeInsights}
      industries={homeIndustries}
      faqs={data.faqs || []}
      hero={data.page || undefined}
    />
    </CmsNativePageGate>
  );
}

import {sanityClient} from './client'
import type {Metadata} from 'next'

export type SitePageContent = {
  title?: string
  heroTitle?: string
  heroAccent?: string
  heroDescription?: string
  heroImage?: {asset?: {_id?: string; url?: string}; crop?: unknown; hotspot?: unknown}
  announcement?: string
  primaryCta?: string
  primaryCtaUrl?: string
  secondaryCta?: string
  secondaryCtaUrl?: string
  useSanitySections?: boolean
  sections?: Array<{
    layout?: 'text' | 'cards' | 'list' | 'cta' | 'faq'
    eyebrow?: string
    heading?: string
    body?: string
    image?: {asset?: {url?: string}; alt?: string}
    items?: Array<{title?: string; description?: string; href?: string; image?: {asset?: {url?: string}; alt?: string}}>
    buttonLabel?: string
    buttonUrl?: string
  }>
  careerIntroTitle?: string
  careerIntroDescription?: string
  careerDisciplineOneTitle?: string
  careerDisciplineOneDescription?: string
  careerDisciplineTwoTitle?: string
  careerDisciplineTwoDescription?: string
  careerDisciplineThreeTitle?: string
  careerDisciplineThreeDescription?: string
  careerDisciplineFourTitle?: string
  careerDisciplineFourDescription?: string
  detailSolutionsHeading?: string
  detailSolutionsIntro?: string
  detailSolutionsItems?: string
  detailCapabilitiesHeading?: string
  detailCapabilitiesIntro?: string
  detailCapabilityItems?: string
  detailIndustriesIntro?: string
  detailIndustryItems?: string
  detailWhyIntro?: string
  detailWhyItems?: string
  detailCreativeHeading?: string
  detailCreativeIntro?: string
  detailCreativeItems?: string
  detailTechnologyIntro?: string
  detailTechnologyItems?: string
  detailCaseStudiesIntro?: string
  detailFaqItems?: string
  shopifySeoIntroHeading?: string
  shopifySeoIntroCopy?: string
  shopifySeoTrustLabel?: string
  shopifySeoCtaHeading?: string
  shopifySeoCtaCopy?: string
  shopifySeoCtaLabel?: string
  shopifySeoCtaUrl?: string
  shopifySeoRelatedHeading?: string
  shopifySeoRelatedItems?: string
  seo?: {title?: string; description?: string; noIndex?: boolean; image?: {asset?: {url?: string}}}
}

export async function getSitePage(pageKey: string) {
  try {
    return await sanityClient.fetch<SitePageContent | null>(
      `*[_type == "sitePage" && pageKey == $pageKey][0]{title, heroTitle, heroAccent, heroDescription, heroImage {asset->{_id, url}, crop, hotspot}, announcement, primaryCta, primaryCtaUrl, secondaryCta, secondaryCtaUrl, useSanitySections, sections[]{layout,eyebrow,heading,body,image{asset->{url},alt},items[]{title,description,href,image{asset->{url},alt}},buttonLabel,buttonUrl}, careerIntroTitle, careerIntroDescription, careerDisciplineOneTitle, careerDisciplineOneDescription, careerDisciplineTwoTitle, careerDisciplineTwoDescription, careerDisciplineThreeTitle, careerDisciplineThreeDescription, careerDisciplineFourTitle, careerDisciplineFourDescription, detailSolutionsHeading, detailSolutionsIntro, detailSolutionsItems, detailCapabilitiesHeading, detailCapabilitiesIntro, detailCapabilityItems, detailIndustriesIntro, detailIndustryItems, detailWhyIntro, detailWhyItems, detailCreativeHeading, detailCreativeIntro, detailCreativeItems, detailTechnologyIntro, detailTechnologyItems, detailCaseStudiesIntro, detailFaqItems, shopifySeoIntroHeading, shopifySeoIntroCopy, shopifySeoTrustLabel, shopifySeoCtaHeading, shopifySeoCtaCopy, shopifySeoCtaLabel, shopifySeoCtaUrl, shopifySeoRelatedHeading, shopifySeoRelatedItems, seo {title, description, noIndex, image {asset->{url}}}}`,
      {pageKey},
    )
  } catch {
    return null
  }
}

export async function getSitePageMetadata(pageKey: string, route: string): Promise<Metadata> {
  const page = await getSitePage(pageKey);
  const seo = page?.seo;
  const imageUrl = seo?.image?.asset?.url;
  const fallbackTitle = route === "/" ? "Kodrise | AI-native products and engineering teams" : page?.title;
  return {
    title: {absolute: seo?.title || fallbackTitle || "Kodrise"},
    ...(seo?.description ? {description: seo.description} : {}),
    ...(seo?.noIndex ? {robots: {index: false, follow: false}} : {}),
    ...(imageUrl ? {openGraph: {images: [{url: imageUrl}]}, twitter: {images: [imageUrl]}} : {}),
    alternates: {canonical: route},
  };
}

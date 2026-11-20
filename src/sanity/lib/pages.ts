import {sanityClient} from './client'
import type {Metadata} from 'next'
import {getCodiantMirrorMetadata} from '@/lib/codiant-mirrors'

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
  seo?: {title?: string; description?: string; noIndex?: boolean; image?: {asset?: {url?: string}}}
}

export async function getSitePage(pageKey: string) {
  try {
    return await sanityClient.fetch<SitePageContent | null>(
      `*[_type == "sitePage" && pageKey == $pageKey][0]{title, heroTitle, heroAccent, heroDescription, heroImage {asset->{_id, url}, crop, hotspot}, announcement, primaryCta, primaryCtaUrl, secondaryCta, secondaryCtaUrl, careerIntroTitle, careerIntroDescription, careerDisciplineOneTitle, careerDisciplineOneDescription, careerDisciplineTwoTitle, careerDisciplineTwoDescription, careerDisciplineThreeTitle, careerDisciplineThreeDescription, careerDisciplineFourTitle, careerDisciplineFourDescription, detailSolutionsHeading, detailSolutionsIntro, detailSolutionsItems, detailCapabilitiesHeading, detailCapabilitiesIntro, detailCapabilityItems, detailIndustriesIntro, detailIndustryItems, detailWhyIntro, detailWhyItems, detailCreativeHeading, detailCreativeIntro, detailCreativeItems, detailTechnologyIntro, detailTechnologyItems, detailCaseStudiesIntro, detailFaqItems, seo {title, description, noIndex, image {asset->{url}}}}`,
      {pageKey},
    )
  } catch {
    return null
  }
}

export async function getSitePageMetadata(pageKey: string, route: string): Promise<Metadata> {
  const [page, archived] = await Promise.all([getSitePage(pageKey), getCodiantMirrorMetadata(route)]);
  const seo = page?.seo;
  const imageUrl = seo?.image?.asset?.url;
  return {
    ...(seo?.title ? {title: {absolute: seo.title}} : archived?.title ? {title: archived.title} : {}),
    ...(seo?.description ? {description: seo.description} : archived?.description ? {description: archived.description} : {}),
    ...(seo?.noIndex ? {robots: {index: false, follow: false}} : {}),
    ...(imageUrl ? {openGraph: {images: [{url: imageUrl}]}, twitter: {images: [imageUrl]}} : {}),
    alternates: {canonical: route},
  };
}

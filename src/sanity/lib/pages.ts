import {sanityClient} from './client'

export type SitePageContent = {
  title?: string
  heroTitle?: string
  heroAccent?: string
  heroDescription?: string
  announcement?: string
  primaryCta?: string
  secondaryCta?: string
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
}

export async function getSitePage(pageKey: string) {
  try {
    return await sanityClient.fetch<SitePageContent | null>(
      `*[_type == "sitePage" && pageKey == $pageKey][0]{title, heroTitle, heroAccent, heroDescription, announcement, primaryCta, secondaryCta, careerIntroTitle, careerIntroDescription, careerDisciplineOneTitle, careerDisciplineOneDescription, careerDisciplineTwoTitle, careerDisciplineTwoDescription, careerDisciplineThreeTitle, careerDisciplineThreeDescription, careerDisciplineFourTitle, careerDisciplineFourDescription}`,
      {pageKey},
    )
  } catch {
    return null
  }
}

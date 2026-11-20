import {defineQuery} from 'next-sanity'

export const serviceSlugsQuery = defineQuery(`
  *[_type == "service" && isPublished != false && defined(slug.current)] | order(title asc) {
    "slug": slug.current
  }
`)

export const serviceBySlugQuery = defineQuery(`
  *[_type == "service" && isPublished != false && (slug.current == $slug || (slug.current == "devops-and-cloud" && $slug == "devops-cloud-security"))][0] {
    title,
    slug,
    eyebrow,
    lead,
    overview,
    skills,
    useCases,
    benefits
  }
`)

export const caseStudiesQuery = defineQuery(`
  *[_type == "caseStudy"] | order(client asc) {
    client,
    title,
    stack,
    outcome
  }
`)

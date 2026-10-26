import {defineQuery} from 'next-sanity'

export const serviceSlugsQuery = defineQuery(`
  *[_type == "service" && defined(slug.current)] | order(title asc) {
    "slug": slug.current
  }
`)

export const serviceBySlugQuery = defineQuery(`
  *[_type == "service" && (slug.current == $slug || (slug.current == "devops-and-cloud" && $slug == "devops-cloud-security"))][0] {
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

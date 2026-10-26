import {sanityClient} from "../../sanity/lib/client";
import {getAdminSession} from "../../lib/admin-session";
import AdminDashboard from "./admin-dashboard";

export const dynamic = "force-dynamic";

const adminQuery = `{
  "services": *[_type == "service"] | order(title asc) {
    _id, _type, title, "slug": slug.current, eyebrow, lead, overview, skills, useCases, benefits
  },
  "caseStudies": *[_type == "caseStudy"] | order(client asc) {
    _id, _type, client, title, stack, outcome
  },
  "developers": *[_type == "developer"] | order(profileId asc) {
    _id, _type, profileId, name, role, experience, skills, availability, engagement
  },
  "jobs": *[_type == "job"] | order(title asc) {
    _id, _type, title, "slug": slug.current, location, employmentType, summary, skills, isOpen
  },
  "pages": *[_type == "sitePage"] | order(pageKey asc) {
    _id, _type, pageKey, title, heroTitle, heroAccent, heroDescription, announcement, primaryCta, secondaryCta, careerIntroTitle, careerIntroDescription, careerDisciplineOneTitle, careerDisciplineOneDescription, careerDisciplineTwoTitle, careerDisciplineTwoDescription, careerDisciplineThreeTitle, careerDisciplineThreeDescription, careerDisciplineFourTitle, careerDisciplineFourDescription,
    seo {title, description, image, noIndex},
    "seoTitle": seo.title, "seoDescription": seo.description, "seoImage": seo.image, "seoNoIndex": seo.noIndex
  },
  "leads": *[_type == "lead"] | order(createdAt desc) {
    _id, _type, name, email, company, technology, engagement, message, status, createdAt
  },
  "applications": *[_type == "jobApplication"] | order(createdAt desc) {
    _id, _type, name, email, role, linkedin, portfolio, message, resumeUrl, status, createdAt
  },
  "testimonials": *[_type == "testimonial"] | order(createdAt desc) {
    _id, _type, name, role, company, quote, rating, status, featured, createdAt
  },
  "settings": *[_type == "siteSettings"] | order(_createdAt asc) {
    _id, _type, siteName, tagline, contactEmail, phone, address, linkedin, x, instagram,
    seoTitleTemplate, seoDescriptionTemplate, canonicalBase, defaultSchemaType, targetKeywords, competitorDomains, competitorProvider, keywordProvider, backlinkProvider, backlinkSource, analyticsProperty, performanceProvider
  }
}`;

const emptyContent = {
  services: [],
  caseStudies: [],
  developers: [],
  jobs: [],
  pages: [],
  leads: [],
  applications: [],
  testimonials: [],
  settings: [],
};

export default async function AdminPage() {
  let content = emptyContent;
  try {
    content = await sanityClient.fetch(adminQuery);
  } catch (error) {
    console.error("Unable to load dashboard content from Sanity:", error);
  }
  const session = await getAdminSession();
  return <AdminDashboard initialContent={content} isAdmin={session?.role === "admin"} sessionEmail={session?.email || ""} />;
}

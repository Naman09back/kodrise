import {sanityClient} from "../../sanity/lib/client";
import {getAdminSession} from "../../lib/admin-session";
import AdminDashboard from "./admin-dashboard";

export const dynamic = "force-dynamic";

const adminQuery = `{
  "services": *[_type == "service"] | order(title asc) {
    _id, _type, title, "slug": slug.current, eyebrow, lead, overview, skills, useCases, benefits, isPublished,
    image {asset->{_id, url, metadata {dimensions {width, height}}}, alt, hotspot, crop}
  },
  "industries": *[_type == "industry"] | order(title asc) {
    _id, _type, title, "slug": slug.current, description, isFeatured,
    image {asset->{_id, url, metadata {dimensions {width, height}}}, alt, hotspot, crop}
  },
  "insights": *[_type == "insight"] | order(_createdAt desc) {
    _id, _type, title, "slug": slug.current, category, excerpt, body, author, publishedAt, url, isPublished, isFeatured,
    image {asset->{_id, url, metadata {dimensions {width, height}}}, alt, hotspot, crop}
  },
  "resources": *[_type == "resource"] | order(order asc, _createdAt asc) {
    _id, _type, title, category, excerpt, url, isPublished, order,
    image {asset->{_id, url, metadata {dimensions {width, height}}}, alt, hotspot, crop}
  },
  "faqs": *[_type == "faq"] | order(order asc, _createdAt asc) {
    _id, _type, question, answer, order, isPublished
  },
  "caseStudies": *[_type == "caseStudy"] | order(client asc) {
    _id, _type, client, title, "slug": slug.current, stack, outcome, description, challenge, solution, technologies, isFeatured, isPublished,
    image {asset->{_id, url, metadata {dimensions {width, height}}}, alt, hotspot, crop}
  },
  "developers": *[_type == "developer"] | order(profileId asc) {
    _id, _type, profileId, name, role, experience, skills, availability, engagement, isPublished
  },
  "jobs": *[_type == "job"] | order(title asc) {
    _id, _type, title, "slug": slug.current, location, employmentType, summary, skills, isOpen
  },
  "pages": *[_type == "sitePage" && path in ["/","/shopify-development","/shopify-app-development-company","/services/shopify-website-development","/services/shopify-development","/services/recover-shopify-abandoned-checkouts","/services","/services/generative-ai-development-company","/services/ai-agents-and-automation-solutions","/services/ai-app-development-company","/services/ai-chatbot-development-company","/services/machine-learning","/services/nlp-development","/services/rag-as-a-service","/services/outsourcing-ai-development","/ai-consulting-services","/about","/portfolio","/resources/blogs","/devresources","/careers","/contact"]] | order(path asc) {
    _id, _type, pageKey, path, family, isPublished, title, heroTitle, heroAccent, heroDescription, heroImage {asset->{_id,url},alt}, announcement, primaryCta, primaryCtaUrl, secondaryCta, secondaryCtaUrl, careerIntroTitle, careerIntroDescription, careerDisciplineOneTitle, careerDisciplineOneDescription, careerDisciplineTwoTitle, careerDisciplineTwoDescription, careerDisciplineThreeTitle, careerDisciplineThreeDescription, careerDisciplineFourTitle, careerDisciplineFourDescription,
    detailSolutionsHeading, detailSolutionsIntro, detailSolutionsItems, detailCapabilitiesHeading, detailCapabilitiesIntro, detailCapabilityItems,
    detailIndustriesIntro, detailIndustryItems, detailWhyIntro, detailWhyItems, detailCreativeHeading, detailCreativeIntro, detailCreativeItems,
    detailTechnologyIntro, detailTechnologyItems, detailCaseStudiesIntro, detailFaqItems,
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
  },
  "assets": *[_type == "siteAsset"] | order(slot asc) {
    _id, _type, slot, title, alt, sourcePath,
    image {asset->{_id, url, metadata {dimensions {width, height}}}, alt, hotspot, crop}
  }
}`;

const emptyContent = {
  services: [],
  industries: [],
  insights: [],
  resources: [],
  faqs: [],
  caseStudies: [],
  developers: [],
  jobs: [],
  pages: [],
  leads: [],
  applications: [],
  testimonials: [],
  settings: [],
  assets: [],
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

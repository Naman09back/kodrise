import {NextResponse} from "next/server";
import {NextRequest} from "next/server";
import {createClient} from "next-sanity";
import {getAdminSession} from "../../../../lib/admin-session";

const allowedFields: Record<string, string[]> = {
  service: ["title", "eyebrow", "lead", "overview", "skills", "useCases", "benefits"],
  caseStudy: ["client", "title", "stack", "outcome"],
  developer: ["profileId", "name", "role", "experience", "skills", "availability", "engagement"],
  job: ["title", "location", "employmentType", "summary", "skills", "isOpen"],
  sitePage: ["title", "heroTitle", "heroAccent", "heroDescription", "announcement", "primaryCta", "secondaryCta", "careerIntroTitle", "careerIntroDescription", "careerDisciplineOneTitle", "careerDisciplineOneDescription", "careerDisciplineTwoTitle", "careerDisciplineTwoDescription", "careerDisciplineThreeTitle", "careerDisciplineThreeDescription", "careerDisciplineFourTitle", "careerDisciplineFourDescription", "seoTitle", "seoDescription", "seoNoIndex", "seoImage"],
  lead: ["status"],
  jobApplication: ["status"],
  testimonial: ["name", "role", "company", "quote", "rating", "status", "featured"],
  siteSettings: ["siteName", "tagline", "contactEmail", "phone", "address", "linkedin", "x", "instagram", "seoTitleTemplate", "seoDescriptionTemplate", "canonicalBase", "defaultSchemaType", "targetKeywords", "competitorDomains", "competitorProvider", "keywordProvider", "backlinkProvider", "backlinkSource", "analyticsProperty", "performanceProvider"],
};

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({error: "Authentication required."}, {status: 401});
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) return NextResponse.json({error: "SANITY_API_WRITE_TOKEN is missing in .env.local."}, {status: 503});
  const body = await request.json();
  const fields = allowedFields[body._type] || [];
  const patch = Object.fromEntries(Object.entries(body.patch || {}).filter(([key]) => fields.includes(key)));
  if (!body._id || !fields.length) return NextResponse.json({error: "Invalid content update."}, {status: 400});
  const client = createClient({projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "5vojr174", dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production", apiVersion: "2026-02-01", token, useCdn: false});
  if (body._type === "sitePage" && ("seoTitle" in patch || "seoDescription" in patch || "seoNoIndex" in patch || "seoImage" in patch)) {
    const current = await client.fetch<{seo?: Record<string, unknown>} | null>(`*[_id == $id][0]{seo}`, {id: body._id});
    patch.seo = {...(current?.seo || {}), ...("seoTitle" in patch ? {title: patch.seoTitle} : {}), ...( "seoDescription" in patch ? {description: patch.seoDescription} : {}), ...( "seoNoIndex" in patch ? {noIndex: patch.seoNoIndex} : {}), ...( "seoImage" in patch ? {image: patch.seoImage} : {})};
    delete patch.seoTitle;
    delete patch.seoDescription;
    delete patch.seoNoIndex;
    delete patch.seoImage;
  }
  await client.patch(body._id).set(patch).commit();
  return NextResponse.json({ok: true});
}

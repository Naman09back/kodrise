import fs from "node:fs";
import path from "node:path";
import {createClient} from "next-sanity";

const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)=(.*)\s*$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
  }
}

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) throw new Error("SANITY_API_WRITE_TOKEN is missing in .env.local");
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "5vojr174",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-02-01",
  token,
  useCdn: false,
});

const assetSlots = ["nlp-banner","nlp-text-mining","nlp-enterprise-search","nlp-contextual-content","nlp-industries","nlp-process"];
for (const slot of assetSlots) {
  const asset = await client.fetch('*[_type == "siteAsset" && slot == $slot][0]{_id, sourceLicense, licenseVerifiedAt, "assetId": image.asset._ref}', {slot});
  if (!asset?._id || !asset.assetId || !asset.sourceLicense || !asset.licenseVerifiedAt) {
    throw new Error(`Seed the rights-reviewed image for ${slot} through the Sanity media library before running this page seeder.`);
  }
}

const pageKey = "/services/nlp-development";
const content = JSON.parse(fs.readFileSync(path.join(process.cwd(), "content/nlp-development-page.json"), "utf8"));
const lines = (items) => items.map((item) => `${item.title} :: ${item.description}`).join("\n");
const pagePatch = {
  title: "NLP Development",
  family: "AI Services",
  announcement: content.hero.eyebrow,
  heroTitle: content.hero.title,
  heroAccent: content.hero.accent,
  heroDescription: content.hero.description,
  primaryCta: content.hero.cta,
  primaryCtaUrl: content.hero.ctaUrl,
  detailSolutionsHeading: content.solutions.heading,
  detailSolutionsIntro: content.solutions.intro,
  detailSolutionsItems: lines(content.solutions.items),
  detailCapabilitiesHeading: content.capabilities.heading,
  detailCapabilitiesIntro: content.capabilities.intro,
  detailCapabilityItems: lines(content.capabilities.items),
  detailIndustriesIntro: content.industries.intro,
  detailIndustryItems: lines(content.industries.items),
  detailWhyIntro: content.why.intro,
  detailWhyItems: lines(content.why.items),
  detailCreativeHeading: content.creative.heading,
  detailCreativeIntro: content.creative.intro,
  detailCreativeItems: lines(content.creative.items),
  detailTechnologyIntro: content.technology.intro,
  detailTechnologyItems: content.technology.groups.map((group) => `${group.title} :: ${group.items.join(", ")}`).join("\n"),
  detailCaseStudiesIntro: content.caseStudiesIntro,
  detailFaqItems: content.faqs.map((item) => `${item.question} :: ${item.answer}`).join("\n"),
  seo: {
    title: "Natural Language Processing Services | Kodrise",
    description: "Build NLP systems that understand language, automate workflows, and turn unstructured text into useful insight.",
  },
};
const page = await client.fetch('*[_type == "sitePage" && pageKey == $key][0]{_id}', {key: pageKey});
if (!page?._id) throw new Error(`The imported NLP Development page record was not found in Sanity (${pageKey}).`);
const heroAsset = await client.fetch('*[_type == "siteAsset" && slot == "nlp-banner"][0]{"assetId":image.asset._ref}');
if (heroAsset?.assetId) pagePatch.heroImage = {_type: "image", asset: {_type: "reference", _ref: heroAsset.assetId}};
await client.patch(page._id).set(pagePatch).commit({visibility: "sync"});
console.log("Updated NLP Development content and hero image in Sanity.");

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

const assets = [
  ["consulting-banner", "AI Consulting page hero", "AI consulting strategy for business transformation", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/05/ai-outsourcing-banner-906da64ff57345a601bcf8807ad4e62d.webp"],
  ["consulting-strategy", "AI consulting and business impact", "AI strategy creating real business impact", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/07/what-makes-ebd83293e15f358a34de4f3e805d8469.webp"],
  ["consulting-private-ai", "Private AI and secure implementation", "Secure AI systems built around business requirements", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/05/ai-outsourcing-banner-906da64ff57345a601bcf8807ad4e62d.webp"],
  ["consulting-automation", "AI driven workflow case study", "AI powered recruitment workflow and automation", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/07/custom-retriever-pipelines-485647024b3598cebfa72f5b68546662.webp"],
  ["consulting-industries", "AI expertise across business operations", "AI consulting for business growth and transformation", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/07/what-makes-ebd83293e15f358a34de4f3e805d8469.webp"],
  ["consulting-process", "AI consulting workflow", "AI strategy from opportunity discovery to implementation", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/07/custom-retriever-pipelines-485647024b3598cebfa72f5b68546662.webp"],
];

for (const [slot, title, alt, url] of assets) {
  const existing = await client.fetch('*[_type == "siteAsset" && slot == $slot][0]{_id, "assetId": image.asset._ref}', {slot});
  if (existing?._id && existing.assetId) {
    await client.patch(existing._id).set({title, alt}).commit({visibility: "sync"});
    console.log(`Reused ${slot} from Sanity.`);
    continue;
  }
  const response = await fetch(url, {headers: {"user-agent": "Kodrise website asset importer/1.0"}});
  if (!response.ok) throw new Error(`Could not download ${slot}: HTTP ${response.status}`);
  const filename = url.split("/").pop();
  const contentType = response.headers.get("content-type") || "image/webp";
  const uploaded = await client.assets.upload("image", Buffer.from(await response.arrayBuffer()), {filename, contentType});
  const doc = {_type: "siteAsset", slot, title, alt, image: {_type: "image", asset: {_type: "reference", _ref: uploaded._id}}};
  if (existing?._id) await client.patch(existing._id).set(doc).commit({visibility: "sync"});
  else await client.create(doc, {visibility: "sync"});
  console.log(`Uploaded ${slot} to Sanity.`);
}

const pageKey = "/ai-consulting-services";
const content = JSON.parse(fs.readFileSync(path.join(process.cwd(), "content/ai-consulting-page.json"), "utf8"));
const lines = (items) => items.map((item) => `${item.title} :: ${item.description}`).join("\n");
const pagePatch = {
  title: "AI Consulting",
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
    title: "AI Consulting | Kodrise",
    description: "Discover practical AI opportunities, assess readiness, and plan a secure roadmap for implementation with Kodrise AI consultants.",
  },
};
const page = await client.fetch('*[_type == "sitePage" && pageKey == $key][0]{_id}', {key: pageKey});
if (!page?._id) throw new Error(`The imported AI Consulting page record was not found in Sanity (${pageKey}).`);
const heroAsset = await client.fetch('*[_type == "siteAsset" && slot == "consulting-banner"][0]{"assetId":image.asset._ref}');
if (heroAsset?.assetId) pagePatch.heroImage = {_type: "image", asset: {_type: "reference", _ref: heroAsset.assetId}};
await client.patch(page._id).set(pagePatch).commit({visibility: "sync"});
console.log("Updated AI Consulting content and hero image in Sanity.");

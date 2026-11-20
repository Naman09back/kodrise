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
  ["machine-learning-banner", "Machine Learning page hero", "Machine learning development and data intelligence", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/03/banner-ccbc890990b876ae799218f64407e390.webp"],
  ["ml-aws", "Machine learning on AWS", "Amazon Web Services cloud platform", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/03/amazon-web-services-0627b1e4656f796ae0ab4e0610b48781.webp"],
  ["ml-google-cloud", "Machine learning on Google Cloud", "Google Cloud Platform", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/03/google-cloud-884c4beddd8c98bb3b016bdfcc1bcdf8.webp"],
  ["ml-azure", "Machine learning on Microsoft Azure", "Microsoft Azure cloud platform", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/03/microsoft-azure-adc9333d783fcfb3482a36f90dd92f00.webp"],
  ["machine-learning-industries", "Machine learning business advantages", "Business benefits of machine learning", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/03/key-advantages-cbccac5da96955c87ce64033d54c35c4.webp"],
  ["machine-learning-process", "Machine learning process and model operations", "Machine learning model delivery and optimization", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/03/key-advantages-cbccac5da96955c87ce64033d54c35c4.webp"],
];

for (const [slot, title, alt, url] of assets) {
  const response = await fetch(url, {headers: {"user-agent": "Kodrise website asset importer/1.0"}});
  if (!response.ok) throw new Error(`Could not download ${slot}: HTTP ${response.status}`);
  const filename = url.split("/").pop();
  const contentType = response.headers.get("content-type") || "image/webp";
  const uploaded = await client.assets.upload("image", Buffer.from(await response.arrayBuffer()), {filename, contentType});
  const existing = await client.fetch('*[_type == "siteAsset" && slot == $slot][0]{_id}', {slot});
  const doc = {_type: "siteAsset", slot, title, alt, image: {_type: "image", asset: {_type: "reference", _ref: uploaded._id}}};
  if (existing?._id) await client.patch(existing._id).set(doc).commit({visibility: "sync"});
  else await client.create(doc, {visibility: "sync"});
  console.log(`Uploaded ${slot} to Sanity.`);
}

const pageKey = "/services/machine-learning";
const content = JSON.parse(fs.readFileSync(path.join(process.cwd(), "content/machine-learning-page.json"), "utf8"));
const lines = (items) => items.map((item) => `${item.title} :: ${item.description}`).join("\n");
const pagePatch = {
  title: "Machine Learning",
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
    title: "Machine Learning Development Services | Kodrise",
    description: "Build custom machine learning solutions for forecasting, recommendations, computer vision, and better business decisions.",
  },
};
const page = await client.fetch('*[_type == "sitePage" && pageKey == $key][0]{_id}', {key: pageKey});
if (!page?._id) throw new Error(`The imported Machine Learning page record was not found in Sanity (${pageKey}).`);
const heroAsset = await client.fetch('*[_type == "siteAsset" && slot == "machine-learning-banner"][0]{"assetId":image.asset._ref}');
if (heroAsset?.assetId) pagePatch.heroImage = {_type: "image", asset: {_type: "reference", _ref: heroAsset.assetId}};
await client.patch(page._id).set(pagePatch).commit({visibility: "sync"});
console.log("Updated Machine Learning content and hero image in Sanity.");

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
  ["rag-banner", "RAG as a Service page hero", "Retrieval augmented generation and grounded AI assistance", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/07/banner-319fd8c45a08ab006ad64523becfa651.webp"],
  ["rag-retriever", "Custom retriever pipelines", "Custom information retrieval pipelines for RAG systems", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/07/custom-retriever-pipelines-485647024b3598cebfa72f5b68546662.webp"],
  ["rag-vector-store", "Vector store optimization", "Vector database and semantic search architecture", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/07/vector-store-optimization-544035acdb3b96aa39951d02e3e69e14.webp"],
  ["rag-chunking", "Metadata filtering and chunking", "Document preparation and metadata filtering for retrieval", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/07/metadata-filtering-chunking-128433173bd991b5f6d7493f2d98ffcc.webp"],
  ["rag-industries", "RAG implementation benefits", "Grounded AI answers from current, trusted knowledge", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/07/what-makes-ebd83293e15f358a34de4f3e805d8469.webp"],
  ["rag-process", "RAG development process", "A RAG pipeline from data sources to grounded AI response", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/07/custom-retriever-pipelines-485647024b3598cebfa72f5b68546662.webp"],
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

const pageKey = "/services/rag-as-a-service";
const content = JSON.parse(fs.readFileSync(path.join(process.cwd(), "content/rag-as-a-service-page.json"), "utf8"));
const lines = (items) => items.map((item) => `${item.title} :: ${item.description}`).join("\n");
const pagePatch = {
  title: "RAG as a Service",
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
    title: "RAG as a Service | Kodrise",
    description: "Build retrieval-augmented generation systems that ground AI responses in relevant business knowledge and sources.",
  },
};
const page = await client.fetch('*[_type == "sitePage" && pageKey == $key][0]{_id}', {key: pageKey});
if (!page?._id) throw new Error(`The imported RAG as a Service page record was not found in Sanity (${pageKey}).`);
const heroAsset = await client.fetch('*[_type == "siteAsset" && slot == "rag-banner"][0]{"assetId":image.asset._ref}');
if (heroAsset?.assetId) pagePatch.heroImage = {_type: "image", asset: {_type: "reference", _ref: heroAsset.assetId}};
await client.patch(page._id).set(pagePatch).commit({visibility: "sync"});
console.log("Updated RAG as a Service content and hero image in Sanity.");

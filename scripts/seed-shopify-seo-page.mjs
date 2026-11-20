import fs from "node:fs";
import path from "node:path";
import {createClient} from "next-sanity";
import sharp from "sharp";

const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)=(.*)\s*$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
  }
}
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) throw new Error("SANITY_API_WRITE_TOKEN is missing in .env.local");
const client = createClient({projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "5vojr174", dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production", apiVersion: "2026-02-01", token, useCdn: false});
const content = JSON.parse(fs.readFileSync(path.join(process.cwd(), "content/shopify-seo-page.json"), "utf8"));
const pageKey = "/shopify-services/seo";
const assets = [
  ["shopify-seo-hero", "Shopify SEO page hero", "Shopify SEO specialist researching organic search performance", "https://www.itgeeks.com/images/hero-mkt-seo-a.webp"],
  ["shopify-seo-google-partner", "Google Partner badge", "Certified Google Partner", "https://www.itgeeks.com/images/award-google-partner.png"],
  ["shopify-seo-team", "SEO and marketing team", "The SEO team reviewing a Shopify growth strategy", "https://www.itgeeks.com/images/about-team-b-480w.webp"],
  ["shopify-seo-claude-partner", "Claude Partner Network badge", "Claude Partner Network Certified Services Partner", "https://www.itgeeks.com/images/claude-partner-certified.svg"],
];
for (const [slot, title, alt, url] of assets) {
  const existing = await client.fetch('*[_type == "siteAsset" && slot == $slot][0]{_id, "assetId":image.asset._ref}', {slot});
  if (existing?._id && existing.assetId) {
    await client.patch(existing._id).set({title, alt}).commit({visibility: "sync"});
    console.log(`Reused ${slot} from Sanity.`);
    continue;
  }
  const response = await fetch(url, {headers: {"user-agent": "Kodrise website asset importer/1.0"}});
  if (!response.ok) throw new Error(`Could not download ${slot}: HTTP ${response.status}`);
  const source = Buffer.from(await response.arrayBuffer());
  const isSvg = url.endsWith(".svg");
  const bytes = isSvg ? await sharp(source).png().toBuffer() : source;
  const filename = isSvg ? `${slot}.png` : url.split("/").pop();
  const uploaded = await client.assets.upload("image", bytes, {filename, contentType: isSvg ? "image/png" : response.headers.get("content-type") || "image/webp"});
  const doc = {_type: "siteAsset", slot, title, alt, sourcePath: url, image: {_type: "image", asset: {_type: "reference", _ref: uploaded._id}}};
  if (existing?._id) await client.patch(existing._id).set(doc).commit({visibility: "sync"});
  else await client.create(doc, {visibility: "sync"});
  console.log(`Uploaded ${slot} to Sanity.`);
}
const lines = (items) => items.map((item) => `${item.title} :: ${item.description}`).join("\n");
const patch = {
  title: "Shopify SEO Services",
  pageKey,
  path: pageKey,
  family: "Shopify Services",
  isPublished: true,
  announcement: content.hero.eyebrow,
  heroTitle: content.hero.title,
  heroAccent: content.hero.accent,
  heroDescription: content.hero.description,
  primaryCta: content.hero.cta,
  primaryCtaUrl: content.hero.ctaUrl,
  shopifySeoIntroHeading: content.intro.heading,
  shopifySeoIntroCopy: content.intro.copy,
  shopifySeoTrustLabel: content.intro.trustLabel,
  detailSolutionsHeading: content.services.heading,
  detailSolutionsIntro: content.services.intro,
  detailSolutionsItems: lines(content.services.items),
  detailCapabilitiesHeading: content.expertise.heading,
  detailCapabilitiesIntro: content.expertise.intro,
  detailCapabilityItems: lines(content.expertise.items),
  shopifySeoCtaHeading: content.cta.heading,
  shopifySeoCtaCopy: content.cta.copy,
  shopifySeoCtaLabel: content.cta.label,
  shopifySeoCtaUrl: content.cta.url,
  detailFaqItems: content.faqs.map((item) => `${item.question} :: ${item.answer}`).join("\n"),
  shopifySeoRelatedHeading: content.related.heading,
  shopifySeoRelatedItems: content.related.items.join("\n"),
  seo: {title: "Shopify SEO Services to Grow Organic Traffic | Kodrise", description: "Grow organic traffic for your Shopify store with technical SEO, on-page optimization, analytics, and authority building."},
};
const existingPage = await client.fetch('*[_type == "sitePage" && (pageKey == $key || path == $key)][0]{_id,pageKey,path}', {key: pageKey});
const hero = await client.fetch('*[_type == "siteAsset" && slot == "shopify-seo-hero"][0]{"assetId":image.asset._ref}');
if (hero?.assetId) patch.heroImage = {_type: "image", asset: {_type: "reference", _ref: hero.assetId}};
if (existingPage?._id) await client.patch(existingPage._id).set(patch).commit({visibility: "sync"});
else await client.create({_type: "sitePage", ...patch}, {visibility: "sync"});
console.log(`${existingPage?._id ? "Updated" : "Created"} Shopify SEO page content in Sanity.`);

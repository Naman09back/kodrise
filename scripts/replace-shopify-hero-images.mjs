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

const replacements = [
  {
    slot: "shopify-marketing-hero-marketing-b",
    title: "Commerce growth planning",
    alt: "Colleagues reviewing business analytics together on a laptop",
    file: "shopify-marketing-team.jpg",
    imageUrl: "https://images.pexels.com/photos/39219944/pexels-photo-39219944.jpeg?auto=compress&cs=tinysrgb&w=1920",
    sourceUrl: "https://www.pexels.com/photo/diverse-team-analyzing-data-on-laptop-in-modern-office-39219944/",
    creator: "Vitaly Gariev",
  },
  {
    slot: "shopify-ppc-hero",
    title: "Paid media planning",
    alt: "A professional reviewing campaign performance on a laptop",
    file: "shopify-ppc-campaign.jpg",
    imageUrl: "https://images.pexels.com/photos/7278819/pexels-photo-7278819.jpeg?auto=compress&cs=tinysrgb&w=1920",
    sourceUrl: "https://www.pexels.com/photo/person-working-on-laptop-7278819/",
    creator: "Anastasia Shuraeva",
  },
  {
    slot: "shopify-content-marketing-hero",
    title: "Content strategy planning",
    alt: "A person writing notes beside a laptop while planning content",
    file: "shopify-content-planning.jpg",
    imageUrl: "https://images.pexels.com/photos/5912280/pexels-photo-5912280.jpeg?auto=compress&cs=tinysrgb&w=1920",
    sourceUrl: "https://www.pexels.com/photo/person-writing-on-a-notepad-beside-a-laptop-5912280/",
    creator: "ROMAN ODINTSOV",
  },
  {
    slot: "shopify-social-marketing-hero",
    title: "Social content creation",
    alt: "A creator preparing a short video with a smartphone and ring light",
    file: "shopify-social-content.jpg",
    imageUrl: "https://images.pexels.com/photos/13929962/pexels-photo-13929962.jpeg?auto=compress&cs=tinysrgb&w=1920",
    sourceUrl: "https://www.pexels.com/photo/woman-recording-with-smartphone-13929962/",
    creator: "Mizuno K",
  },
  {
    slot: "shopify-email-marketing-hero",
    title: "Email campaign planning",
    alt: "A marketer organizing campaign ideas beside a laptop",
    file: "shopify-email-planning.jpg",
    imageUrl: "https://images.pexels.com/photos/7278595/pexels-photo-7278595.jpeg?auto=compress&cs=tinysrgb&w=1920",
    sourceUrl: "https://www.pexels.com/photo/person-writing-on-pink-sticky-note-7278595/",
    creator: "Anastasia Shuraeva",
  },
];

for (const replacement of replacements) {
  const existing = await client.fetch('*[_type == "siteAsset" && slot == $slot][0]{_id}', {slot: replacement.slot});
  if (!existing?._id) throw new Error(`Missing Sanity image slot: ${replacement.slot}`);
  const response = await fetch(replacement.imageUrl, {headers: {"User-Agent": "Kodrise website image rights update/1.0"}});
  if (!response.ok) throw new Error(`Could not download ${replacement.slot}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 10_000 || bytes.length > 12_000_000 || !response.headers.get("content-type")?.includes("image")) {
    throw new Error(`Unexpected image response for ${replacement.slot}: ${bytes.length} bytes`);
  }
  const asset = await client.assets.upload("image", bytes, {filename: replacement.file, contentType: response.headers.get("content-type") || "image/jpeg"});
  await client.patch(existing._id).set({
    title: replacement.title,
    alt: replacement.alt,
    sourcePath: `/site-assets/licensed/${replacement.file}`,
    sourceUrl: replacement.sourceUrl,
    sourceCreator: replacement.creator,
    sourceLicense: "Pexels License (free commercial use; attribution optional)",
    licenseVerifiedAt: "2026-11-24",
    image: {_type: "image", asset: {_type: "reference", _ref: asset._id}},
  }).commit({visibility: "sync"});
  console.log(`Updated ${replacement.slot} with the rights-tracked Pexels photo.`);
}

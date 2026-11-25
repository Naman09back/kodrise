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

const imageRecords = [
  ["hero-salesforce.png", "our-work-hero-salesforce", "Salesforce", "https://www.apconsultancy.in/images/figma/hero-collage-salesforce.png"],
  ["hero-uplevyl.png", "our-work-hero-uplevyl", "Uplevyl", "https://www.apconsultancy.in/images/figma/hero-collage-uplevyl.png"],
  ["hero-agility.png", "our-work-hero-agility-insights", "Agility Insights", "https://www.apconsultancy.in/images/figma/hero-collage-agility.png"],
  ["hero-astrazeneca.png", "our-work-hero-astrazeneca", "AstraZeneca", "https://www.apconsultancy.in/images/figma/hero-collage-astrazeneca.png"],
  ["trusted-brands.png", "our-work-trusted-brands", "Trusted delivery — A view of some of the best brands we have worked with.", "https://www.apconsultancy.in/images/figma/trusted-brands-section.png"],
  ["acuity.png", "our-work-acuity-analytics", "Acuity Analytics", "https://www.apconsultancy.in/Card/Acuity.png"],
  ["agility-insights.png", "our-work-agility-insights", "Agility Insights", "https://www.apconsultancy.in/Card/agilty%20insights.png"],
  ["astrazeneca.png", "our-work-astrazeneca", "AstraZeneca", "https://www.apconsultancy.in/Card/astrazeneca.png"],
  ["bath-fitter.png", "our-work-bath-fitter", "Bath Fitter", "https://www.apconsultancy.in/Card/bathfitter.png"],
  ["hdfc-bank.png", "our-work-hdfc-bank", "HDFC Bank", "https://www.apconsultancy.in/Card/hdfc.png"],
  ["propic.png", "our-work-propic", "Propic", "https://www.apconsultancy.in/Card/propic.png"],
  ["rocket-learning.png", "our-work-rocket-learning", "Rocket Learning", "https://www.apconsultancy.in/Card/rocket%20learning.png"],
  ["salesforce.png", "our-work-salesforce", "Salesforce", "https://www.apconsultancy.in/Card/salesforce.png"],
  ["tailored-brands.png", "our-work-tailored-brands", "Tailored Brands", "https://www.apconsultancy.in/Card/Tailoredbrands.png"],
  ["telus.png", "our-work-telus", "Telus", "https://www.apconsultancy.in/Card/telus.png"],
  ["uplevyl.png", "our-work-uplevyl", "Uplevyl", "https://www.apconsultancy.in/Card/uplevyl.png"],
];

const mediaRoot = path.join(process.cwd(), "public", "our-work");
let uploaded = 0;
let unchanged = 0;

for (const [filename, slot, alt, sourceUrl] of imageRecords) {
  const existing = await client.fetch(
    `*[_type == "siteAsset" && slot == $slot][0]{_id, "assetId": image.asset._ref}`,
    {slot},
  );
  if (existing?.assetId) {
    unchanged++;
    continue;
  }

  const localPath = path.join(mediaRoot, filename);
  const asset = await client.assets.upload("image", fs.createReadStream(localPath), {filename});
  const fields = {
    slot,
    title: `Our Work — ${alt}`,
    alt,
    sourcePath: `/our-work/${filename}`,
    sourceUrl,
    image: {_type: "image", asset: {_type: "reference", _ref: asset._id}},
  };

  if (existing?._id) await client.patch(existing._id).set(fields).commit();
  else await client.create({_type: "siteAsset", ...fields});
  uploaded++;
}

console.log(`Uploaded ${uploaded} Our Work images to Sanity; ${unchanged} existing image records were already connected.`);

const connectedAssets = await client.fetch(
  `*[_type == "siteAsset" && slot match "our-work-*"]{_id, slot, title, "assetId": image.asset._ref}`,
);
const slotCounts = new Map();
for (const record of connectedAssets) slotCounts.set(record.slot, (slotCounts.get(record.slot) || 0) + 1);
const duplicateSlots = [...slotCounts].filter(([, count]) => count > 1).map(([slot]) => slot);
let duplicateDocumentsRemoved = 0;
for (const slot of duplicateSlots) {
  const duplicates = connectedAssets.filter((record) => record.slot === slot);
  if (new Set(duplicates.map((record) => record.assetId)).size !== 1) {
    throw new Error(`Conflicting Sanity image assets share the ${slot} slot; leaving them unchanged.`);
  }
  for (const duplicate of duplicates.slice(1)) {
    await client.delete(duplicate._id);
    duplicateDocumentsRemoved++;
  }
}
const finalRecords = connectedAssets.length - duplicateDocumentsRemoved;
console.log(`Sanity has ${finalRecords} connected Our Work image records across ${slotCounts.size} unique slots; removed ${duplicateDocumentsRemoved} duplicate records that referenced the same images.`);

const publicClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "5vojr174",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-02-01",
  useCdn: false,
});
const publicCount = await publicClient.fetch(`count(*[_type == "siteAsset" && slot match "our-work-*"])`).catch(() => -1);
console.log(`Unauthenticated Sanity reads see ${publicCount < 0 ? "no accessible" : publicCount} Our Work image records.`);

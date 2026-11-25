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

const assetSlots = ["generative-ai-banner","generative-ai-discovery","generative-ai-launchpad","generative-ai-adoption","generative-ai-reinvention","generative-ai-applications","generative-ai-consultation"];
for (const slot of assetSlots) {
  const asset = await client.fetch('*[_type == "siteAsset" && slot == $slot][0]{_id, sourceLicense, licenseVerifiedAt, "assetId": image.asset._ref}', {slot});
  if (!asset?._id || !asset.assetId || !asset.sourceLicense || !asset.licenseVerifiedAt) {
    throw new Error(`Seed the rights-reviewed image for ${slot} through the Sanity media library before running this page seeder.`);
  }
}

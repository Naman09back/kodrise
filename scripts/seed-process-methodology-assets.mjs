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
  ["process-methodology-banner", "Process methodology banner", "Kodrise software team working with digital product interfaces", "public/site-assets/process-methodology/hero.webp"],
  ["process-methodology-agile", "Agile collaboration illustration", "Illustration of the iterative product development cycle", "public/site-assets/process-methodology/agile.webp"],
];

for (const [slot, title, alt, relativePath] of assets) {
  const existing = await client.fetch(`*[_type == "siteAsset" && slot == $slot][0]{_id}`, {slot});
  if (existing?._id) continue;
  const filePath = path.join(process.cwd(), relativePath);
  const imageAsset = await client.assets.upload("image", fs.createReadStream(filePath), {filename: path.basename(filePath)});
  await client.create({
    _type: "siteAsset",
    slot,
    title,
    alt,
    sourcePath: `/${relativePath.replaceAll(path.sep, "/")}`,
    image: {_type: "image", asset: {_type: "reference", _ref: imageAsset._id}},
  });
}

console.log("Process methodology images are available as editable Sanity assets.");

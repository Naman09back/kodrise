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

const mediaRoot = path.join(process.cwd(), "public", "site-assets");
const extensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"]);

async function* imageFiles(directory) {
  for (const entry of await fs.promises.readdir(directory, {withFileTypes: true})) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) yield* imageFiles(filePath);
    else if (extensions.has(path.extname(entry.name).toLowerCase())) yield filePath;
  }
}

let created = 0;
let skipped = 0;
for await (const filePath of imageFiles(mediaRoot)) {
  const relativePath = path.relative(mediaRoot, filePath).split(path.sep).join("/");
  const slot = relativePath.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const existing = await client.fetch(`*[_type == "siteAsset" && slot == $slot][0]{_id}`, {slot});
  if (existing?._id) {
    skipped++;
    continue;
  }

  const asset = await client.assets.upload("image", fs.createReadStream(filePath), {filename: path.basename(filePath)});
  const title = path.basename(relativePath, path.extname(relativePath)).replace(/[-_]+/g, " ");
  await client.create({
    _type: "siteAsset",
    slot,
    title,
    alt: title,
    sourcePath: `/site-assets/${relativePath}`,
    image: {_type: "image", asset: {_type: "reference", _ref: asset._id}},
  });
  created++;
}

console.log(`Uploaded ${created} website images to Sanity; kept ${skipped} existing image records unchanged.`);

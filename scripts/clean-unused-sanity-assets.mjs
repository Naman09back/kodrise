import {readdir, readFile} from "node:fs/promises";
import path from "node:path";
import {createClient} from "next-sanity";

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) throw new Error("SANITY_API_WRITE_TOKEN is required.");
const client = createClient({projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "5vojr174", dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production", apiVersion: "2026-02-01", token, useCdn: false});
const root = process.cwd();
const codeRoot = path.join(root, "src");
const codeExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".css", ".mjs"]);

async function sourceFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await sourceFiles(filePath));
    else if (codeExtensions.has(path.extname(entry.name).toLowerCase())) files.push(filePath);
  }
  return files;
}

const source = (await Promise.all((await sourceFiles(codeRoot)).map((file) => readFile(file, "utf8")))).join("\n");
const wildcardPrefixes = [...source.matchAll(/slot\s+match\s+["']([^*"']+)\*["']/g)].map((match) => match[1]);
const assetPathPrefixes = [...source.matchAll(/["'`]([^"'`]*\/site-assets\/[^"'`]*?\/?)["'`]/g)].map((match) => match[1]);
const nativeQuerySlots = new Set([...source.matchAll(/["']([a-z0-9][a-z0-9-]{2,119})["']/gi)].map((match) => match[1]));

const assets = await client.fetch(`*[_type == "siteAsset"]{_id,slot,title,sourcePath,"imageRef":image.asset._ref}`);
const otherDocumentImages = await client.fetch(`*[_type != "siteAsset"]{
  "image": image.asset._ref,
  "hero": heroImage.asset._ref,
  "seo": seo.image.asset._ref,
  "sectionImages": sections[]{"image":image.asset._ref,"items":items[]{"image":image.asset._ref}}
}`);
const otherRefs = new Set();
function collectRefs(value) {
  if (!value) return;
  if (typeof value === "string") return;
  if (Array.isArray(value)) return value.forEach(collectRefs);
  if (typeof value === "object") {
    if (typeof value._ref === "string") otherRefs.add(value._ref);
    Object.values(value).forEach(collectRefs);
  }
}
otherDocumentImages.forEach(collectRefs);

function isUsed(asset) {
  if (!asset.slot) return false;
  if (nativeQuerySlots.has(asset.slot) || source.includes(asset.slot)) return true;
  if (wildcardPrefixes.some((prefix) => asset.slot.startsWith(prefix))) return true;
  if (asset.slot.startsWith("shopify-migration-") || (asset.sourcePath || "").startsWith("/site-assets/shopify-migration/")) return true;
  const sourcePath = (asset.sourcePath || "").replace(/^\/public(?=\/site-assets\/)/, "");
  if (sourcePath && assetPathPrefixes.some((prefix) => prefix.endsWith("/") && sourcePath.startsWith(prefix) || prefix === sourcePath)) return true;
  if (/\/fonts\//.test(sourcePath)) return true;
  return false;
}

const unused = assets.filter((asset) => !isUsed(asset));
const retainedAssetRefs = new Set(assets.filter((asset) => !unused.includes(asset)).map((asset) => asset.imageRef).filter(Boolean));
const safeImageAssets = [...new Set(unused.map((asset) => asset.imageRef).filter((id) => id && !otherRefs.has(id) && !retainedAssetRefs.has(id)))];
const categories = Object.groupBy(unused, (asset) => !asset.sourcePath ? "no source path" : asset.sourcePath.startsWith("/__kodrise_media__/") ? "archived mirror import" : /^https?:/i.test(asset.sourcePath) ? "external source" : "local source");
console.log(JSON.stringify({mode: process.argv.includes("--apply") ? "apply" : "dry-run", siteAssetDocuments: assets.length, retainedSiteAssetDocuments: assets.length - unused.length, unusedSiteAssetDocuments: unused.length, safelyUnreferencedImageAssets: safeImageAssets.length, unusedCategories: Object.fromEntries(Object.entries(categories).map(([key, values]) => [key, values.length])), unusedNonArchiveExamples: unused.filter((asset) => !asset.sourcePath?.startsWith("/__kodrise_media__/" )).slice(0, 50).map(({slot,title,sourcePath}) => ({slot,title,sourcePath}))}, null, 2));

if (!process.argv.includes("--apply")) {
  console.log("Dry run only. Run with --apply to delete unused website image records and unreferenced image assets.");
  process.exit(0);
}

for (let index = 0; index < unused.length; index += 50) {
  const batch = unused.slice(index, index + 50);
  const transaction = client.transaction();
  batch.forEach(({_id}) => transaction.delete(_id));
  await transaction.commit();
}
for (let index = 0; index < safeImageAssets.length; index += 50) {
  const batch = safeImageAssets.slice(index, index + 50);
  const transaction = client.transaction();
  batch.forEach((id) => transaction.delete(id));
  await transaction.commit();
}
const after = await client.fetch(`count(*[_type == "siteAsset"])`);
console.log(JSON.stringify({complete: true, remainingSiteAssetDocuments: after, deletedImageAssets: safeImageAssets.length}, null, 2));

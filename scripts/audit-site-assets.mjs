import {createClient} from "next-sanity";
import {readdir, readFile} from "node:fs/promises";
import path from "node:path";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "5vojr174",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-02-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const assets = await client.fetch(`*[_type == "siteAsset"] | order(slot asc) {
  _id, slot, title, alt, sourcePath, sourceUrl, sourceCreator, sourceLicense, licenseVerifiedAt, "imageRef": image.asset._ref, "imageUrl": image.asset->url
}`);
const contentDocs = await client.fetch(`*[_type in ["service", "industry", "insight", "resource", "caseStudy", "sitePage"]]{
  _id, _type, title, path, pageKey, slug,
  image{asset->{_id}}, heroImage{asset->{_id}}, seo{image{asset->{_id}}},
  sections[]{image{asset->{_id}}, items[]{image{asset->{_id}}}}
}`);
function collectImageRefs(value, refs = []) {
  if (!value || typeof value !== "object") return refs;
  if (value.asset?._id) refs.push(value.asset._id);
  for (const [key, child] of Object.entries(value)) if (key !== "asset") collectImageRefs(child, refs);
  return refs;
}
function collectImageFields(value, prefix = "", paths = []) {
  if (!value || typeof value !== "object") return paths;
  if (value.asset?._id) paths.push(prefix || "image");
  for (const [key, child] of Object.entries(value)) if (key !== "asset") collectImageFields(child, prefix ? `${prefix}.${key}` : key, paths);
  return paths;
}
const contentImageRecords = contentDocs.flatMap((doc) => {
  const refs = collectImageRefs(doc);
  return refs.map((assetRef) => ({_type: doc._type, title: doc.title, assetRef}));
});
async function sourceFiles(dir) {
  const found = [];
  for (const entry of await readdir(dir, {withFileTypes: true})) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...await sourceFiles(file));
    else if (/\.(tsx?|jsx?|css|mjs|json)$/.test(entry.name)) found.push(file);
  }
  return found;
}
const files = [...await sourceFiles("src"), ...await sourceFiles("content")];
const source = (await Promise.all(files.map((file) => readFile(file, "utf8")))).join("\n");
const active = assets.filter((asset) => asset.slot && (source.includes(asset.slot) || source.includes(asset.sourcePath || "\0") || ((asset.slot.startsWith("shopify-migration-") || asset.sourcePath?.includes("/shopify-migration/")) && source.includes("migration"))));
const external = assets.filter((asset) => /^https?:\/\//i.test(asset.sourcePath || ""));
const rightsKnown = (asset) => {
  if (asset.sourceLicense === "Original Kodrise-created vector artwork") return Boolean(asset.sourceCreator && asset.licenseVerifiedAt);
  if (asset.sourceLicense?.startsWith("Pexels License")) return Boolean(asset.sourceUrl && asset.sourceCreator && asset.licenseVerifiedAt);
  if (asset.sourceLicense?.startsWith("Google Gemini AI-generated image")) return Boolean(asset.sourceUrl && asset.sourceCreator && asset.licenseVerifiedAt);
  if (asset.slot?.startsWith("kodrise-logo-")) return true;
  return false;
};
const undocumentedActive = active.filter((asset) => !rightsKnown(asset));
const trackedAssetRefs = new Set(assets.map((asset) => asset.imageRef).filter(Boolean));
const contentImagesWithoutRightsRecord = contentImageRecords.filter((image) => !trackedAssetRefs.has(image.assetRef));
console.log(JSON.stringify({
  total: assets.length,
  active: active.length,
  uniqueActiveImages: new Set(active.map((asset) => asset.imageRef).filter(Boolean)).size,
  activeWithoutRightsMetadata: undocumentedActive.map(({slot, title, sourcePath}) => ({slot, title, sourcePath})),
  nonAssetContentImageRecords: contentImageRecords.length,
  nonAssetContentImagesWithoutRightsRecord: contentImagesWithoutRightsRecord.length,
  nonAssetContentImageCounts: Object.fromEntries([...new Set(contentImageRecords.map((item) => item._type))].map((type) => [type, contentImageRecords.filter((item) => item._type === type).length])),
  nonAssetContentImageDocs: contentDocs.map((doc) => ({_type: doc._type, title: doc.title, path: doc.path || doc.pageKey || doc.slug?.current || "", fields: collectImageFields(doc)})).filter((doc) => doc.fields.length),
  externalSourcePaths: external.map(({slot, title, sourcePath}) => ({slot, title, sourcePath})),
  activeExternalSourcePaths: external.filter((asset) => active.some((item) => item._id === asset._id)).map(({slot, title, sourcePath}) => ({slot, title, sourcePath})),
}, null, 2));

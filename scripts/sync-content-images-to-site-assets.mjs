import {createClient} from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "5vojr174",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-02-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});
if (!process.env.SANITY_API_WRITE_TOKEN) throw new Error("SANITY_API_WRITE_TOKEN is required.");

const siteAssets = await client.fetch(`*[_type == "siteAsset"]{slot, image{..., asset->{_id}}}`);
const bySlot = new Map(siteAssets.filter((asset) => asset.image?.asset?._id).map((asset) => [asset.slot, asset]));
const services = await client.fetch(`*[_type == "service"]{_id,title,image{...,asset->{_id}}}`);
const resources = await client.fetch(`*[_type == "resource"]{_id,title,image{...,asset->{_id}}}`);
const pages = await client.fetch(`*[_type == "sitePage"]{_id,title,path,pageKey,heroImage{...,asset->{_id}},seo{...,image{...,asset->{_id}}}}`);
let updated = 0;

function findSlot(terms) {
  for (const [pattern, slot] of terms) if (pattern.test(slot + " ")) return slot;
  return undefined;
}

async function pointImage(document, field, slot) {
  const target = bySlot.get(slot);
  const current = document[field];
  if (!target?.image?.asset?._id || !current?.asset?._id || current.asset._id === target.image.asset._id) return;
  await client.patch(document._id).set({[field]: {...current, _type: "image", asset: {_type: "reference", _ref: target.image.asset._id}}}).commit();
  updated++;
  console.log(`${document._type || "page"}: ${document.title} -> ${slot}`);
}

const serviceSlots = [
  [/ai/i, "services-ai"], [/web|software/i, "services-web"], [/dedicated|team/i, "services-teams"],
  [/mobile|app/i, "services-mobile"], [/cloud|devops/i, "services-devops"], [/custom/i, "services-custom"],
];
for (const service of services) {
  const slot = serviceSlots.find(([pattern]) => pattern.test(service.title))?.[1];
  if (slot) await pointImage({...service, _type: "service"}, "image", slot);
}

const resourceSlots = [
  [/mobile app cost/i, "services-mobile"], [/web app cost/i, "services-web"], [/rfp/i, "services-teams"],
  [/blogs/i, "homepage-home-insights-ai-app-maintenance"], [/pr updates/i, "homepage-home-insights-legacy-modernization"],
  [/ebooks/i, "services-ai"], [/consultation/i, "consulting-banner"],
];
for (const resource of resources) {
  const slot = resourceSlots.find(([pattern]) => pattern.test(resource.title))?.[1];
  if (slot) await pointImage({...resource, _type: "resource"}, "image", slot);
}

const pageSlots = [
  [/^\/$/, "hero"], [/\/about\/?$/, "about-hero"], [/\/contact\/?$/, "about-partner-photo"], [/\/careers\/?$/, "about-careers-photo"],
  [/ai-agents-and-automation/, "ai-agent-banner"], [/ai-app-development-company/, "ai-app-banner"], [/ai-chatbot-development-company/, "ai-chatbot-banner"],
  [/generative-ai-development-company/, "generative-ai-banner"], [/machine-learning/, "machine-learning-banner"], [/nlp-development/, "nlp-banner"],
  [/outsourcing-ai-development/, "outsourcing-banner"], [/rag-as-a-service/, "rag-banner"], [/shopify-services\/seo/, "shopify-seo-hero"], [/ai-consulting-services/, "consulting-banner"],
];
for (const page of pages) {
  const route = page.path || page.pageKey || "";
  const slot = pageSlots.find(([pattern]) => pattern.test(route))?.[1];
  if (slot && page.heroImage?.asset?._id) await pointImage({...page, _type: "sitePage"}, "heroImage", slot);
  const target = slot ? bySlot.get(slot) : undefined;
  if (target?.image?.asset?._id && page.seo?.image?.asset?._id && page.seo.image.asset._id !== target.image.asset._id) {
    await client.patch(page._id).set({seo: {...page.seo, image: {...page.seo.image, _type: "image", asset: {_type: "reference", _ref: target.image.asset._id}}}}).commit();
    updated++;
    console.log(`SEO image: ${page.title} -> ${slot}`);
  }
}

console.log(`Updated ${updated} Sanity content images to use rights-tracked site image records.`);

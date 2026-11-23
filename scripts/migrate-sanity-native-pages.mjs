import {createClient} from "next-sanity";

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) throw new Error("SANITY_API_WRITE_TOKEN is required.");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "5vojr174",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-02-01",
  token,
  useCdn: false,
});

const migrationSlugs = ["adobe-commerce", "bigcommerce", "woocommerce", "salesforce", "magento", "squarespace", "wix"];
const aiSlugs = ["generative-ai-development-company", "ai-agents-and-automation-solutions", "ai-app-development-company", "ai-chatbot-development-company", "machine-learning", "nlp-development", "rag-as-a-service", "outsourcing-ai-development"];
const shopifySlugs = ["website-design", "website-development", "b2b-ecommerce-solutions", "headless-commerce", "mobile-app-development", "custom-ecommerce-solutions", "marketing", "seo", "ppc", "content-marketing", "social-media-marketing", "email-marketing", "ai-agentic-commerce", "ongoing-support"];
const routes = [
  ["/", "home", "Kodrise Home", "Home"], ["/about", "about", "About Kodrise", "Company"],
  ["/contact", "contact", "Contact Kodrise", "Company"], ["/overview", "overview", "Kodrise Overview", "Company"],
  ["/process-methodology", "process-methodology", "Process Methodology", "Company"],
  ["/services", "services", "AI Services", "AI Services"],
  ["/ai-consulting-services", "/ai-consulting-services", "AI Consulting", "AI Services"],
  ...aiSlugs.map((slug) => [`/services/${slug}`, `/services/${slug}`, slug.replaceAll("-", " "), "AI Services"]),
  ["/shopify-services", "shopify-services", "Shopify Services", "Shopify Services"],
  ...shopifySlugs.map((slug) => [`/shopify-services/${slug}`, `/shopify-services/${slug}`, slug.replaceAll("-", " "), "Shopify Services"]),
  ["/shopify-services/shopify-migration", "/shopify-services/shopify-migration", "Shopify Migration", "Shopify Services"],
  ...migrationSlugs.map((slug) => [`/shopify-services/shopify-migration/${slug}`, `/shopify-services/shopify-migration/${slug}`, `${slug.replaceAll("-", " ")} to Shopify`, "Shopify Services"]),
  ["/portfolio", "portfolio", "Our Work", "Portfolio"], ["/resources", "resources", "Resources", "Resources"],
  ["/careers", "careers", "Careers at Kodrise", "Careers"], ["/devresources", "devresources", "Hire Developers", "Hire Developers"],
];

const definitions = routes.map(([path, pageKey, rawTitle, family]) => {
  const title = String(rawTitle).replace(/\bai\b/gi, "AI").replace(/\bshopify\b/gi, "Shopify").replace(/\bb2b\b/gi, "B2B").replace(/\bppc\b/gi, "PPC").replace(/\bseo\b/gi, "SEO").replace(/\bnlp\b/gi, "NLP");
  return {path, pageKey, title, family};
});
const keepPaths = definitions.map(({path}) => path);
const pages = await client.fetch(`*[_type == "sitePage"]{_id,path,pageKey,"hasHtml":defined(contentHtml),"hasHero":defined(heroTitle),"hasSections":defined(sections)}`);
const duplicateServicesArchive = pages.find((page) => page.path === "/services" && page.pageKey === "/services" && page.hasHtml && !page.hasHero && !page.hasSections);
const deletePages = pages.filter((page) => !keepPaths.includes(page.path) || page._id === duplicateServicesArchive?._id);
const retainPages = pages.filter((page) => keepPaths.includes(page.path) && page._id !== duplicateServicesArchive?._id);
const missingDefinitions = definitions.filter(({path}) => !retainPages.some((page) => page.path === path));

console.log(JSON.stringify({mode: process.argv.includes("--apply") ? "apply" : "dry-run", nativeRouteCount: definitions.length, existingNativeDocs: retainPages.length, createDocs: missingDefinitions.length, deleteArchivedDocs: deletePages.length, removeArchivedMarkup: retainPages.filter((page) => page.hasHtml).length, duplicateServicesArchive: duplicateServicesArchive?._id || null}, null, 2));
if (!process.argv.includes("--apply")) {
  console.log("Dry run only. Run with --apply to remove archived page documents and seed native page records.");
  process.exit(0);
}

for (let index = 0; index < deletePages.length; index += 50) {
  const batch = deletePages.slice(index, index + 50);
  const transaction = client.transaction();
  batch.forEach(({_id}) => transaction.delete(_id));
  await transaction.commit();
}

for (const page of retainPages) {
  const definition = definitions.find((item) => item.path === page.path);
  if (!definition) continue;
  await client.patch(page._id)
    .set({pageKey: definition.pageKey, title: definition.title, family: definition.family})
    .unset(["contentHtml", "sourceRouteId", "sourceUrl"])
    .commit();
}

for (const definition of missingDefinitions) {
  const id = `nativePage-${definition.path.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "home"}`;
  await client.createIfNotExists({_id: id, _type: "sitePage", ...definition, isPublished: true});
}

const after = await client.fetch(`{"total":count(*[_type == "sitePage"]),"withArchivedMarkup":count(*[_type == "sitePage" && defined(contentHtml)]),"outsideNativeRoutes":count(*[_type == "sitePage" && !(path in $paths)])}`, {paths: keepPaths});
console.log(JSON.stringify({complete: true, after}, null, 2));

import type {Metadata} from "next";
import {notFound, redirect} from "next/navigation";
import MirroredPage from "../../mirrored-page";
import {getCodiantMirrorByPath} from "@/lib/codiant-mirrors";

const existingShopifyPages: Record<string, string> = {
  "website-design": "/shopify-development",
  "website-development": "/services/shopify-website-development",
  "b2b-ecommerce-solutions": "/shopify-development",
  "headless-commerce": "/shopify-development",
  "mobile-app-development": "/shopify-development",
  "custom-ecommerce-solutions": "/shopify-development",
  "abandoned-checkout-recovery": "/services/recover-shopify-abandoned-checkouts",
  "ai-agentic-commerce": "/shopify-development",
  "ongoing-support": "/shopify-development",
};

const migrationRedirects: Record<string, string> = {
  migration: "/shopify-services/shopify-migration",
  "adobe-commerce": "/shopify-services/shopify-migration/adobe-commerce",
  bigcommerce: "/shopify-services/shopify-migration/bigcommerce",
  woocommerce: "/shopify-services/shopify-migration/woocommerce",
  salesforce: "/shopify-services/shopify-migration/salesforce",
  magento: "/shopify-services/shopify-migration/magento",
  squarespace: "/shopify-services/shopify-migration/squarespace",
  wix: "/shopify-services/shopify-migration/wix",
};

function sourcePathFor(slug: string[]) {
  return existingShopifyPages[slug.join("/").toLowerCase()];
}

function titleForPath(path: string, fallback: string) {
  const name = path.split("/").filter(Boolean).at(-1)?.replaceAll("-", " ") || fallback;
  return `Kodrise ${name.replace(/\b\w/g, (letter) => letter.toUpperCase())}`;
}

export async function generateMetadata({params}: {params: Promise<{slug: string[]}>}): Promise<Metadata> {
  const {slug} = await params;
  const migrationTarget = migrationRedirects[slug.join("/").toLowerCase()];
  if (migrationTarget) return {title: "Shopify Migration Services | Kodrise", alternates: {canonical: migrationTarget}};
  const sourcePath = sourcePathFor(slug);
  if (!sourcePath) return {title: "Shopify Services | Kodrise"};
  const route = await getCodiantMirrorByPath(sourcePath);
  const pageTitle = route?.title?.replace(/codiant/gi, "Kodrise") || titleForPath(sourcePath, "Shopify Service");
  return {title: {absolute: pageTitle}, alternates: {canonical: `/shopify-services/${slug.join("/")}`}};
}

export default async function ShopifyServiceRoute({params}: {params: Promise<{slug: string[]}>}) {
  const {slug} = await params;
  const migrationTarget = migrationRedirects[slug.join("/").toLowerCase()];
  if (migrationTarget) redirect(migrationTarget);
  const sourcePath = sourcePathFor(slug);
  if (!sourcePath) notFound();
  const route = await getCodiantMirrorByPath(sourcePath);
  if (!route) notFound();
  return <MirroredPage pathname={route.KodrisePath} title={titleForPath(sourcePath, "Shopify Service")} />;
}

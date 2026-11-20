import type {Metadata} from "next";
import {notFound} from "next/navigation";
import MirroredPage from "../../mirrored-page";
import {getCodiantMirrorByPath} from "@/lib/codiant-mirrors";

const existingShopifyPages: Record<string, string> = {
  "shopify-development": "/shopify-development",
  "shopify-app-development": "/shopify-app-development-company",
  "website-design": "/shopify-development",
  "website-development": "/services/shopify-website-development",
  "b2b-ecommerce-solutions": "/shopify-development",
  "headless-commerce": "/shopify-development",
  "mobile-app-development": "/shopify-development",
  "custom-ecommerce-solutions": "/shopify-development",
  "abandoned-checkout-recovery": "/services/recover-shopify-abandoned-checkouts",
  migration: "/shopify-development",
  "adobe-commerce": "/shopify-development",
  bigcommerce: "/shopify-development",
  woocommerce: "/shopify-development",
  salesforce: "/shopify-development",
  magento: "/shopify-development",
  squarespace: "/shopify-development",
  wix: "/shopify-development",
  "ai-agentic-commerce": "/shopify-development",
  "ongoing-support": "/shopify-development",
  "development-services": "/services/shopify-development",
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
  const sourcePath = sourcePathFor(slug);
  if (!sourcePath) return {title: "Shopify Services | Kodrise"};
  const route = await getCodiantMirrorByPath(sourcePath);
  const pageTitle = route?.title?.replace(/codiant/gi, "Kodrise") || titleForPath(sourcePath, "Shopify Service");
  return {title: {absolute: pageTitle}, alternates: {canonical: `/shopify-services/${slug.join("/")}`}};
}

export default async function ShopifyServiceRoute({params}: {params: Promise<{slug: string[]}>}) {
  const {slug} = await params;
  const sourcePath = sourcePathFor(slug);
  if (!sourcePath) notFound();
  const route = await getCodiantMirrorByPath(sourcePath);
  if (!route) notFound();
  return <MirroredPage pathname={route.KodrisePath} title={titleForPath(sourcePath, "Shopify Service")} />;
}

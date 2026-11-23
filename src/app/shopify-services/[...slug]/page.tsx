import {notFound, redirect} from "next/navigation";

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

export default async function ShopifyLegacyRoute({params}: {params: Promise<{slug: string[]}>}): Promise<never> {
  const {slug} = await params;
  const migrationTarget = migrationRedirects[slug.join("/").toLowerCase()];
  if (migrationTarget) redirect(migrationTarget);
  notFound();
}

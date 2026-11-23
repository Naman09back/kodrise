import type {Metadata} from "next";
import {notFound} from "next/navigation";
import MigrationPlatformPage from "../migration-platform-page";
import {migrationPlatforms} from "../migration-platform-data";
import AdobeCommerceMigrationPage from "../adobe-commerce-page";
import BigCommerceMigrationPage from "../bigcommerce-page";
import WooCommerceMigrationPage from "../woocommerce-page";
import SalesforceMigrationPage from "../salesforce-page";

type PageProps = {params: Promise<{platform: string}>};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {platform: slug} = await params;
  const platform = migrationPlatforms[slug];
  if (!platform) return {title: "Shopify Migration Services | Kodrise"};
  if (slug === "adobe-commerce") return {
    title: {absolute: "Adobe Commerce to Shopify Plus Migration | Kodrise"},
    description: "Plan your Adobe Commerce to Shopify Plus migration around catalogs, customizations, integrations, storefront experience, and SEO.",
    alternates: {canonical: "/shopify-services/shopify-migration/adobe-commerce"},
  };
  if (slug === "bigcommerce") return {
    title: {absolute: "BigCommerce to Shopify Migration Services | Kodrise"},
    description: "Plan your BigCommerce to Shopify migration around your product catalog, customer data, custom features, integrations, storefront, and SEO.",
    alternates: {canonical: "/shopify-services/shopify-migration/bigcommerce"},
  };
  if (slug === "woocommerce") return {
    title: {absolute: "WooCommerce to Shopify Migration Services | Kodrise"},
    description: "Plan your WooCommerce to Shopify migration around WordPress content, plugins, catalog data, customer accounts, integrations, and SEO.",
    alternates: {canonical: "/shopify-services/shopify-migration/woocommerce"},
  };
  if (slug === "salesforce") return {
    title: {absolute: "Salesforce Commerce Cloud to Shopify Migration | Kodrise"},
    description: "Plan your Salesforce Commerce Cloud to Shopify migration around enterprise catalogs, customizations, storefronts, integrations, and SEO.",
    alternates: {canonical: "/shopify-services/shopify-migration/salesforce"},
  };
  return {
    title: {absolute: `${platform.name} to Shopify Migration | Kodrise`},
    description: platform.intro,
    alternates: {canonical: `/shopify-services/shopify-migration/${platform.slug}`},
  };
}

export default async function Page({params}: PageProps) {
  const {platform: slug} = await params;
  const platform = migrationPlatforms[slug];
  if (!platform) notFound();
  if (slug === "adobe-commerce") return <AdobeCommerceMigrationPage />;
  if (slug === "bigcommerce") return <BigCommerceMigrationPage />;
  if (slug === "woocommerce") return <WooCommerceMigrationPage />;
  if (slug === "salesforce") return <SalesforceMigrationPage />;
  return <MigrationPlatformPage platform={platform} />;
}

import type {Metadata} from "next";
import {notFound} from "next/navigation";
import MigrationPlatformPage from "../migration-platform-page";
import {migrationPlatforms} from "../migration-platform-data";
import AdobeCommerceMigrationPage from "../adobe-commerce-page";
import BigCommerceMigrationPage from "../bigcommerce-page";
import WooCommerceMigrationPage from "../woocommerce-page";
import SalesforceMigrationPage from "../salesforce-page";
import MagentoMigrationPage from "../magento-page";
import SquarespaceMigrationPage from "../squarespace-page";
import WixMigrationPage from "../wix-page";
import {MigrationImageProvider} from "../migration-images";
import {getMigrationAssets} from "@/sanity/lib/migration-assets";
import {getSitePage} from "@/sanity/lib/pages";
import CmsNativePageGate from "../../../cms-native-page-gate";

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
  if (slug === "magento") return {
    title: {absolute: "Magento to Shopify Migration Services | Kodrise"},
    description: "Plan your Magento to Shopify migration around product catalogs, custom modules, integrations, storefront experience, and SEO.",
    alternates: {canonical: "/shopify-services/shopify-migration/magento"},
  };
  if (slug === "squarespace") return {
    title: {absolute: "Squarespace to Shopify Migration Services | Kodrise"},
    description: "Plan your Squarespace to Shopify migration around products, website content, customer data, integrations, storefront design, and SEO.",
    alternates: {canonical: "/shopify-services/shopify-migration/squarespace"},
  };
  if (slug === "wix") return {
    title: {absolute: "Wix to Shopify Migration Services | Kodrise"},
    description: "Plan your Wix to Shopify migration around products, customer and order data, website content, integrations, and SEO.",
    alternates: {canonical: "/shopify-services/shopify-migration/wix"},
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
  const assets = await getMigrationAssets(slug);
  const pageContent = await getSitePage(`/shopify-services/shopify-migration/${slug}`);
  const page = slug === "adobe-commerce" ? <AdobeCommerceMigrationPage />
    : slug === "bigcommerce" ? <BigCommerceMigrationPage />
    : slug === "woocommerce" ? <WooCommerceMigrationPage />
    : slug === "salesforce" ? <SalesforceMigrationPage />
    : slug === "magento" ? <MagentoMigrationPage />
    : slug === "squarespace" ? <SquarespaceMigrationPage />
    : slug === "wix" ? <WixMigrationPage />
    : <MigrationPlatformPage platform={platform} />;
  return <MigrationImageProvider assets={assets}><CmsNativePageGate page={pageContent} label={`${platform.name} to Shopify Migration`}>{page}</CmsNativePageGate></MigrationImageProvider>;
}

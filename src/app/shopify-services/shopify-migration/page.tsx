import type {Metadata} from "next";
import ShopifyMigrationClient from "./migration-client";
import {MigrationImageProvider} from "./migration-images";
import {getMigrationAssets} from "@/sanity/lib/migration-assets";
import ShopifyNativePage from "../native-page";

export const metadata: Metadata = {
  title: {absolute: "Shopify Migration Services | Migrate to Shopify & Shopify Plus | Kodrise"},
  description: "Move your commerce business to Shopify with a migration plan for your store, data, workflows, integrations, and SEO.",
  alternates: {canonical: "/shopify-services/shopify-migration"},
};

export default async function ShopifyMigrationPage() {
  const assets = await getMigrationAssets();
  return <ShopifyNativePage path="/shopify-services/shopify-migration"><MigrationImageProvider assets={assets}><ShopifyMigrationClient /></MigrationImageProvider></ShopifyNativePage>;
}

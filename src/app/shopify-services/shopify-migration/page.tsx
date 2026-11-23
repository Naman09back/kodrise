import type {Metadata} from "next";
import ShopifyMigrationClient from "./migration-client";

export const metadata: Metadata = {
  title: {absolute: "Shopify Migration Services | Migrate to Shopify & Shopify Plus | Kodrise"},
  description: "Move your commerce business to Shopify with a migration plan for your store, data, workflows, integrations, and SEO.",
  alternates: {canonical: "/shopify-services/shopify-migration"},
};

export default function ShopifyMigrationPage() {
  return <ShopifyMigrationClient />;
}

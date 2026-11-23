import type {Metadata} from "next";
import CustomEcommercePage from "./custom-ecommerce-client";

export const metadata: Metadata = {
  title: {absolute: "Custom Ecommerce Solutions for Shopify | Kodrise"},
  description: "Connect Shopify to the workflows and systems your business depends on with custom ecommerce applications, integrations, automation, and ongoing support.",
  alternates: {canonical: "/shopify-services/custom-ecommerce-solutions"},
};

export default function Page() {
  return <CustomEcommercePage />;
}

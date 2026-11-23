import type {Metadata} from "next";
import B2BEcommercePage from "./b2b-ecommerce-client";
import ShopifyNativePage from "../native-page";

export const metadata: Metadata = {
  title: {absolute: "Shopify B2B Ecommerce Solutions | Kodrise"},
  description: "Plan and build a Shopify B2B commerce experience around wholesale pricing, buyer workflows, integrations, and your business operations.",
  alternates: {canonical: "/shopify-services/b2b-ecommerce-solutions"},
};

export default function Page() {
  return <ShopifyNativePage path="/shopify-services/b2b-ecommerce-solutions"><B2BEcommercePage /></ShopifyNativePage>;
}

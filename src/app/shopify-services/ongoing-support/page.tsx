import type {Metadata} from "next";
import ShopifyOngoingSupportPage from "./ongoing-support-client";

export const metadata: Metadata = {
  title: {absolute: "Ongoing Shopify Support & Development | Kodrise"},
  description: "Get ongoing Shopify development, technical support, integrations, storefront improvements, and optimization aligned with your commerce roadmap.",
  alternates: {canonical: "/shopify-services/ongoing-support"},
};

export default function Page() {
  return <ShopifyOngoingSupportPage />;
}

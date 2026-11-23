import type {Metadata} from "next";
import ShopifyMobileAppPage from "./mobile-app-client";

export const metadata: Metadata = {
  title: {absolute: "Shopify Mobile App Development | Kodrise"},
  description: "Plan and build a mobile shopping app connected to Shopify, from product discovery and customer accounts to checkout, loyalty, and ongoing support.",
  alternates: {canonical: "/shopify-services/mobile-app-development"},
};

export default function Page() {
  return <ShopifyMobileAppPage />;
}

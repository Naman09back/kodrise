import type {Metadata} from "next";
import ShopifyWebsiteDevelopmentPage from "./website-development-client";
import ShopifyNativePage from "../native-page";

export const metadata: Metadata = {
  title: {absolute: "Shopify Website Development Services | Kodrise"},
  description: "Build a distinctive, dependable Shopify storefront with Kodrise, from custom theme development to integrations, performance, and ongoing improvements.",
  alternates: {canonical: "/shopify-services/website-development"},
};

export default function Page() {
  return <ShopifyNativePage path="/shopify-services/website-development"><ShopifyWebsiteDevelopmentPage /></ShopifyNativePage>;
}

import type {Metadata} from "next";
import ShopifyMarketingPage from "./marketing-client";
import ShopifyNativePage from "../native-page";

export const metadata: Metadata = {
  title: {absolute: "Shopify Marketing Services | Kodrise"},
  description: "Grow your Shopify store with connected paid acquisition, search visibility, content, social, and retention marketing.",
  alternates: {canonical: "/shopify-services/marketing"},
};

export default function Page() {
  return <ShopifyNativePage path="/shopify-services/marketing"><ShopifyMarketingPage /></ShopifyNativePage>;
}

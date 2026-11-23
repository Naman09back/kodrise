import type {Metadata} from "next";
import EmailMarketingPage from "./email-marketing-client";
import ShopifyNativePage from "../native-page";

export const metadata: Metadata = {
  title: {absolute: "Shopify Email Marketing Services | Kodrise"},
  description: "Build customer relationships and ecommerce sales with personalized email campaigns, audience segmentation, automation, and measurable strategy.",
  alternates: {canonical: "/shopify-services/email-marketing"},
};

export default function Page() {
  return <ShopifyNativePage path="/shopify-services/email-marketing"><EmailMarketingPage /></ShopifyNativePage>;
}

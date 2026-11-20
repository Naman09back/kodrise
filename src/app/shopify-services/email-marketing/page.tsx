import type {Metadata} from "next";
import EmailMarketingPage from "./email-marketing-client";

export const metadata: Metadata = {
  title: {absolute: "Shopify Email Marketing Services | Kodrise"},
  description: "Build customer relationships and ecommerce sales with personalized email campaigns, audience segmentation, automation, and measurable strategy.",
  alternates: {canonical: "/shopify-services/email-marketing"},
};

export default function Page() {
  return <EmailMarketingPage />;
}

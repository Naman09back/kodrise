import type {Metadata} from "next";
import ContentMarketingPage from "./content-marketing-client";
import ShopifyNativePage from "../native-page";

export const metadata: Metadata = {
  title: {absolute: "Ecommerce Content Marketing Services | Kodrise"},
  description: "Human-written ecommerce content shaped around your brand voice, audience, SEO, and digital growth goals.",
  alternates: {canonical: "/shopify-services/content-marketing"},
};

export default function Page() {
  return <ShopifyNativePage path="/shopify-services/content-marketing"><ContentMarketingPage /></ShopifyNativePage>;
}

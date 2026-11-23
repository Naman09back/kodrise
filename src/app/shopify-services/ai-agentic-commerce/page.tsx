import type {Metadata} from "next";
import AgenticCommercePage from "./agentic-commerce-client";
import ShopifyNativePage from "../native-page";

export const metadata: Metadata = {
  title: {absolute: "AI & Agentic Commerce Services | Kodrise"},
  description: "Prepare your Shopify commerce experience for AI discovery and shopping with product data, brand knowledge, integrations, readiness planning, and measurement.",
  alternates: {canonical: "/shopify-services/ai-agentic-commerce"},
};

export default function Page() {
  return <ShopifyNativePage path="/shopify-services/ai-agentic-commerce"><AgenticCommercePage /></ShopifyNativePage>;
}

import type {Metadata} from "next";
import HeadlessCommercePage from "./headless-commerce-client";
import ShopifyNativePage from "../native-page";

export const metadata: Metadata = {
  title: {absolute: "Headless Shopify Commerce Services | Kodrise"},
  description: "Explore headless Shopify architecture, custom storefront development, CMS and systems integration, migration planning, and ongoing support with Kodrise.",
  alternates: {canonical: "/shopify-services/headless-commerce"},
};

export default function Page() {
  return <ShopifyNativePage path="/shopify-services/headless-commerce"><HeadlessCommercePage /></ShopifyNativePage>;
}

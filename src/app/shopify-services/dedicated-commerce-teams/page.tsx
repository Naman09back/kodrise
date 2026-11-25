import type {Metadata} from "next";
import DevelopmentServicesPage from "./development-services-client";
import ShopifyNativePage from "../native-page";

export const metadata: Metadata = {
  title: {absolute: "Hire Shopify Experts | Kodrise"},
  description: "Add Shopify and Shopify Plus engineering capacity with expert developers, an extended team, or a dedicated commerce team from Kodrise.",
  alternates: {canonical: "/shopify-services/dedicated-commerce-teams"},
};

export default function Page() {
  return <ShopifyNativePage path="/shopify-services/dedicated-commerce-teams"><DevelopmentServicesPage /></ShopifyNativePage>;
}

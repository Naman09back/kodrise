import type {Metadata} from "next";
import ShopifyWebsiteDesignPage from "./website-design-client";
import ShopifyNativePage from "../native-page";

export const metadata: Metadata = {
  title: {absolute: "Shopify Website Design Services | Kodrise"},
  description: "Design a distinctive Shopify storefront with Kodrise. Explore store strategy, UX and UI, theme design, mobile experiences, and ongoing design support.",
  alternates: {canonical: "/shopify-services/website-design"},
};

export default function Page() {
  return <ShopifyNativePage path="/shopify-services/website-design"><ShopifyWebsiteDesignPage /></ShopifyNativePage>;
}

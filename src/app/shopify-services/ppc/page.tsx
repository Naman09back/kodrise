import type {Metadata} from "next";
import ShopifyPpcPage from "./ppc-client";
import ShopifyNativePage from "../native-page";

export const metadata: Metadata = {
  title: {absolute: "Shopify PPC Services | Kodrise"},
  description: "Turn paid media into measurable Shopify growth with Google, Meta, TikTok, Pinterest, and programmatic advertising.",
  alternates: {canonical: "/shopify-services/ppc"},
};

export default function Page() {
  return <ShopifyNativePage path="/shopify-services/ppc"><ShopifyPpcPage /></ShopifyNativePage>;
}

import type {Metadata} from "next";
import SocialMediaMarketingPage from "./social-media-marketing-client";

export const metadata: Metadata = {
  title: {absolute: "Shopify Social Media Marketing | Kodrise"},
  description: "Build demand and grow your ecommerce brand with social media strategy, advertising, management, content creation, and community engagement.",
  alternates: {canonical: "/shopify-services/social-media-marketing"},
};

export default function Page() {
  return <SocialMediaMarketingPage />;
}

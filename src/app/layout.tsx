import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "./globals.css";
import "./experience.css";
import "./interior.css";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";
import Analytics from "./analytics";
import SmoothScroll from "./smooth-scroll";
import WhatsAppFloat from "./whatsapp-float";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Kodrise — Great people. Extraordinary teams.",
  description:
    "Extend your team with technology talent. Staff augmentation across engineering, Shopify, Salesforce, cloud, data, and agentic AI.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
        <SmoothScroll />
        <WhatsAppFloat />
      </body>
    </html>
  );
}

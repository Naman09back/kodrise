import type {Metadata} from "next";
import "@fontsource-variable/manrope";
import "./globals.css";
import "./experience.css";
import "./interior.css";
import "./site-theme.css";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";
import Analytics from "./analytics";
import CookieConsent from "./cookie-consent";
import WhatsAppFloat from "./whatsapp-float";

const organizationId = "https://kodrise.com/#organization";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://kodrise.com"),
  title: {default: "Kodrise | AI-native products and engineering teams", template: "%s | Kodrise"},
  description: "Kodrise builds AI-native products, enterprise software, cloud platforms, and high-performing digital engineering teams.",
  alternates: {canonical: "/"},
  openGraph: {type: "website", siteName: "Kodrise", title: "Kodrise | AI-native products and engineering teams", description: "AI-native products, enterprise software, cloud platforms, and engineering teams that ship.", images: [{url: "/site-assets/home-bg.webp", width: 1920, height: 847, alt: "Kodrise AI-first engineering team"}]},
  twitter: {card: "summary_large_image", title: "Kodrise | AI-native products and engineering teams", description: "AI-native products, enterprise software, cloud platforms, and engineering teams that ship.", images: ["/site-assets/home-bg.webp"]},
  robots: {index: true, follow: true},
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  const structuredData = {"@context": "https://schema.org", "@graph": [
    {"@type": "Organization", "@id": organizationId, name: "Kodrise", url: "https://kodrise.com", email: "hr@kodrise.com", telephone: "+91 9302752700", address: {"@type": "PostalAddress", addressLocality: "Indore", addressRegion: "Madhya Pradesh", addressCountry: "IN"}},
    {"@type": "WebSite", "@id": "https://kodrise.com/#website", name: "Kodrise", url: "https://kodrise.com", publisher: {"@id": organizationId}},
  ]};
  return <html lang="en"><body>
    <SiteHeader />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}} />
    {children}
    <SiteFooter />
    <Analytics />
    <WhatsAppFloat />
    <CookieConsent />
  </body></html>;
}

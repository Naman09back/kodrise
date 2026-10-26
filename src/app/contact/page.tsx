import type { Metadata } from "next";
import InteriorHero from "../interior-hero";
import ContactSection from "../contact-section";
import { getSitePage } from "../../sanity/lib/pages";

export const metadata: Metadata = {
  title: "Contact Us — Kodrise",
  description: "Tell Kodrise about your team, technology requirements, and next project.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string; developer?: string }>;
}) {
  const query = await searchParams;
  const page = await getSitePage("contact");
  const role = query.role ?? "";
  const developer = query.developer ?? "";
  return (
    <main id="main" className="contact-page">
      <InteriorHero
        label="Contact Us"
        title={page?.heroTitle || "Let’s build"}
        accent={page?.heroAccent || "your next chapter."}
        description={page?.heroDescription || "Tell us about your team, the technology you work with, and where you want to go. Start with what you know."}
      />
      <ContactSection
        initialTechnology={role}
        initialMessage={developer ? `Developer profile requested: ${developer}\n\nPlease share the project details and timeline for this role.` : ""}
      />
    </main>
  );
}

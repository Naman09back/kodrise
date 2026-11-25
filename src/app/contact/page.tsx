import type { Metadata } from "next";
import { getSitePage, getSitePageMetadata } from "@/sanity/lib/pages";
import ContactExperience from "./contact-experience";
import CmsNativePageGate from "../cms-native-page-gate";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getSitePageMetadata("contact", "/contact");
}

export default async function ContactPage() {
  const page = await getSitePage("contact");
  return <CmsNativePageGate page={page} label="Contact Kodrise"><ContactExperience page={page} /></CmsNativePageGate>;
}

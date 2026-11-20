import type {Metadata} from "next";
import MirrorRoutePage from "../mirror-route-page";
import {getSitePageMetadata} from "@/sanity/lib/pages";

export async function generateMetadata(): Promise<Metadata> {
  return getSitePageMetadata("careers", "/careers");
}

export default function CareersPage() {
  return <MirrorRoutePage pathname="/careers" />;
}

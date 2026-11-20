import type {Metadata} from "next";
import MirrorRoutePage from "../mirror-route-page";
import {getCodiantMirrorMetadata} from "@/lib/codiant-mirrors";

export async function generateMetadata(): Promise<Metadata> {
  return await getCodiantMirrorMetadata("/portfolio") ?? {title: "Portfolio — Kodrise"};
}

export default function PortfolioPage() {
  return <MirrorRoutePage pathname="/portfolio" />;
}

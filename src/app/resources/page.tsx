import type {Metadata} from "next";
import MirrorRoutePage from "../mirror-route-page";
import {getCodiantMirrorMetadata} from "@/lib/codiant-mirrors";

export async function generateMetadata(): Promise<Metadata> {
  return await getCodiantMirrorMetadata("/resources") ?? {title: "Resources — Kodrise"};
}

export default function ResourcesPage() {
  return <MirrorRoutePage pathname="/resources" />;
}

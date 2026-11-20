import {notFound} from "next/navigation";
import MirroredPage from "../mirrored-page";
import {getCodiantMirrorByPath} from "@/lib/codiant-mirrors";
import type {Metadata} from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({params}: {params: Promise<{slug: string[]}>}): Promise<Metadata> {
  const {slug} = await params;
  const route = await getCodiantMirrorByPath(`/${slug.join("/")}`);
  return {title: {absolute: route?.title || "Kodrise"}};
}

export default async function MirroredRoute({params}: {params: Promise<{slug?: string[]}>}) {
  const {slug} = await params;
  const pathname = slug?.length ? `/${slug.join("/")}` : "/";
  const route = await getCodiantMirrorByPath(pathname);
  if (!route) notFound();
  return <MirroredPage pathname={route.KodrisePath} title={`Kodrise ${route.KodrisePath === "/" ? "Home" : route.KodrisePath.slice(1).replaceAll("/", " · ")}`} />;
}

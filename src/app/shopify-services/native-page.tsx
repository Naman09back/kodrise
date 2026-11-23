import type {ReactNode} from "react";
import CmsNativePageGate from "../cms-native-page-gate";
import {getSitePage} from "@/sanity/lib/pages";

export default async function ShopifyNativePage({path, children}: {path: string; children: ReactNode}) {
  const page = await getSitePage(path);
  return <CmsNativePageGate page={page} label={path.split("/").filter(Boolean).at(-1)?.replaceAll("-", " ") || "Shopify Services"}>{children}</CmsNativePageGate>;
}

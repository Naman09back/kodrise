"use client";

import Image, {type ImageProps} from "next/image";
import {createContext, useContext, type ReactNode} from "react";

export type ShopifyImageAsset = {src: string; alt?: string};
const ShopifyAssetsContext = createContext<Record<string, ShopifyImageAsset>>({});

export function ShopifyAssetsProvider({assets, children}: {assets: Record<string, ShopifyImageAsset>; children: ReactNode}) {
  return <ShopifyAssetsContext.Provider value={assets}>{children}</ShopifyAssetsContext.Provider>;
}

function slotFromPath(src: ImageProps["src"]) {
  if (typeof src !== "string" || !src.startsWith("/site-assets/")) return undefined;
  return src.slice("/site-assets/".length).replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function ShopifyAssetImage(props: ImageProps) {
  const assets = useContext(ShopifyAssetsContext);
  const slot = slotFromPath(props.src);
  const asset = slot ? assets[slot] : undefined;
  if (!asset?.src) return null;
  return <Image {...props} src={asset.src} alt={asset.alt || props.alt} unoptimized />;
}

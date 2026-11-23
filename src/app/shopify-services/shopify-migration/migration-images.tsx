"use client";

import Image, {type ImageProps} from "next/image";
import {createContext, useContext, type ReactNode} from "react";

export type MigrationImageAsset = {src: string; alt?: string};
export type MigrationImageMap = Record<string, MigrationImageAsset>;

const MigrationImagesContext = createContext<MigrationImageMap>({});

export function MigrationImageProvider({assets, children}: {assets: MigrationImageMap; children: ReactNode}) {
  return <MigrationImagesContext.Provider value={assets}>{children}</MigrationImagesContext.Provider>;
}

function assetSlot(source: string) {
  if (!source.startsWith("/site-assets/")) return undefined;
  return source.slice("/site-assets/".length).replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function MigrationImage(props: ImageProps) {
  const assets = useContext(MigrationImagesContext);
  const source = typeof props.src === "string" ? props.src : undefined;
  const asset = source ? assets[assetSlot(source) || ""] : undefined;
  return <Image {...props} src={asset?.src || props.src} alt={asset?.alt || props.alt} unoptimized={Boolean(asset?.src) || props.unoptimized} />;
}

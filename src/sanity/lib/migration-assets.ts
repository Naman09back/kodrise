import {defineQuery} from "next-sanity";
import {sanityClient} from "./client";
import type {MigrationImageMap} from "@/app/shopify-services/shopify-migration/migration-images";

const MIGRATION_ASSETS_QUERY = defineQuery(`
  *[_type == "siteAsset" && (slot match $pagePattern || slot match $sharedPattern)]{
    slot,
    alt,
    "src": image.asset->url
  }
`);

const ALL_MIGRATION_ASSETS_QUERY = defineQuery(`
  *[_type == "siteAsset" && slot match "shopify-migration-*"]{
    slot,
    alt,
    "src": image.asset->url
  }
`);

type AssetResult = {slot: string; src?: string; alt?: string};

function toImageMap(assets: AssetResult[]): MigrationImageMap {
  return Object.fromEntries(assets.filter((asset) => asset.src).map((asset) => [asset.slot, {src: asset.src!, alt: asset.alt}]));
}

export async function getMigrationAssets(platform?: string): Promise<MigrationImageMap> {
  try {
    const assets = platform
      ? await sanityClient.fetch<AssetResult[]>(MIGRATION_ASSETS_QUERY, {
          pagePattern: `shopify-migration-${platform}-*`,
          sharedPattern: "shopify-migration-adobe-commerce-*",
        })
      : await sanityClient.fetch<AssetResult[]>(ALL_MIGRATION_ASSETS_QUERY);
    return toImageMap(assets);
  } catch {
    return {};
  }
}

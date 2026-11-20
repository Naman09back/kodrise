export const homepageImageSlots = ["hero", "portfolio1", "portfolio2", "portfolio3", "awards"] as const;
export type HomepageImageSlot = (typeof homepageImageSlots)[number];

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export function isHomepageImageSlot(value: string): value is HomepageImageSlot {
  return (homepageImageSlots as readonly string[]).includes(value);
}

export function isSiteAssetSlot(value: string) {
  return /^[a-z0-9][a-z0-9-]{0,119}$/.test(value);
}

export function isAllowedImageUpload(type: string, size: number) {
  return type.startsWith("image/") && size > 0 && size <= MAX_IMAGE_BYTES;
}

export function homepageAssetUrl(
  assets: Array<{slot?: string; image?: {asset?: {url?: string}}}> | undefined,
  slot: HomepageImageSlot,
) {
  return assets?.find((asset) => asset.slot === slot)?.image?.asset?.url;
}

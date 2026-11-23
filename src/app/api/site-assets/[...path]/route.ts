import {readFile} from "node:fs/promises";
import path from "node:path";
import {sanityClient} from "@/sanity/lib/client";

const mimeByExtension: Record<string, string> = {
  ".avif": "image/avif", ".gif": "image/gif", ".jpeg": "image/jpeg", ".jpg": "image/jpeg",
  ".png": "image/png", ".svg": "image/svg+xml", ".webp": "image/webp", ".woff": "font/woff",
  ".woff2": "font/woff2", ".ttf": "font/ttf",
};
const assetUrlCache = new Map<string, {url: string | null; expiresAt: number}>();

async function getSanityAssetUrl(sourcePaths: string[]) {
  const cacheKey = sourcePaths[0];
  const cached = assetUrlCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return cached.url;
  const asset = await sanityClient.fetch<{url?: string} | null>(
    `*[_type == "siteAsset" && sourcePath in $paths][0]{"url":image.asset->url}`,
    {paths: sourcePaths},
  ).catch(() => null);
  const url = asset?.url || null;
  assetUrlCache.set(cacheKey, {url, expiresAt: Date.now() + 30_000});
  return url;
}

export async function GET(_request: Request, {params}: {params: Promise<{path: string[]}>}) {
  const {path: segments} = await params;
  if (!segments.length || segments.some((segment) => !segment || segment === "." || segment === ".." || segment.includes("\\"))) {
    return new Response("Not found", {status: 404});
  }

  const sourcePath = `/site-assets/${segments.join("/")}`;
  const sanityUrl = await getSanityAssetUrl([sourcePath, `/public${sourcePath}`]);

  if (sanityUrl) {
    const remote = await fetch(sanityUrl, {cache: "force-cache"}).catch(() => null);
    if (remote?.ok && remote.body) {
      return new Response(remote.body, {
        headers: {
          "Content-Type": remote.headers.get("content-type") || mimeByExtension[path.extname(sourcePath).toLowerCase()] || "application/octet-stream",
          "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }
  }

  const publicRoot = path.resolve(process.cwd(), "public", "site-assets");
  const localFile = path.resolve(publicRoot, ...segments);
  if (!localFile.startsWith(`${publicRoot}${path.sep}`)) return new Response("Not found", {status: 404});
  try {
    const contents = await readFile(localFile);
    return new Response(contents, {headers: {
      "Content-Type": mimeByExtension[path.extname(localFile).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Content-Type-Options": "nosniff",
    }});
  } catch {
    return new Response("Not found", {status: 404});
  }
}

import {readFile} from "node:fs/promises";
import {gunzipSync} from "node:zlib";
import path from "node:path";
import {getCodiantMirrorByPath} from "@/lib/codiant-mirrors";
import {getLocalRequestOrigin} from "@/lib/local-request-origin";
import {sanityClient, sanityDataset, sanityProjectId} from "@/sanity/lib/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const mirrorReadClient = sanityClient.withConfig({useCdn: true});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const pathname = url.searchParams.get("path");
  if (!pathname || !pathname.startsWith("/")) return new Response("Missing page path", {status: 400});
  const page = await getCodiantMirrorByPath(pathname);
  if (!page) return new Response("Page not found", {status: 404});
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const cmsPage = await mirrorReadClient.fetch<{contentHtml?: string; isPublished?: boolean} | null>(
    `*[_type == "sitePage" && path == $path][0]{contentHtml,isPublished}`,
    {path: normalizedPath},
  ).catch(() => null);
  if (cmsPage?.isPublished === false) return new Response("Page not found", {status: 404});
  const mirrorDirectory = path.resolve(process.cwd(), "reference", "codiant-mirror");
  const filePath = path.resolve(mirrorDirectory, page.file);
  if (!filePath.startsWith(`${mirrorDirectory}${path.sep}`)) return new Response("Invalid mirror path", {status: 400});
  try {
    const compressed = await readFile(filePath);
    let sourceHtml = cmsPage?.contentHtml || gunzipSync(compressed).toString("utf8");
    const mediaPaths = new Set(Array.from(sourceHtml.matchAll(/\/__kodrise_media__\/[a-f0-9]+/gi), ([match]) => match));
    for (const [, , sourcePath] of sourceHtml.matchAll(/\b(?:src|data-progressive|data-src|data-lazy-src|data-original)\s*=\s*(['"])(https?:\/\/[^'"]+)\1/gi)) {
      mediaPaths.add(sourcePath);
    }
    if (mediaPaths.size) {
      const media = await mirrorReadClient.fetch<Array<{sourcePath: string; image?: {asset?: {url?: string}}}>>(
        `*[_type == "siteAsset" && sourcePath in $paths]{sourcePath, image{asset->{url}}}`,
        {paths: [...mediaPaths]},
      ).catch(() => []);
      const imageUrls = new Map(media.map((asset) => [asset.sourcePath, asset.image?.asset?.url]).filter((entry): entry is [string, string] => Boolean(entry[1])));
      for (const [sourcePath, imageUrl] of imageUrls) sourceHtml = sourceHtml.split(sourcePath).join(imageUrl);
    }
    const localOrigin = getLocalRequestOrigin(request);
    const assetProxy = (value: string) => `${localOrigin}/api/codiant-asset?url=${encodeURIComponent(value)}&v=5`;
    const localScript = (filename: string) => `${localOrigin}/site-assets/vendor/${filename}`;
    const html = sourceHtml
      .replace(/<script\b[^>]*src=["']data:text\/javascript;base64,([^"']+)["'][^>]*>[\s\S]*?<\/script\s*>/gi, (tag, encoded) => {
        try { return Buffer.from(encoded, "base64").toString("utf8").includes("guest.vary.php") ? "" : tag; } catch { return tag; }
      })
      .replace(/<script\b[^>]*>[\s\S]*?(?:litespeed_vary|guest\.vary\.php)[\s\S]*?<\/script\s*>/gi, "")
      .replace(/<script\b[^>]*\bid=["']dt-vendor-min-script-js["'][^>]*>[\s\S]*?<\/script\s*>/gi, "")
      .replace(/<script\b[^>]*\bid=["'](?:swv-js|contact-form-7-js|cf7sr-recaptcha-api-js)["'][^>]*>[\s\S]*?<\/script\s*>/gi, "")
      .replace(/<link\b[^>]*>/gi, (tag) => {
        if (/ct-ultimate-gdpr/i.test(tag)) return "";
        if (!/\brel\s*=\s*(['"])stylesheet\1/i.test(tag)) return tag;
        return tag.replace(/\bhref\s*=\s*(['"])(.*?)\1/i, (attribute, quote, href) => {
          try {
            const stylesheetUrl = new URL(href, "https://codiant.com/");
            if (stylesheetUrl.hostname === "codiant.com" || stylesheetUrl.hostname.endsWith(".codiant.com")) return `href=${quote}${assetProxy(stylesheetUrl.toString())}${quote}`;
            if (stylesheetUrl.hostname === "cdn.sanity.io" && stylesheetUrl.pathname.startsWith(`/files/${sanityProjectId}/${sanityDataset}/`) && /\.css$/i.test(stylesheetUrl.pathname)) return `href=${quote}${assetProxy(stylesheetUrl.toString())}${quote}`;
          } catch {}
          return attribute;
        });
      })
      .replace(/<script\b[^>]*>/gi, (tag) => tag.replace(/\bsrc\s*=\s*(['"])(.*?)\1/i, (attribute, quote, src) => {
        if (/\bid=["']jquery-core-js["']/i.test(tag) && src === "data:,") return `src=${quote}${localScript("jquery.min.js")}${quote}`;
        if (/\bid=["']dt-swiper-bundle-min-script-js["']/i.test(tag)) return `src=${quote}${localScript("swiper-bundle.min.js")}${quote}`;
        if (/\bid=["']wp-hooks-js["']/i.test(tag) && src === "data:,") return `src=${quote}${assetProxy("https://codiant.com/wp-includes/js/dist/hooks.min.js")}${quote}`;
        if (/\bid=["']wp-i18n-js["']/i.test(tag) && src === "data:,") return `src=${quote}${assetProxy("https://codiant.com/wp-includes/js/dist/i18n.min.js")}${quote}`;
        try {
          const scriptUrl = new URL(src, "https://codiant.com/");
          if (scriptUrl.hostname === "cdn.sanity.io" && scriptUrl.pathname.startsWith(`/files/${sanityProjectId}/${sanityDataset}/`) && /\.m?js$/i.test(scriptUrl.pathname)) {
            return `src=${quote}${assetProxy(scriptUrl.toString())}${quote}`;
          }
        } catch {}
        return attribute;
      }))
      .replace(/(<script\b[^>]*\bid=["']jquery-core-js["'][^>]*><\/script\s*>)/i, `$1<script src="${localScript("bootstrap.bundle.min.js")}"></script>`)
      .replace(/<img\b[^>]*>/gi, (tag) => {
        const source = tag.match(/\bsrc\s*=\s*(['"])(.*?)\1/i);
        const deferred = tag.match(/\b(?:data-progressive|data-src|data-lazy-src|data-original)\s*=\s*(['"])(.*?)\1/i)?.[2];
        if (!deferred || (source?.[2] && source[2] !== "data:,")) return tag;
        if (source) return tag.replace(source[0], `src=${source[1]}${deferred}${source[1]}`);
        return tag.replace(/\s*\/?>$/, (tail) => ` src="${deferred}"${tail}`);
      })
      .replace(/<img\b[^>]*src\s*=\s*(['"])[^'"]*ct-ultimate-gdpr[^'"]*\1[^>]*>/gi, "")
      .replace(/url\(\s*(['"]?)(https?:\/\/(?:www\.)?codiant\.com\/[^)'"\s]+)\1\s*\)/gi, (_match, quote, assetUrl) => `url("${assetProxy(assetUrl)}")`);
    const localizedHtml = html
      .replace(/https:\/\/(?:www\.)?kodrise\.com/gi, localOrigin)
      .replace(/<\/head>/i, `<style id="kodrise-local-fonts">
        @font-face{font-family:Inter-Light;src:url("${assetProxy("https://codiant.com/wp-content/themes/codiant-wp/assets/fonts/Inter-Light.woff")}") format("woff");font-weight:300;font-style:normal;font-display:swap}
        @font-face{font-family:Inter-Regular;src:url("${assetProxy("https://codiant.com/wp-content/themes/codiant-wp/assets/fonts/Inter-Regular.woff")}") format("woff");font-weight:400;font-style:normal;font-display:swap}
        @font-face{font-family:Inter-Medium;src:url("${assetProxy("https://codiant.com/wp-content/themes/codiant-wp/assets/fonts/Inter-Medium.woff")}") format("woff");font-weight:500;font-style:normal;font-display:swap}
        @font-face{font-family:Inter-SemiBold;src:url("${assetProxy("https://codiant.com/wp-content/themes/codiant-wp/assets/fonts/Inter-SemiBold.woff")}") format("woff");font-weight:600;font-style:normal;font-display:swap}
        @font-face{font-family:icomoon;src:url("${assetProxy("https://codiant.com/wp-content/themes/codiant-wp/assets/fonts/icomoon.ttf?1iuzi2")}") format("truetype");font-weight:normal;font-style:normal;font-display:swap}
        html body #hiringModal,html body .modal-backdrop{display:none!important;visibility:hidden!important;pointer-events:none!important}
      </style></head>`)
      .replace(/https:\/\/cdn\.sanity\.io\/images\/[^"'()\s<>]+/gi, (imageUrl) => `${assetProxy(imageUrl.replace(/&amp;/g, "&"))}`.replace(/&/g, "&amp;"));
    return new Response(localizedHtml, {headers: {"Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=15, stale-while-revalidate=60", "X-Content-Type-Options": "nosniff"}});
  } catch {
    return new Response("Mirrored page is unavailable", {status: 404});
  }
}

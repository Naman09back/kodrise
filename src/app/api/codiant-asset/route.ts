import {getLocalRequestOrigin} from "@/lib/local-request-origin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAllowedHost(hostname: string) {
  return hostname === "codiant.com" || hostname === "www.codiant.com" || hostname.endsWith(".codiant.com") || hostname === "cdn.sanity.io";
}

export async function GET(request: Request) {
  const localOrigin = getLocalRequestOrigin(request);
  const value = new URL(request.url).searchParams.get("url");
  if (!value) return new Response("Missing asset URL", {status: 400});
  let source: URL;
  try { source = new URL(value); } catch { return new Response("Invalid asset URL", {status: 400}); }
  if (source.protocol !== "https:" || !isAllowedHost(source.hostname)) return new Response("Asset host is not allowed", {status: 403});
  try {
    const response = await fetch(source, {headers: {"User-Agent": "Kodrise local mirror/1.0"}, signal: AbortSignal.timeout(20000)});
    if (!response.ok) return new Response("Asset unavailable", {status: response.status});
    const contentType = response.headers.get("content-type") || "application/octet-stream";
    if (contentType.includes("text/css")) {
      const css = await response.text();
      const rewritten = css.replace(/url\(\s*(['"]?)(?!data:|#)([^)'"\s]+)\1\s*\)/gi, (_match, quote, target) => {
        if (/^(?:data:|#|\/api\/codiant-asset)/i.test(target)) return `url(${quote}${target}${quote})`;
        try {
          const assetUrl = new URL(target, response.url || source).toString();
          if (!isAllowedHost(new URL(assetUrl).hostname)) return `url(${quote}${target}${quote})`;
          return `url("${localOrigin}/api/codiant-asset?url=${encodeURIComponent(assetUrl)}&v=3")`;
        } catch { return `url(${quote}${target}${quote})`; }
      });
      return new Response(rewritten, {headers: {"Content-Type": contentType, "Cache-Control": "public, max-age=3600", "Access-Control-Allow-Origin": "*"}});
    }
    if (/javascript|ecmascript/i.test(contentType)) {
      const script = (await response.text()).replaceAll('url("data:,")', "url('data:,')");
      return new Response(script, {headers: {"Content-Type": contentType, "Cache-Control": "public, max-age=86400", "X-Content-Type-Options": "nosniff", "Access-Control-Allow-Origin": "*"}});
    }
    return new Response(await response.arrayBuffer(), {headers: {"Content-Type": contentType, "Cache-Control": "public, max-age=86400", "X-Content-Type-Options": "nosniff", "Access-Control-Allow-Origin": "*"}});
  } catch { return new Response("Asset request failed", {status: 502}); }
}

import {getLocalRequestOrigin} from "@/lib/local-request-origin";
import {getCodiantSourceRouteMap} from "@/lib/codiant-mirrors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: URLSearchParams;
  try { body = new URLSearchParams(await request.text()); } catch { return new Response("Invalid request", {status: 400}); }
  if (body.get("action") !== "searchPortfolioLists") return new Response("Unsupported action", {status: 400});
  const nonce = body.get("nonce") || "";
  const searchKeyword = (body.get("searchKeyword") || "").trim().slice(0, 120);
  if (!/^[a-f0-9]{8,16}$/i.test(nonce)) return new Response("Invalid portfolio search token", {status: 403});
  const upstreamBody = new URLSearchParams({action: "searchPortfolioLists", nonce, searchKeyword});
  let response: Response;
  try {
    response = await fetch("https://codiant.com/wp-admin/admin-ajax.php", {method: "POST", headers: {"content-type": "application/x-www-form-urlencoded; charset=UTF-8", referer: "https://codiant.com/portfolio/", accept: "text/html, */*; q=0.01"}, body: upstreamBody, signal: AbortSignal.timeout(12000), cache: "no-store"});
  } catch { return new Response("Portfolio search is temporarily unavailable", {status: 502}); }
  if (!response.ok) return new Response("Portfolio search is temporarily unavailable", {status: 502});
  const localPaths = await getCodiantSourceRouteMap();
  const localOrigin = getLocalRequestOrigin(request);
  const markup = await response.text();
  const rewritten = markup.replace(/href=(['"])https?:\/\/(?:www\.)?codiant\.com([^'"]*)\1/gi, (_match, quote: string, suffix: string) => {
    const target = new URL(suffix, "https://codiant.com/");
    const sourcePath = target.pathname.toLowerCase().replace(/\/$/, "") || "/";
    const localPath = localPaths[sourcePath] || sourcePath;
    return `href=${quote}${localOrigin}${localPath}${target.search}${target.hash}${quote} target="_top"`;
  }).replace(/\bCodiant\b/gi, "Kodrise");
  return new Response(rewritten, {headers: {"content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-content-type-options": "nosniff"}});
}

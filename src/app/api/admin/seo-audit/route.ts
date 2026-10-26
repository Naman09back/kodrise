import {NextRequest, NextResponse} from "next/server";
import {getAdminSession} from "../../../../lib/admin-session";

function normalizeUrl(value: unknown) {
  const raw = String(value || "").trim();
  if (!raw) throw new Error("Enter a URL to audit.");
  const url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error("Only HTTP and HTTPS URLs are supported.");
  return url;
}

function clean(value: string) { return value.replace(/<[^>]*>/g, " ").replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/\s+/g, " ").trim(); }
function first(html: string, expression: RegExp) { return clean(html.match(expression)?.[1] || ""); }

async function audit(value: unknown) {
  const url = normalizeUrl(value);
  const started = Date.now();
  const response = await fetch(url, {redirect: "follow", signal: AbortSignal.timeout(12000), headers: {"user-agent": "Kodrise-SEO-Audit/1.0"}});
  const html = (await response.text()).slice(0, 2_000_000);
  const title = first(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const description = first(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) || first(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
  const canonical = first(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i);
  const robots = first(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i);
  const ogTitle = first(html, /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i);
  const headings = [...html.matchAll(/<h([12])[^>]*>([\s\S]*?)<\/h\1>/gi)].map((match) => ({level: Number(match[1]), text: clean(match[2])})).filter((item) => item.text);
  const imageCount = [...html.matchAll(/<img\b/gi)].length;
  const missingAlt = [...html.matchAll(/<img\b([^>]*)>/gi)].filter((match) => !/\balt\s*=\s*["'][^"']*["']/i.test(match[1])).length;
  const schemaCount = [...html.matchAll(/application\/ld\+json/gi)].length;
  const textContent = clean(html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, ""));
  return {url: url.toString(), status: response.status, responseMs: Date.now() - started, title, description, canonical, robots, ogTitle, h1: headings.filter((item) => item.level === 1).map((item) => item.text), h2: headings.filter((item) => item.level === 2).map((item) => item.text), imageCount, missingAlt, schemaCount, wordCount: textContent ? textContent.split(/\s+/).length : 0};
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({error: "Authentication required."}, {status: 401});
  try {
    const body = await request.json();
    const [site, competitor] = await Promise.all([audit(body.siteUrl), audit(body.competitorUrl)]);
    return NextResponse.json({site, competitor});
  } catch (error) {
    return NextResponse.json({error: error instanceof Error ? error.message : "Unable to audit those URLs."}, {status: 400});
  }
}

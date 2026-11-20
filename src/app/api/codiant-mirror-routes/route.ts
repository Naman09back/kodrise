import {getCodiantSourceRouteMap} from "@/lib/codiant-mirrors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(await getCodiantSourceRouteMap(), {headers: {"Cache-Control": "public, max-age=300, stale-while-revalidate=3600"}});
}

import {NextResponse} from "next/server";
import {createClient} from "next-sanity";

export async function POST(request: Request) {
  const body = await request.json();
  if (!body?.name || !body?.email || !body?.company || !body?.message) return NextResponse.json({error: "Please complete the required fields."}, {status: 400});
  const lead = {name: String(body.name).trim(), email: String(body.email).trim(), phone: String(body.phone || "").trim(), company: String(body.company).trim(), engagement: String(body.engagement || ""), technology: String(body.technology || ""), message: String(body.message).trim()};
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (token) {
    const client = createClient({projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "5vojr174", dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production", apiVersion: "2026-02-01", token, useCdn: false});
    await client.create({_type: "lead", ...lead, status: "new", createdAt: new Date().toISOString()});
  }
  if (process.env.CRM_WEBHOOK_URL) {
    await fetch(process.env.CRM_WEBHOOK_URL, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({...lead, source: "kodrise-website"})});
  }
  return NextResponse.json({stored: Boolean(token), sentToCrm: Boolean(process.env.CRM_WEBHOOK_URL)});
}

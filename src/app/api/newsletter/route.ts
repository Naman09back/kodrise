import {NextResponse} from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = String(body?.email || "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({error: "Enter a valid email address."}, {status: 400});
  }

  const webhook = process.env.CRM_WEBHOOK_URL;
  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, source: "kodrise-newsletter", subscribedAt: new Date().toISOString()}),
      });
      if (!response.ok) return NextResponse.json({error: "Subscription could not be saved."}, {status: 502});
    } catch {
      return NextResponse.json({error: "Subscription could not be saved."}, {status: 502});
    }
  }

  return NextResponse.json({accepted: true, connected: Boolean(webhook)});
}

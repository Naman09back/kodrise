import {NextResponse} from "next/server";
import {sanityClient} from "../../../../sanity/lib/client";

export async function GET() {
  const page = await sanityClient.fetch(`*[_type == "sitePage" && pageKey == "home"][0]{heroTitle, heroAccent, heroDescription, announcement, primaryCta, secondaryCta}`);
  return NextResponse.json(page || {});
}

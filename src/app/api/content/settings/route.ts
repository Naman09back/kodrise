import {NextResponse} from "next/server";
import {sanityClient} from "../../../../sanity/lib/client";

export async function GET() {
  const settings = await sanityClient.fetch(`*[_type == "siteSettings"][0]{siteName, tagline, contactEmail, phone, address, linkedin, x, instagram}`);
  return NextResponse.json(settings || {});
}

import {NextResponse} from "next/server";
import {sanityClient} from "../../../../sanity/lib/client";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const key = new URL(request.url).searchParams.get("key") || "";
  if (!/^[a-z0-9-]{1,120}$/.test(key)) return NextResponse.json({page: null}, {status: 400});

  const page = await sanityClient.fetch(
    `*[_type == "sitePage" && pageKey == $key][0]{
      title, heroTitle, heroAccent, heroDescription, announcement,
      primaryCta, primaryCtaUrl, secondaryCta, secondaryCtaUrl,
      heroImage {asset->{url}, alt}, seo {title, description, noIndex}
    }`,
    {key},
  ).catch(() => null);

  return NextResponse.json({page});
}

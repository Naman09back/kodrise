import {NextResponse} from "next/server";
import {getAdminSession} from "../../../../lib/admin-session";
import {sanityWriteClient} from "../../../../sanity/lib/client";

const createTypes = new Set(["service", "caseStudy", "industry", "insight", "resource", "faq", "developer"]);
const deletableTypes = new Set([...createTypes, "siteAsset"]);

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function POST(request: Request) {
  if (!await getAdminSession()) return NextResponse.json({error: "Authentication required."}, {status: 401});
  if (!process.env.SANITY_API_WRITE_TOKEN) return NextResponse.json({error: "Sanity write access is not configured."}, {status: 503});

  const body = await request.json().catch(() => ({}));
  const type = String(body.type || "");
  const input = body.fields && typeof body.fields === "object" ? body.fields as Record<string, unknown> : {};
  if (!createTypes.has(type)) return NextResponse.json({error: "This content type cannot be created here."}, {status: 400});

  const value = (key: string) => String(input[key] || "").trim();
  const title = value("title");
  const document: Record<string, unknown> & {_type: string} = {_type: type};

  if (type === "faq") {
    if (!value("question") || !value("answer")) return NextResponse.json({error: "A question and answer are required."}, {status: 400});
    Object.assign(document, {question: value("question"), answer: value("answer"), order: 0, isPublished: false});
  } else if (type === "developer") {
    if (!value("profileId") || !value("role")) return NextResponse.json({error: "Profile ID and role are required."}, {status: 400});
    Object.assign(document, {profileId: value("profileId"), role: value("role"), name: value("name"), isPublished: false});
  } else if (type === "caseStudy") {
    if (!title || !value("client")) return NextResponse.json({error: "Project title and client are required."}, {status: 400});
    Object.assign(document, {title, client: value("client"), slug: {_type: "slug", current: slugify(title)}, isPublished: false, isFeatured: false});
  } else {
    if (!title) return NextResponse.json({error: "A title is required."}, {status: 400});
    Object.assign(document, {title});
    if (["service", "industry", "insight"].includes(type)) document.slug = {_type: "slug", current: slugify(title)};
    if (type === "service") document.isPublished = false;
    if (type === "industry") document.isFeatured = false;
    if (type === "resource") {
      const url = value("url");
      if (!value("excerpt") || !url || !URL.canParse(url)) return NextResponse.json({error: "A description and valid destination URL are required."}, {status: 400});
      Object.assign(document, {excerpt: value("excerpt"), url, isPublished: false, order: 0});
    }
    if (type === "insight") Object.assign(document, {isPublished: false, isFeatured: false});
  }

  const created = await sanityWriteClient.create(document);
  const createdSlug = created.slug as {_type?: string; current?: string} | undefined;
  return NextResponse.json({item: {...created, ...(createdSlug?.current ? {slug: createdSlug.current} : {})}});
}

export async function DELETE(request: Request) {
  if (!await getAdminSession()) return NextResponse.json({error: "Authentication required."}, {status: 401});
  if (!process.env.SANITY_API_WRITE_TOKEN) return NextResponse.json({error: "Sanity write access is not configured."}, {status: 503});
  const body = await request.json().catch(() => ({}));
  const id = String(body.id || "");
  if (!id) return NextResponse.json({error: "Content ID is required."}, {status: 400});
  const document = await sanityWriteClient.fetch<{_id: string; _type: string} | null>(`*[_id == $id][0]{_id,_type}`, {id});
  if (!document || !deletableTypes.has(document._type)) return NextResponse.json({error: "This content cannot be deleted here."}, {status: 404});
  await sanityWriteClient.delete(document._id);
  return NextResponse.json({ok: true, id: document._id, type: document._type});
}

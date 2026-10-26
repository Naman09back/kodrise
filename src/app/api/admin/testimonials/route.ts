import {NextRequest, NextResponse} from "next/server";
import {getAdminSession} from "../../../../lib/admin-session";
import {sanityWriteClient} from "../../../../sanity/lib/client";

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({error: "Authentication required."}, {status: 401});
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const quote = String(body.quote || "").trim();
    if (name.length < 2 || !quote) return NextResponse.json({error: "Name and review are required."}, {status: 400});
    const testimonial = await sanityWriteClient.create({
      _type: "testimonial",
      name,
      role: String(body.role || "").trim(),
      company: String(body.company || "").trim(),
      quote,
      rating: Math.min(5, Math.max(1, Number(body.rating) || 5)),
      status: body.status === "approved" ? "approved" : "pending",
      featured: Boolean(body.featured),
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json({testimonial});
  } catch (error) {
    console.error("Unable to create testimonial:", error);
    return NextResponse.json({error: "Unable to create this review."}, {status: 500});
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({error: "Authentication required."}, {status: 401});

  try {
    const {id} = await request.json();
    if (!id || typeof id !== "string") return NextResponse.json({error: "A review ID is required."}, {status: 400});
    const baseId = id.replace(/^drafts\./, "");
    const ids = [baseId, `drafts.${baseId}`];
    const reviews = await sanityWriteClient.fetch<Array<{_id: string; _type?: string}>>(`*[_id in $ids]{_id, _type}`, {ids});
    const testimonialIds = reviews.filter((review) => review._type === "testimonial").map((review) => review._id);
    if (!testimonialIds.length) return NextResponse.json({error: "Only testimonial reviews can be deleted here."}, {status: 400});
    const transaction = sanityWriteClient.transaction();
    testimonialIds.forEach((testimonialId) => transaction.delete(testimonialId));
    await transaction.commit();
    return NextResponse.json({ok: true, deleted: testimonialIds});
  } catch (error) {
    console.error("Unable to delete testimonial:", error);
    return NextResponse.json({error: "Unable to delete this review."}, {status: 500});
  }
}

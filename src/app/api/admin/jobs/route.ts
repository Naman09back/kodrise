import {NextRequest, NextResponse} from "next/server";
import {getAdminSession} from "../../../../lib/admin-session";
import {sanityWriteClient} from "../../../../sanity/lib/client";

function slugify(value: string) { return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({error: "Authentication required."}, {status: 401});
  try {
    const body = await request.json();
    const title = String(body.title || "").trim();
    if (!title) return NextResponse.json({error: "Job title is required."}, {status: 400});
    const job = await sanityWriteClient.create({_type: "job", title, slug: {_type: "slug", current: slugify(title)}, location: String(body.location || "").trim(), employmentType: String(body.employmentType || "Full-time").trim(), summary: String(body.summary || "").trim(), skills: String(body.skills || "").split("\n").map((item) => item.trim()).filter(Boolean), isOpen: body.isOpen !== "false", createdAt: new Date().toISOString()});
    return NextResponse.json({job});
  } catch (error) {
    console.error("Unable to create job:", error);
    return NextResponse.json({error: "Unable to create this job opening."}, {status: 500});
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({error: "Authentication required."}, {status: 401});

  try {
    const {id} = await request.json();
    if (!id || typeof id !== "string") return NextResponse.json({error: "A job ID is required."}, {status: 400});
    const baseId = id.replace(/^drafts\./, "");
    const ids = [baseId, `drafts.${baseId}`];
    const records = await sanityWriteClient.fetch<Array<{_id: string; _type?: string}>>(`*[_id in $ids]{_id, _type}`, {ids});
    const jobIds = records.filter((record) => record._type === "job").map((record) => record._id);
    if (!jobIds.length) return NextResponse.json({error: "Only job openings can be deleted here."}, {status: 400});
    const transaction = sanityWriteClient.transaction();
    jobIds.forEach((jobId) => transaction.delete(jobId));
    await transaction.commit();
    return NextResponse.json({ok: true, deleted: jobIds});
  } catch (error) {
    console.error("Unable to delete job:", error);
    return NextResponse.json({error: "Unable to delete this job opening."}, {status: 500});
  }
}

import {NextRequest, NextResponse} from "next/server";
import {getAdminSession} from "../../../../lib/admin-session";
import {sanityWriteClient} from "../../../../sanity/lib/client";

export async function DELETE(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({error: "Authentication required."}, {status: 401});

  try {
    const {id} = await request.json();
    if (!id || typeof id !== "string") return NextResponse.json({error: "An application ID is required."}, {status: 400});
    const baseId = id.replace(/^drafts\./, "");
    const ids = [baseId, `drafts.${baseId}`];
    const records = await sanityWriteClient.fetch<Array<{_id: string; _type?: string}>>(
      `*[_id in $ids]{_id, _type}`,
      {ids},
    );
    const applicationIds = records.filter((record) => record._type === "jobApplication").map((record) => record._id);
    if (!applicationIds.length) return NextResponse.json({error: "Only job applications can be deleted here."}, {status: 400});
    const transaction = sanityWriteClient.transaction();
    applicationIds.forEach((applicationId) => transaction.delete(applicationId));
    await transaction.commit();
    return NextResponse.json({ok: true, deleted: applicationIds});
  } catch (error) {
    console.error("Unable to delete job application:", error);
    return NextResponse.json({error: "Unable to delete this application."}, {status: 500});
  }
}

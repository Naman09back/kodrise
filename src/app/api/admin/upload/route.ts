import {NextResponse} from "next/server";
import {getAdminSession} from "../../../../lib/admin-session";
import {sanityWriteClient} from "../../../../sanity/lib/client";

export async function POST(request: Request) {
  if (!await getAdminSession()) return NextResponse.json({error: "Authentication required."}, {status: 401});
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || !file.size) return NextResponse.json({error: "Choose an image first."}, {status: 400});
  if (!file.type.startsWith("image/")) return NextResponse.json({error: "Only image files are supported."}, {status: 400});
  if (file.size > 5 * 1024 * 1024) return NextResponse.json({error: "Images must be smaller than 5 MB."}, {status: 400});
  const asset = await sanityWriteClient.assets.upload("image", file, {filename: file.name});
  return NextResponse.json({assetId: asset._id});
}

import {NextResponse} from "next/server";
import {getAdminSession} from "../../../../lib/admin-session";
import {sanityWriteClient} from "../../../../sanity/lib/client";
import {isAllowedImageUpload, isSiteAssetSlot, MAX_IMAGE_BYTES} from "../../../../lib/home-content";

export async function POST(request: Request) {
  if (!await getAdminSession()) return NextResponse.json({error: "Authentication required."}, {status: 401});
  const form = await request.formData();
  const slot = String(form.get("slot") || "");
  const title = String(form.get("title") || "").trim();
  const alt = String(form.get("alt") || "").trim();
  const sourcePath = String(form.get("sourcePath") || "").trim();
  const sourceUrl = String(form.get("sourceUrl") || "").trim();
  const sourceCreator = String(form.get("sourceCreator") || "").trim();
  const sourceLicense = String(form.get("sourceLicense") || "").trim();
  const licenseVerifiedAt = String(form.get("licenseVerifiedAt") || "").trim();
  const file = form.get("file");
  if (!isSiteAssetSlot(slot) || !title || !alt) return NextResponse.json({error: "Enter a valid image key, title, and alt text."}, {status: 400});
  if (sourcePath && sourcePath.length > 2048) return NextResponse.json({error: "The image source path is too long."}, {status: 400});
  if (sourcePath && !sourcePath.startsWith("/") && !/^https?:\/\//i.test(sourcePath)) return NextResponse.json({error: "Use a site path or an HTTP(S) image URL."}, {status: 400});
  if (sourceUrl && !/^https?:\/\//i.test(sourceUrl)) return NextResponse.json({error: "Use an HTTP(S) original source URL."}, {status: 400});
  if (!sourceLicense || sourceLicense.length > 240) return NextResponse.json({error: "Enter the image license or rights basis (up to 240 characters)."}, {status: 400});
  if (!licenseVerifiedAt) return NextResponse.json({error: "Record when the image rights were checked."}, {status: 400});
  if (licenseVerifiedAt && !/^\d{4}-\d{2}-\d{2}$/.test(licenseVerifiedAt)) return NextResponse.json({error: "Enter a valid rights-check date."}, {status: 400});
  if (!(file instanceof File) || !file.size) return NextResponse.json({error: "Choose an image first."}, {status: 400});
  if (!isAllowedImageUpload(file.type, file.size)) return NextResponse.json({error: `Images must be valid image files smaller than ${MAX_IMAGE_BYTES / 1024 / 1024} MB.`}, {status: 400});

  const asset = await sanityWriteClient.assets.upload("image", file, {filename: file.name});
  const existing = await sanityWriteClient.fetch<{_id: string} | null>(`*[_type == "siteAsset" && slot == $slot][0]{_id}`, {slot});
  const image = {_type: "image", asset: {_type: "reference", _ref: asset._id}};
  const record = existing
    ? sourcePath
      ? await sanityWriteClient.patch(existing._id).set({title, alt, sourcePath, sourceUrl, sourceCreator, sourceLicense, licenseVerifiedAt, image}).commit()
      : await sanityWriteClient.patch(existing._id).set({title, alt, sourceUrl, sourceCreator, sourceLicense, licenseVerifiedAt, image}).unset(["sourcePath"]).commit()
    : await sanityWriteClient.create({_type: "siteAsset", slot, title, alt, ...(sourcePath ? {sourcePath} : {}), sourceUrl, sourceCreator, sourceLicense, licenseVerifiedAt, image});
  return NextResponse.json({asset: {...record, image: {asset: {_id: asset._id, url: asset.url}, alt}}});
}

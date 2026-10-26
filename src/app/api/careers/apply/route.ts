import {NextResponse} from "next/server";
import {createClient} from "next-sanity";

const MAX_RESUME_SIZE = 10 * 1024 * 1024;
const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const ALLOWED_RESUME_EXTENSIONS = ["pdf", "doc", "docx"];

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const resume = form.get("resume");

    if (!name || !email) {
      return NextResponse.json({error: "Name and email are required."}, {status: 400});
    }
    if (!(resume instanceof File) || !resume.size) {
      return NextResponse.json({error: "Please attach your resume."}, {status: 400});
    }
    if (resume.size > MAX_RESUME_SIZE) {
      return NextResponse.json({error: "Resume must be 10 MB or smaller."}, {status: 400});
    }

    const extension = resume.name.toLowerCase().split(".").pop() || "";
    if (!ALLOWED_RESUME_TYPES.includes(resume.type) && !ALLOWED_RESUME_EXTENSIONS.includes(extension)) {
      return NextResponse.json({error: "Resume must be a PDF, DOC or DOCX file."}, {status: 400});
    }

    const token = process.env.SANITY_API_WRITE_TOKEN;
    if (!token) return NextResponse.json({error: "Applications are not configured yet."}, {status: 503});

    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "5vojr174",
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2026-02-01",
      token,
      useCdn: false,
    });
    const asset = await client.assets.upload("file", resume, {
      filename: resume.name,
      contentType: resume.type || undefined,
    });

    await client.create({
      _type: "jobApplication",
      name,
      email,
      role: String(form.get("role") || "General application").trim(),
      linkedin: String(form.get("linkedin") || "").trim() || undefined,
      message: String(form.get("message") || "").trim(),
      resumeUrl: asset.url,
      status: "new",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ok: true});
  } catch (error) {
    console.error("Career application submission failed", error);
    return NextResponse.json({error: "Unable to submit application."}, {status: 500});
  }
}

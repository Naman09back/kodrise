import {NextResponse} from "next/server";
import {getAdminSession} from "../../../../lib/admin-session";
import {hashAdminPassword} from "../../../../lib/admin-password";
import {sanityClient, sanityWriteClient} from "../../../../sanity/lib/client";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (session?.role !== "admin") return NextResponse.json({error: "Admin access required."}, {status: 403});
  const users = await sanityClient.fetch<Array<{_id: string; email: string; role: "admin" | "editor"; isActive?: boolean; createdAt?: string}>>(`*[_type == "adminUser"] | order(email asc){_id, email, role, isActive, createdAt}`);
  const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (configuredEmail && !users.some((user) => user.email.toLowerCase() === configuredEmail)) {
    users.unshift({_id: "env-primary-admin", email: configuredEmail, role: "admin", isActive: true});
  }
  return NextResponse.json({users});
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (session?.role !== "admin") return NextResponse.json({error: "Admin access required."}, {status: 403});
  const body = await request.json();
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  const role = body.role === "admin" ? "admin" : "editor";
  if (!email || password.length < 8) return NextResponse.json({error: "A valid email and password of at least 8 characters are required."}, {status: 400});
  const existing = await sanityClient.fetch(`count(*[_type == "adminUser" && lower(email) == $email])`, {email});
  if (existing) return NextResponse.json({error: "A user with this email already exists."}, {status: 409});
  const user = await sanityWriteClient.create({
    _type: "adminUser",
    email,
    passwordHash: hashAdminPassword(password),
    role,
    isActive: true,
    createdAt: new Date().toISOString(),
  });
  return NextResponse.json({ok: true, user: {_id: user._id, email, role, isActive: true}}, {status: 201});
}

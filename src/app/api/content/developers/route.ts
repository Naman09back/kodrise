import {NextResponse} from "next/server";
import {sanityClient} from "../../../../sanity/lib/client";

export async function GET() {
  const developers = await sanityClient.fetch(`*[_type == "developer" && isPublished != false] | order(profileId asc){profileId, name, role, experience, skills, availability, engagement}`);
  return NextResponse.json(developers);
}

import {NextResponse} from "next/server";
import {sanityClient} from "../../../sanity/lib/client";

type Testimonial = {_id: string; name?: string; role?: string; company?: string; quote?: string; rating?: number};

export async function GET() {
  try {
    const testimonials = await sanityClient.fetch<Testimonial[]>(
      `*[_type == "testimonial" && status == "approved"] | order(featured desc, createdAt desc)[0...6]{_id, name, role, company, quote, rating}`,
    );
    return NextResponse.json(testimonials || []);
  } catch (error) {
    console.error("Unable to load testimonials:", error);
    return NextResponse.json([]);
  }
}

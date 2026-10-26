import {NextResponse} from "next/server";
import {getAdminSession} from "../../../../lib/admin-session";

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({error: "Authentication required."}, {status: 401});
  return NextResponse.json({error: "Password changes are managed by Google."}, {status: 410});
}

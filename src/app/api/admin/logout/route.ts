import {signOut} from "../../../../auth";

export async function POST(request: Request) {
  return signOut({redirectTo: new URL("/admin/login", request.url).toString()});
}

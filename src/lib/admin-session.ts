import {auth} from "../auth";

export async function getAdminSession() {
  const session = await auth();
  if (!session?.user?.email || !session.user.role) return null;
  return {email: session.user.email, role: session.user.role};
}

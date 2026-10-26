import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import {verifyAdminPassword} from "./lib/admin-password";
import {sanityClient} from "./sanity/lib/client";

export type AdminRole = "admin" | "editor";

async function getAdminRole(email?: string | null): Promise<AdminRole | null> {
  const normalizedEmail = email?.trim().toLowerCase();
  if (!normalizedEmail) return null;

  if (normalizedEmail === process.env.ADMIN_EMAIL?.trim().toLowerCase()) return "admin";

  try {
    const user = await sanityClient.fetch<{role?: AdminRole; isActive?: boolean} | null>(
      `*[_type == "adminUser" && lower(email) == $email][0]{role, isActive}`,
      {email: normalizedEmail},
    );
    if (user?.isActive === false) return null;
    return user?.role === "admin" ? "admin" : user?.role === "editor" ? "editor" : null;
  } catch (error) {
    console.error("Unable to verify dashboard user in Sanity:", error);
    return null;
  }
}

export const {handlers, auth, signIn, signOut} = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET || process.env.ADMIN_SESSION_SECRET,
  pages: {signIn: "/admin/login"},
  providers: [
    Google({checks: process.env.NODE_ENV === "development" ? ["none"] : ["pkce", "state"]}),
    Credentials({
      credentials: {email: {}, password: {type: "password"}},
      async authorize(credentials) {
        const email = String(credentials?.email || "").trim().toLowerCase();
        const password = String(credentials?.password || "");
        if (!email || !password) return null;
        const bootstrapEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
        console.log("Credentials bootstrap check", {email, emailMatch: email === bootstrapEmail, passwordMatch: password === process.env.ADMIN_INITIAL_PASSWORD});
        if (email === bootstrapEmail && password === process.env.ADMIN_INITIAL_PASSWORD) {
          return {id: "env-primary-admin", email, role: "admin"};
        }
        const user = await sanityClient.fetch<{_id: string; email: string; passwordHash?: string; role?: AdminRole; isActive?: boolean} | null>(
          `*[_type == "adminUser" && lower(email) == $email][0]{_id, email, passwordHash, role, isActive}`,
          {email},
        );
        if (user?.isActive === false || !user?.passwordHash || !verifyAdminPassword(password, user.passwordHash)) return null;
        return {id: user._id, email: user.email, role: user.role === "admin" ? "admin" : "editor"};
      },
    }),
  ],
  callbacks: {
    async signIn({user, profile}) {
      return Boolean(await getAdminRole(profile?.email || user.email));
    },
    async jwt({token, user, profile}) {
      const email = profile?.email || user?.email || token.email;
      if (email) {
        const role = await getAdminRole(email);
        if (!role) return {};
        token.email = email;
        token.role = role;
      }
      return token;
    },
    async session({session, token}) {
      if (session.user) {
        session.user.email = token.email || session.user.email;
        session.user.role = token.role as AdminRole | undefined;
      }
      return session;
    },
  },
});

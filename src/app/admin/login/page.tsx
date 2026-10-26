import {signIn} from "../../../auth";
import {redirect} from "next/navigation";

export default async function AdminLoginPage({searchParams}: {searchParams: Promise<{error?: string}>}) {
  const error = (await searchParams).error;

  async function loginWithGoogle() {
    "use server";
    await signIn("google", {redirectTo: "/admin"});
  }

  async function loginWithEmail(formData: FormData) {
    "use server";
    try {
      await signIn("credentials", {email: String(formData.get("email") || ""), password: String(formData.get("password") || ""), redirectTo: "/admin"});
    } catch {
      redirect("/admin/login?error=credentials");
    }
  }

  return <main className="admin-login"><div className="admin-login-stack"><form action={loginWithEmail}><span className="admin-kicker">KODRISE CONTENT</span><h1>Sign in to edit</h1><p>Use your dashboard email and password.</p>{error && <p className="admin-login-error">Invalid email or password.</p>}<label>Email<input name="email" type="email" required autoFocus /></label><label>Password<input name="password" type="password" required /></label><button className="button primary" type="submit">Sign in with email</button></form><form action={loginWithGoogle} className="admin-login-google"><p>Or continue with Google</p><button className="button secondary" type="submit">Continue with Google</button></form></div></main>;
}

import "next-auth";
import "next-auth/jwt";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      role?: "admin" | "editor";
    } & Session["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "admin" | "editor";
  }
}

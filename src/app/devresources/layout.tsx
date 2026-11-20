import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Developer Resources | Kodrise",
  description: "Meet Kodrise's vetted developers across AI, web, mobile, cloud, and enterprise engineering.",
  alternates: {canonical: "/devresources"},
};

export default function DeveloperResourcesLayout({children}: Readonly<{children: React.ReactNode}>) {
  return children;
}

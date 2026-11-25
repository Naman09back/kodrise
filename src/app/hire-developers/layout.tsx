import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Hire Developers | Kodrise",
  description: "Explore developer roles across AI, software, cloud, mobile, and commerce, then share your hiring requirements with Kodrise.",
  alternates: {canonical: "/hire-developers"},
};

export default function DeveloperResourcesLayout({children}: Readonly<{children: React.ReactNode}>) {
  return children;
}

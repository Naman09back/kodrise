import fs from "node:fs";
import path from "node:path";
import {createClient} from "next-sanity";

const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)=(.*)\s*$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
  }
}

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) throw new Error("SANITY_API_WRITE_TOKEN is missing in .env.local");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "5vojr174",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-02-01",
  token,
  useCdn: false,
});

const page = {
  _type: "sitePage",
  title: "AI Services",
  pageKey: "services",
  path: "/services",
  family: "AI Services",
  isPublished: true,
  announcement: "OUR AI SERVICES",
  heroTitle: "Build with intelligence",
  heroAccent: "Create what comes next",
  heroDescription: "Turn promising AI ideas into useful products and workflows. Kodrise brings product thinking and engineering together to help your business move forward.",
  primaryCta: "Talk to our AI team",
  primaryCtaUrl: "/contact",
  seo: {
    title: "AI Services | Kodrise",
    description: "Explore Kodrise AI services, from generative AI and agents to machine learning, chatbots, NLP, RAG, and AI consulting.",
  },
};

const existing = await client.fetch('*[_type == "sitePage" && pageKey == $pageKey][0]{_id}', {pageKey: page.pageKey});
if (existing?._id) {
  await client.patch(existing._id).set(page).commit({visibility: "sync"});
  console.log("Updated the AI Services page in Sanity.");
} else {
  await client.create({_id: "sitePage-ai-services", ...page}, {visibility: "sync"});
  console.log("Added the AI Services page to Sanity.");
}

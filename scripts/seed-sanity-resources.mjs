import fs from "node:fs";
import path from "node:path";
import {createClient} from "next-sanity";

const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
  const match = line.match(/^\s*([A-Z0-9_]+)=(.*)\s*$/);
  if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
}
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) throw new Error("SANITY_API_WRITE_TOKEN is missing in .env.local");
const client = createClient({projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "5vojr174", dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production", apiVersion: "2026-02-01", token, useCdn: false});
const resources = [
  ["Web App Cost Calculator", "Tools", "Estimate the investment, timeline, and team shape for your next web application.", "/resources/web-cost-calculator", "services-web.webp"],
  ["Mobile App Cost Calculator", "Tools", "Plan a mobile product with a clearer view of features, platforms, and delivery effort.", "/resources/app-cost-calculator", "services-mobile.webp"],
  ["Mobile App RFP Template", "Templates", "Start with a practical brief that helps your stakeholders and delivery team align faster.", "/resources/mobile-app-rfp", "services-teams.webp"],
  ["Blogs", "Insights", "Stay ahead with expert insights on AI, digital transformation, engineering, and product strategy.", "/resources/blogs", "home-bg.webp"],
  ["PR Updates", "Company", "Follow the latest Kodrise announcements, launches, partnerships, and company updates.", "/resources/press-releases", "awards.webp"],
  ["eBooks", "Insights", "Explore practical guides and research-led ideas for making technology work harder for your business.", "/resources/ebooks", "services-ai.webp"],
  ["Free Digital Consultation", "Company", "Bring us your ambition, constraint, or product idea and get a useful next step from our team.", "/resources/free-digital-consultation", "services-custom.webp"],
];
for (const [index, [title, category, excerpt, url, fileName]] of resources.entries()) {
  const existing = await client.fetch(`*[_type == "resource" && title == $title][0]{_id}`, {title});
  const asset = await client.assets.upload("image", fs.createReadStream(path.join(process.cwd(), "public", "site-assets", fileName)), {filename: fileName});
  const data = {_type: "resource", title, category, excerpt, url, isPublished: true, order: index, image: {_type: "image", asset: {_type: "reference", _ref: asset._id}}};
  if (existing?._id) await client.patch(existing._id).set(data).commit();
  else await client.create(data);
  console.log(`${existing?._id ? "Updated" : "Created"}: ${title}`);
}

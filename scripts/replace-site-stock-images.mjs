import {createClient} from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "5vojr174",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-02-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

if (!process.env.SANITY_API_WRITE_TOKEN) throw new Error("SANITY_API_WRITE_TOKEN is required.");

const replacements = [
  {
    slot: "about-hero",
    title: "Kodrise team collaboration",
    alt: "A software team collaborating around a table in a modern office",
    file: "about-team.jpg",
    imageUrl: "https://images.pexels.com/photos/29267507/pexels-photo-29267507.jpeg?cs=srgb&dl=pexels-bertellifotografia-29267507.jpg&fm=jpg",
    sourceUrl: "https://www.pexels.com/photo/casual-team-meeting-in-modern-office-29267507/",
    creator: "Matheus Bertelli",
  },
  {
    slot: "about-partner-photo",
    title: "Digital product work",
    alt: "A professional working on a laptop in a modern office",
    file: "about-partner.jpg",
    imageUrl: "https://images.pexels.com/photos/35754363/pexels-photo-35754363.jpeg?cs=srgb&dl=pexels-sommart-sopon-2156447793-35754363.jpg&fm=jpg",
    sourceUrl: "https://www.pexels.com/photo/professional-working-on-laptop-in-modern-office-35754363/",
    creator: "Sommart Sopon",
  },
  {
    slot: "about-careers-photo",
    title: "Technology at work",
    alt: "A computer workstation in a modern workspace",
    file: "about-careers.jpg",
    imageUrl: "https://images.pexels.com/photos/27559482/pexels-photo-27559482.jpeg?cs=srgb&dl=pexels-minhphuc-workspace-130773295-27559482.jpg&fm=jpg",
    sourceUrl: "https://www.pexels.com/photo/a-computer-monitor-on-a-desk-with-a-keyboard-and-mouse-27559482/",
    creator: "minhphuc .workspace",
  },
  {
    slot: "shopify-seo-hero",
    title: "Online commerce planning",
    alt: "A person planning an online shopping experience on a laptop",
    file: "shopify-seo-hero.jpg",
    imageUrl: "https://images.pexels.com/photos/29502371/pexels-photo-29502371.jpeg?cs=srgb&dl=pexels-julio-lopez-817581-2157566789-29502371.jpg&fm=jpg",
    sourceUrl: "https://www.pexels.com/photo/digital-shopping-on-laptop-and-smartphone-29502371/",
    creator: "Julio Lopez",
  },
  {
    slot: "shopify-seo-team",
    title: "Digital marketing work",
    alt: "Hands working on a laptop during a digital marketing task",
    file: "shopify-seo-team.jpg",
    imageUrl: "https://images.pexels.com/photos/5474295/pexels-photo-5474295.jpeg?cs=srgb&dl=pexels-cottonbro-5474295.jpg&fm=jpg",
    sourceUrl: "https://www.pexels.com/photo/hands-on-a-laptop-keyboard-5474295/",
    creator: "cottonbro studio",
  },
];

for (const replacement of replacements) {
  const existing = await client.fetch(`*[_type == "siteAsset" && slot == $slot][0]{_id}`, {slot: replacement.slot});
  if (!existing?._id) throw new Error(`Missing Sanity image slot: ${replacement.slot}`);
  const response = await fetch(replacement.imageUrl, {headers: {"User-Agent": "Kodrise website image licensing update"}});
  if (!response.ok) throw new Error(`Could not download ${replacement.slot}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 10_000 || bytes.length > 12_000_000) throw new Error(`Unexpected image size for ${replacement.slot}: ${bytes.length}`);
  const asset = await client.assets.upload("image", bytes, {filename: replacement.file, contentType: "image/jpeg"});
  await client.patch(existing._id).set({
    title: replacement.title,
    alt: replacement.alt,
    sourcePath: `/site-assets/licensed/${replacement.file}`,
    sourceUrl: replacement.sourceUrl,
    sourceCreator: replacement.creator,
    sourceLicense: "Pexels License (free commercial use; attribution optional)",
    licenseVerifiedAt: "2026-11-24",
    image: {_type: "image", asset: {_type: "reference", _ref: asset._id}},
  }).commit();
  console.log(`Updated ${replacement.slot} -> ${asset.url}`);
}

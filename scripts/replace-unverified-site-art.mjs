import {readdir, readFile} from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import {createClient} from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "5vojr174",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-02-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});
if (!process.env.SANITY_API_WRITE_TOKEN) throw new Error("SANITY_API_WRITE_TOKEN is required.");

const pexels = {
  "homepage-industry-ecommerce": {id: 29502371, creator: "Julio Lopez", page: "https://www.pexels.com/photo/digital-shopping-on-laptop-and-smartphone-29502371/", alt: "A laptop and smartphone display an online shopping experience"},
  "homepage-industry-healthcare": {id: 6010792, creator: "Tima Miroshnichenko", page: "https://www.pexels.com/photo/doctor-beside-a-patient-6010792/", alt: "A doctor speaking with a patient in a healthcare setting"},
  "homepage-industry-transport": {id: 29786116, creator: "Juan R. Real", page: "https://www.pexels.com/photo/warehouse-with-delivery-truck-exiting-the-loading-dock-29786116/", alt: "A delivery truck leaving a warehouse loading area"},
  "homepage-industry-real-estate": {id: 35707771, creator: "Mahmoud Zakariya", page: "https://www.pexels.com/photo/modern-apartment-complex-with-balconies-at-daytime-35707771/", alt: "A modern apartment building with balconies"},
  "homepage-industry-education": {id: 7742816, creator: "Alena Darmel", page: "https://www.pexels.com/photo/students-busy-using-laptops-in-the-classroom-7742816/", alt: "Students using laptops in a classroom"},
  "homepage-industry-media": {id: 8088381, creator: "Ron Lach", page: "https://www.pexels.com/photo/a-cameraman-working-on-set-8088381/", alt: "A camera operator working on a film production set"},
  "homepage-industry-on-demand": {id: 12725400, creator: "ROMAN ODINTSOV", page: "https://www.pexels.com/photo/a-man-delivering-a-package-12725400/", alt: "A courier handing a parcel to a customer"},
  "homepage-industry-travel": {id: 3140204, creator: "Brett Sayles", page: "https://www.pexels.com/photo/photo-of-airplanes-at-airport-3140204/", alt: "Airplanes parked at an airport terminal"},
};

async function sourceFiles(dir) {
  const files = [];
  for (const entry of await readdir(dir, {withFileTypes: true})) {
    const filename = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await sourceFiles(filename));
    else if (/\.(tsx?|jsx?|css|mjs|json)$/.test(entry.name)) files.push(filename);
  }
  return files;
}

function hash(value) {
  let h = 2166136261;
  for (const char of value) h = Math.imul(h ^ char.charCodeAt(0), 16777619);
  return h >>> 0;
}

function escapeXml(value) {
  return value.replace(/[<>&"']/g, (char) => ({"<": "&lt;", ">": "&gt;", "&": "&amp;", "\"": "&quot;", "'": "&apos;"})[char]);
}

function originalArtwork(slot, width, height) {
  const ratio = Math.max(1.2, Math.min(2.7, width / height));
  const w = 1440;
  const h = Math.round(w / ratio);
  const id = hash(slot);
  const migration = slot.startsWith("shopify-migration-");
  const ecommerce = migration || /shopify|commerce|ecommerce|storefront|checkout|catalog|product/i.test(slot);
  const data = /data|customer|catalog|content|import|migrate|move|transfer/i.test(slot);
  const analytics = /seo|analytics|report|performance|machine|ml-|metric/i.test(slot);
  const color = ["#f1454b", "#a858f5", "#2b8bff", "#14a77a"][id % 4];
  const x = 96 + id % 160;
  const card = (cx, cy, cw, ch, opacity = 1) => `<rect x="${cx}" y="${cy}" width="${cw}" height="${ch}" rx="18" fill="#202431" stroke="#363d4e" stroke-width="2" opacity="${opacity}"/>`;
  const row = (cx, cy, cw, h = 13, opacity = 1) => `<rect x="${cx}" y="${cy}" width="${cw}" height="${h}" rx="${h / 2}" fill="#8f98aa" opacity="${opacity}"/>`;
  const nodes = Array.from({length: 4}, (_, i) => {
    const nx = 300 + i * 260;
    return `<path d="M${nx + 36} ${h * .51} H${nx + 188}" stroke="#5d667b" stroke-width="5" stroke-linecap="round"/><circle cx="${nx + 35}" cy="${h * .51}" r="31" fill="#252a38" stroke="${color}" stroke-width="4"/><circle cx="${nx + 35}" cy="${h * .51}" r="8" fill="${color}"/>`;
  }).join("");
  const ui = ecommerce
    ? `<rect x="${x}" y="${h * .29}" width="${w - x * 2}" height="${h * .58}" rx="22" fill="#171b25" stroke="#434a5b" stroke-width="2"/><rect x="${x}" y="${h * .29}" width="${w - x * 2}" height="50" rx="22" fill="#242a37"/><circle cx="${x + 28}" cy="${h * .29 + 25}" r="6" fill="#f1454b"/><circle cx="${x + 49}" cy="${h * .29 + 25}" r="6" fill="#eab64f"/><circle cx="${x + 70}" cy="${h * .29 + 25}" r="6" fill="#57bd85"/>${row(x + 110, h * .29 + 19, 170, 12)}${Array.from({length: 4}, (_, i) => {const cx = x + 48 + i * ((w - x * 2 - 96) / 4);const cw = (w - x * 2 - 160) / 4;return `${card(cx, h * .42, cw, h * .36)}<rect x="${cx + 15}" y="${h * .42 + 15}" width="${cw - 30}" height="${h * .18}" rx="10" fill="${["#353c4d", "#2a4552", "#49324b", "#464139"][(i + id) % 4]}"/><circle cx="${cx + cw / 2}" cy="${h * .42 + h * .27}" r="${Math.min(cw, h) * .08}" fill="${color}" opacity=".88"/>${row(cx + 15, h * .42 + h * .36, cw * .48, 9)}${row(cx + 15, h * .42 + h * .36 + 18, cw * .72, 8, .5)}`}).join("")}`
    : analytics
      ? `${card(x, h * .31, w * .4, h * .5)}${card(w * .53, h * .31, w * .33, h * .23)}${card(w * .53, h * .58, w * .33, h * .23)}${row(x + 28, h * .31 + 30, 200, 13)}<path d="M${x + 28} ${h * .68} L${x + 140} ${h * .58} L${x + 250} ${h * .63} L${x + 370} ${h * .45} L${x + 480} ${h * .52}" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><path d="M${x + 28} ${h * .7} H${x + 500}" stroke="#667085" stroke-width="2" opacity=".5"/>${row(w * .56, h * .31 + 33, w * .17, 12)}${row(w * .56, h * .31 + 66, w * .23, 10, .6)}${row(w * .56, h * .58 + 33, w * .18, 12)}${row(w * .56, h * .58 + 66, w * .22, 10, .6)}`
      : `${card(x, h * .36, 230, h * .34)}${card(w * .67, h * .36, 230, h * .34)}${row(x + 30, h * .36 + 32, 120, 13)}${row(x + 30, h * .36 + 66, 160, 10, .6)}${row(w * .67 + 30, h * .36 + 32, 120, 13)}${row(w * .67 + 30, h * .36 + 66, 160, 10, .6)}<path d="M${x + 240} ${h * .53} H${w * .67 - 25}" stroke="${color}" stroke-width="6" stroke-linecap="round"/><path d="m${w * .67 - 43} ${h * .53 - 18} 18 18 -18 18" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`;
  const dots = Array.from({length: 30}, (_, i) => {
    const px = 90 + (i * 137 + id) % (w - 180);
    const py = 68 + (i * 71 + id) % (h - 136);
    return `<circle cx="${px}" cy="${py}" r="${i % 5 === 0 ? 3 : 1.5}" fill="#9ba4b6" opacity=".22"/>`;
  }).join("");
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#11141d"/><stop offset="1" stop-color="#282435"/></linearGradient><radialGradient id="glow"><stop stop-color="${color}" stop-opacity=".22"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient></defs><rect width="100%" height="100%" fill="url(#bg)"/><ellipse cx="${w * (0.3 + (id % 5) / 10)}" cy="${h * .54}" rx="${w * .4}" ry="${h * .55}" fill="url(#glow)"/>${dots}<g opacity=".96">${migration || data ? nodes : ""}${ui}</g><rect x="24" y="24" width="${w - 48}" height="${h - 48}" rx="30" fill="none" stroke="#ffffff" stroke-opacity=".06" stroke-width="2"/></svg>`);
}

const fileLists = await Promise.all(["src", "content"].map(sourceFiles));
const source = (await Promise.all(fileLists.flat().map((file) => readFile(file, "utf8")))).join("\n");
const assets = await client.fetch(`*[_type == "siteAsset"] | order(slot asc){_id,slot,title,alt,sourcePath,sourceUrl,sourceCreator,sourceLicense,licenseVerifiedAt,"ref":image.asset._ref,image{asset->{metadata{dimensions{width,height}}}}}`);
const active = assets.filter((item) => item.slot && (source.includes(item.slot) || source.includes(item.sourcePath || "\0") || (item.slot.startsWith("shopify-migration-") && source.includes("migration"))));
const inactiveExternal = assets.filter((item) => /^https?:\/\//i.test(item.sourcePath || "") && !active.some((activeItem) => activeItem._id === item._id));
const candidates = [...active, ...inactiveExternal];
const toUpdate = candidates.filter((item) => !item.slot.startsWith("kodrise-logo-") && !item.sourceLicense?.startsWith("Pexels License") && item.sourceLicense !== "Original Kodrise-created vector artwork");
if (process.argv.includes("--dry-run")) {
  console.log(JSON.stringify({activeSlots: active.length, inactiveExternalSlots: inactiveExternal.length, toUpdate: toUpdate.length, pexelsPhotos: toUpdate.filter((item) => pexels[item.slot]).map((item) => item.slot), originalIllustrations: toUpdate.filter((item) => !pexels[item.slot]).length}, null, 2));
  process.exit(0);
}
const pexelsBuffers = new Map();
for (const [slot, stock] of Object.entries(pexels)) {
  if (!toUpdate.some((item) => item.slot === slot)) continue;
  const response = await fetch(`https://images.pexels.com/photos/${stock.id}/pexels-photo-${stock.id}.jpeg`, {headers: {"User-Agent": "Kodrise image rights migration"}});
  if (!response.ok) throw new Error(`Could not fetch ${slot} from Pexels: HTTP ${response.status}`);
  const image = Buffer.from(await response.arrayBuffer());
  if (image.length < 10_000 || !response.headers.get("content-type")?.includes("image")) throw new Error(`Pexels returned an invalid image for ${slot}`);
  pexelsBuffers.set(slot, image);
}
let updated = 0;
let stocks = 0;
let artwork = 0;
for (const item of candidates) {
  if (item.slot.startsWith("kodrise-logo-") || item.sourceLicense?.startsWith("Pexels License") || item.sourceLicense === "Original Kodrise-created vector artwork") continue;
  const stock = pexels[item.slot];
  let bytes;
  let patch;
  if (stock) {
    bytes = pexelsBuffers.get(item.slot);
    patch = {title: item.title || item.slot, alt: stock.alt, sourceUrl: stock.page, sourceCreator: stock.creator, sourceLicense: "Pexels License (free commercial use; attribution optional)", licenseVerifiedAt: "2026-11-24"};
    stocks++;
  } else {
    const dims = item.image?.asset?.metadata?.dimensions || {};
    const png = await sharp(originalArtwork(item.slot, dims.width || 1440, dims.height || 960)).png().toBuffer();
    bytes = png;
    patch = {title: item.title || item.slot, alt: `${item.title || item.slot} — original Kodrise illustration`, sourceUrl: "", sourceCreator: "Kodrise", sourceLicense: "Original Kodrise-created vector artwork", licenseVerifiedAt: "2026-11-24"};
    artwork++;
  }
  if (/^https?:\/\//i.test(item.sourcePath || "")) patch.sourcePath = `/site-assets/licensed/${item.slot}.png`;
  if (bytes.length < 1_000 || bytes.length > 15_000_000) throw new Error(`Unexpected image size for ${item.slot}: ${bytes.length}`);
  const uploaded = await client.assets.upload("image", bytes, {filename: `${item.slot}.${stock ? "jpg" : "png"}`, contentType: stock ? "image/jpeg" : "image/png"});
  await client.patch(item._id).set({...patch, image: {_type: "image", asset: {_type: "reference", _ref: uploaded._id}}}).commit();
  updated++;
  console.log(`${updated}/${candidates.length}: ${item.slot}`);
}
const externalPaths = await client.fetch(`*[_type == "siteAsset" && sourcePath match "http*"]{_id,slot}`);
for (const item of externalPaths) await client.patch(item._id).set({sourcePath: `/site-assets/licensed/${item.slot}.png`}).commit();
console.log(JSON.stringify({activeSlots: active.length, inactiveExternalSlots: inactiveExternal.length, updated, pexelsPhotos: stocks, originalIllustrations: artwork, cleanedLegacySourcePaths: externalPaths.length}, null, 2));

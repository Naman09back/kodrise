import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {gunzipSync} from 'node:zlib';
import {createClient} from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5vojr174';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) throw new Error('SANITY_API_WRITE_TOKEN is required (load it from .env.local).');

const client = createClient({projectId, dataset, apiVersion: '2026-02-01', token, useCdn: false});
const root = process.cwd();
const manifest = JSON.parse((await readFile(path.join(root, 'reference/codiant-mirror-manifest.json'), 'utf8')).replace(/^\uFEFF/, ''));
const archiveRoot = path.resolve(root, 'reference/codiant-mirror');
const removedPaths = new Set(['/events', '/life-at-kodrise']);
const keyFor = (value) => String(value || '/').toLowerCase().replace(/\/$/, '') || '/';

const routes = manifest.filter((route) =>
  ['cached', 'downloaded'].includes(route.result) && !removedPaths.has(keyFor(route.KodrisePath)),
);
const duplicateCheck = new Set();
for (const route of routes) {
  const key = keyFor(route.KodrisePath);
  if (duplicateCheck.has(key)) throw new Error(`Duplicate route in manifest: ${route.KodrisePath}`);
  duplicateCheck.add(key);
}
if (routes.length !== 1162) throw new Error(`Expected 1,162 eligible page routes, found ${routes.length}; refusing to import.`);

const existing = await client.fetch('*[_type == "sitePage"]{_id,pageKey,path,title,sourceRouteId,"hasContent": defined(contentHtml)}');
const existingByPath = new Map();
for (const page of existing) {
  for (const candidate of [page.path, page.pageKey]) {
    if (candidate) existingByPath.set(keyFor(candidate), page);
  }
}
for (const page of existing) {
  if (!page.pageKey || page.pageKey.startsWith('/')) continue;
  existingByPath.set(page.pageKey === 'home' ? '/' : `/${page.pageKey}`, page);
}

const operations = [];
for (const route of routes) {
  const routePath = route.KodrisePath;
  const prior = existingByPath.get(keyFor(routePath));
  if (prior?.sourceRouteId === route.id && prior.hasContent) continue;
  const archiveFile = path.resolve(archiveRoot, route.file);
  if (!archiveFile.startsWith(`${archiveRoot}${path.sep}`)) throw new Error(`Archive path escapes source folder: ${route.file}`);
  const contentHtml = gunzipSync(await readFile(archiveFile)).toString('utf8');
  if (!/<html\b/i.test(contentHtml) || !/<title\b/i.test(contentHtml)) throw new Error(`Invalid archived HTML for ${routePath}`);
  const page = {
    title: route.title || routePath,
    pageKey: routePath,
    path: routePath,
    family: route.Family || 'Other',
    sourceRouteId: route.id,
    sourceUrl: route.SourceUrl,
    contentHtml,
    isPublished: true,
  };
  if (prior) {
    page.pageKey = prior.pageKey || routePath;
    page.title = prior.title || page.title;
    operations.push({kind: 'patch', id: prior._id, page});
  } else {
    operations.push({kind: 'create', page});
  }
}

let batch = [];
let batchBytes = 0;
let created = 0;
let patched = 0;
let committed = 0;
async function flush() {
  if (!batch.length) return;
  let transaction = client.transaction();
  for (const operation of batch) {
    if (operation.kind === 'patch') transaction = transaction.patch(operation.id, (patch) => patch.set(operation.page));
    else transaction = transaction.create({_type: 'sitePage', ...operation.page});
  }
  await transaction.commit({visibility: 'sync'});
  for (const operation of batch) operation.kind === 'patch' ? patched++ : created++;
  committed += batch.length;
  console.log(`Imported ${committed}/${operations.length} pages (${created} new, ${patched} preserved and updated)`);
  batch = [];
  batchBytes = 0;
}

for (const operation of operations) {
  const bytes = Buffer.byteLength(JSON.stringify(operation.page)) + 512;
  if (bytes > 3_500_000) throw new Error(`Page exceeds safe write size: ${operation.page.path}`);
  if (batch.length && (batchBytes + bytes > 2_500_000 || batch.length >= 20)) await flush();
  batch.push(operation);
  batchBytes += bytes;
}
await flush();

const count = await client.fetch('count(*[_type == "sitePage"])');
if (count !== 1162) throw new Error(`Import completed but Sanity now reports ${count} site pages instead of 1,162.`);
console.log(`Verified ${count} Sanity site pages. Created ${created}; updated ${patched} existing records.`);

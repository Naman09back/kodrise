import {readFile} from "node:fs/promises";
import path from "node:path";
import type {Metadata} from "next";

export type CodiantMirrorRoute = {
  Family: string;
  SourcePath: string;
  SourceUrl: string;
  Sitemap: string;
  KodrisePath: string;
  Baseline: string;
  Status: string;
  id: string;
  file: string;
  result: string;
  title?: string;
  bytes?: number;
};

let manifestPromise: Promise<CodiantMirrorRoute[]> | undefined;

function cleanPath(value: string) {
  const pathname = value.split(/[?#]/, 1)[0].toLowerCase().replace(/\/+$/, "");
  return pathname || "/";
}

async function readManifest() {
  const filename = path.join(process.cwd(), "reference", "codiant-mirror-manifest.json");
  const load = () => readFile(filename, "utf8").then((contents) => {
    const routes = JSON.parse(contents.replace(/^\uFEFF/, "")) as CodiantMirrorRoute[];
    return routes.filter((route) => route.result !== "failed" && /^[a-f0-9]{20}$/.test(route.id));
  });
  if (process.env.NODE_ENV !== "production") return load();
  if (!manifestPromise) manifestPromise = load();
  return manifestPromise;
}

export async function getCodiantMirrorByPath(pathname: string) {
  const key = cleanPath(pathname);
  if (key === "/life-at-kodrise" || key === "/events") return undefined;
  const routes = await readManifest();
  const candidates = [key];
  if (key.startsWith("/resources/blogs/")) candidates.push(`/resources/blogs/${key.slice("/resources/blogs/".length).replace(/kodrise/gi, "codiant")}`);
  if (key.startsWith("/life-at-kodrise/")) candidates.push(`/life-at-kodrise/${key.slice("/life-at-kodrise/".length).replace(/kodrise/gi, "codiant")}`);
  return routes.find((route) => candidates.includes(cleanPath(route.KodrisePath)));
}

export async function getCodiantMirrorById(id: string) {
  const routes = await readManifest();
  return routes.find((route) => route.id === id);
}

export async function getCodiantMirrorMetadata(pathname: string): Promise<Metadata | undefined> {
  const route = await getCodiantMirrorByPath(pathname);
  if (!route?.title) return undefined;
  return {title: {absolute: route.title}, alternates: {canonical: route.KodrisePath}};
}

export async function getCodiantSourceRouteMap() {
  const routes = await readManifest();
  return Object.fromEntries(routes.map((route) => [cleanPath(route.SourcePath), route.KodrisePath]));
}

export function getLocalRequestOrigin(request: Request) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost || request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() || new URL(request.url).protocol.replace(":", "");
  if (!host || !["http", "https"].includes(protocol)) return new URL(request.url).origin;

  try {
    const candidate = new URL(`${protocol}://${host}`);
    const hostname = candidate.hostname.toLowerCase();
    if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1" || hostname === "kodrise.com" || hostname.endsWith(".kodrise.com")) return candidate.origin;
  } catch {}
  return new URL(request.url).origin;
}

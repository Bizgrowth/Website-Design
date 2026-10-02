// Small helpers shared by the form API routes.

export const EMAIL = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;

export const clip = (v: unknown, n: number) => (typeof v === "string" ? v.trim().slice(0, n) : "");

export const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

// Light abuse guard. Serverless instances do not share memory, so this slows casual abuse only.
const hits = new Map<string, number[]>();
export function rateLimited(key: string, max: number, windowMs = 10 * 60_000) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > max;
}

export const clientIp = (req: Request) => req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

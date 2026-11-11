#!/usr/bin/env node
/**
 * Emit a production sitemap from a built dist/ tree (directory routes).
 * Usage: node scripts/generate-sitemap.mjs [distDir] [siteOrigin]
 */
import { readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const distDir = path.resolve(process.argv[2] ?? "dist");
const site = (process.argv[3] ?? "https://hmi.iiitd.edu.in").replace(/\/$/, "");

function walk(dir, base = "") {
  const urls = [];
  for (const name of readdirSync(dir)) {
    if (name.startsWith(".") || name === "brand" || name === "js") continue;
    const full = path.join(dir, name);
    const rel = path.posix.join(base, name);
    if (statSync(full).isDirectory()) {
      urls.push(...walk(full, rel));
    } else if (name === "index.html") {
      const route = base === "" ? "/" : `/${base}/`;
      urls.push(route);
    }
  }
  return urls;
}

const urls = [...new Set(walk(distDir))].sort();
const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (loc) => `  <url>
    <loc>${site}${loc === "/" ? "/" : loc}</loc>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
writeFileSync(path.join(distDir, "sitemap.xml"), body);
console.log(`Wrote ${urls.length} URLs to ${path.join(distDir, "sitemap.xml")}`);

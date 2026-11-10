#!/usr/bin/env node
import { writeFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const distDir = path.resolve(process.argv[2] ?? "dist");
const site = (process.argv[3] ?? "https://hmi.iiitd.edu.in").replace(/\/$/, "");

spawnSync(process.execPath, [path.resolve("scripts/generate-sitemap.mjs"), distDir, site], {
  stdio: "inherit",
});

writeFileSync(
  path.join(distDir, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`,
);
console.log(`Wrote robots.txt for ${site}`);

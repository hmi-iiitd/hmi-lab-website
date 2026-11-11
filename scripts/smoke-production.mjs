#!/usr/bin/env node
/**
 * Production-shaped smoke checks against a running preview (default :4321 root).
 * Usage: SMOKE_BASE_URL=http://127.0.0.1:4321/ node scripts/smoke-production.mjs
 */
const base = (process.env.SMOKE_BASE_URL ?? "http://127.0.0.1:4321/").replace(/\/?$/, "/");

const paths = [
  "",
  "research/",
  "research/perception-understanding/",
  "research/learning-coordination/",
  "research/interaction-adaptation/",
  "people/",
  "about/",
  "publications/",
  "papers/epistemic-social-learning/",
  "papers/express-ear/",
  "brand/favicon.ico",
  "sitemap.xml",
  "robots.txt",
];

const legacy = [
  "publication.html",
  "team.html",
  "project.html",
  "ExpressEar.html",
];

let failures = 0;

async function check(url, { expectRedirectTo } = {}) {
  const res = await fetch(url, { redirect: "manual" });
  if (expectRedirectTo) {
    const loc = res.headers.get("location") ?? "";
    const ok =
      (res.status === 301 || res.status === 302 || res.status === 308) &&
      loc.includes(expectRedirectTo);
    if (!ok) {
      console.error(`FAIL redirect ${url} → status ${res.status} loc=${loc}`);
      failures += 1;
      return;
    }
    console.log(`OK  redirect ${url} → ${loc}`);
    return;
  }
  if (!res.ok) {
    console.error(`FAIL ${url} → ${res.status}`);
    failures += 1;
    return;
  }
  const ct = res.headers.get("content-type") ?? "";
  if (url.endsWith(".html") || url.endsWith("/") || url === base) {
    const html = await res.text();
    if (/noindex/i.test(html)) {
      console.error(`FAIL ${url} contains noindex`);
      failures += 1;
      return;
    }
    if (/development placeholder|not production|coming soon/i.test(html)) {
      console.error(`FAIL ${url} contains development placeholder copy`);
      failures += 1;
      return;
    }
    if (/hmi-lab-website\//i.test(html) && !/github\.io/.test(html)) {
      // Soft check: production HTML should not emit staging base paths.
      if (html.includes('href="/hmi-lab-website/') || html.includes("href='/hmi-lab-website/")) {
        console.error(`FAIL ${url} still points at staging base path`);
        failures += 1;
        return;
      }
    }
    if (!/canonical/i.test(html) && ct.includes("html")) {
      console.error(`FAIL ${url} missing canonical`);
      failures += 1;
      return;
    }
  }
  console.log(`OK  ${url} (${res.status})`);
}

for (const p of paths) {
  await check(new URL(p, base).href);
}

// Local Astro preview does not apply Apache .htaccess; redirect checks are host-dependent.
if (process.env.SMOKE_CHECK_REDIRECTS === "1") {
  for (const p of legacy) {
    const target =
      p === "publication.html"
        ? "/publications/"
        : p === "team.html"
          ? "/people/"
          : p === "project.html"
            ? "/research/"
            : "/papers/";
    await check(new URL(p, base).href, { expectRedirectTo: target });
  }
} else {
  console.log("SKIP Apache redirect checks (set SMOKE_CHECK_REDIRECTS=1 on host)");
}

if (failures > 0) {
  console.error(`\n${failures} smoke check(s) failed`);
  process.exit(1);
}
console.log("\nAll smoke checks passed");

import { defineConfig } from "astro/config";

const site = process.env.PUBLIC_SITE_URL ?? "https://hmi-iiitd.github.io";
const baseEnv = process.env.PUBLIC_BASE_PATH ?? "/hmi-lab-website/";
const base = baseEnv.endsWith("/") ? baseEnv : `${baseEnv}/`;

export default defineConfig({
  site,
  base,
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  vite: {
    define: {
      "import.meta.env.PUBLIC_SITE_URL": JSON.stringify(site),
      "import.meta.env.PUBLIC_BASE_PATH": JSON.stringify(base),
    },
  },
});

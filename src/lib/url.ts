/**
 * Base-path-safe URL helpers. Never hardcode the staging host in content.
 * Staging uses PUBLIC_BASE_PATH=/hmi-lab-website/; production uses /.
 */

export function normalizeBase(base: string | undefined | null): string {
  if (!base || base === "/") return "/";
  const withLeading = base.startsWith("/") ? base : `/${base}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

export function getBasePath(
  env: { BASE_URL?: string; PUBLIC_BASE_PATH?: string } = typeof import.meta !== "undefined"
    ? ((import.meta as ImportMeta & { env?: { BASE_URL?: string; PUBLIC_BASE_PATH?: string } })
        .env ?? {})
    : {},
): string {
  return normalizeBase(env.BASE_URL ?? env.PUBLIC_BASE_PATH ?? "/");
}

/** Join site base with an absolute-from-root path like `/papers/foo/`. */
export function withBase(pathname: string, base = getBasePath()): string {
  const normalizedBase = normalizeBase(base);
  const path = pathname.startsWith("/") ? pathname.slice(1) : pathname;
  if (normalizedBase === "/") {
    return `/${path}`.replace(/\/{2,}/g, "/");
  }
  return `${normalizedBase}${path}`.replace(/\/{2,}/g, "/");
}

export function paperPath(slug: string, base = getBasePath()): string {
  return withBase(`papers/${slug}/`, base);
}

export function isStagingBase(base = getBasePath()): boolean {
  return normalizeBase(base) === "/hmi-lab-website/";
}

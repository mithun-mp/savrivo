// SAVRIVO Base Path Utility
// Handles repository subpath (e.g. /savrivo on GitHub Pages) and root domains seamlessly.

const rawBase = import.meta.env.BASE_URL || '/';
export const BASE_PATH = rawBase.endsWith('/') ? rawBase.slice(0, -1) : rawBase;

export function url(p = ''): string {
  if (!p || p === '/') return BASE_PATH || '/';
  const clean = p.startsWith('/') ? p : `/${p}`;
  return `${BASE_PATH}${clean}`;
}

process.env.ASTRO_TELEMETRY_DISABLED = '1';

import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';

// Safe fallback for Windows sandboxes where native realpath fails with EPERM
if (process.platform === 'win32') {
  fs.realpathSync.native = fs.realpathSync;
  if (fs.realpath) {
    fs.realpath.native = fs.realpath;
  }
  if (fs.promises && fs.promises.realpath) {
    const origRealpath = fs.promises.realpath;
    fs.promises.realpath = async function (path, options) {
      try {
        return await origRealpath.call(fs.promises, path, options);
      } catch {
        return fs.realpathSync(path, options);
      }
    };
  }
}

function getBase() {
  if (process.env.ASTRO_BASE) return process.env.ASTRO_BASE;
  if (process.env.GITHUB_REPOSITORY) {
    const repo = process.env.GITHUB_REPOSITORY.split('/')[1];
    if (repo) return `/${repo}`;
  }
  const cwd = process.cwd().replace(/\\/g, '/');
  if (cwd.includes('savrivoapp')) return '/savrivoapp';
  return '/savrivo';
}

const base = getBase();

export default defineConfig({
  site: 'https://mithun-mp.github.io',
  base,
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
  output: 'static',
  build: {
    format: 'directory',
  },
});

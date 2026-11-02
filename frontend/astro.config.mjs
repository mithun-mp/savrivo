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

const base = process.env.ASTRO_BASE || (process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}` : '/savrivo');

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

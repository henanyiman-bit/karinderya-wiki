// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://karinderya.ymmyi.wiki',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});

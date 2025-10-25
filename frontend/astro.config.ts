// @ts-check

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
  site: 'https://www.kevinagyeman.com',
  integrations: [react(), sitemap()],
});

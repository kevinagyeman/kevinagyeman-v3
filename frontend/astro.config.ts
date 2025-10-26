// @ts-check

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },  
  }),
  site: 'https://www.kevinagyeman.com',
  integrations: [react(), sitemap()],
});

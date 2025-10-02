// @ts-check

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
  adapter: vercel(),
  integrations: [react()],
});

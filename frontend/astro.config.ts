// @ts-check

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import path from 'path';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        // your aliases should mirror the ones defined in your tsconfig.json
        // i'll re-use the ones in the official docs:
        '@components': path.resolve(path.dirname(''), './src/components'),
        '@assets': path.resolve(path.dirname(''), './src/assets'),
      },
    },
  },
  output: 'server',
  adapter: vercel(),
  integrations: [react()],
});

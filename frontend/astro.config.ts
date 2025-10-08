// @ts-check

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    // server: {
    //   proxy: {
    //     '/api': {
    //       target: import.meta.env.PUBLIC_BACKEND_URL,
    //       changeOrigin: true,
    //       secure: false,
    //     },
    //   },
    // },
  },
  output: 'server',
  adapter: vercel(),
  integrations: [react()],
});

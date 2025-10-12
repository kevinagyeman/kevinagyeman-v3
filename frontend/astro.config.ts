// @ts-check

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},
	output: "server",
	adapter: vercel(),
	site: "https://www.kevinagyeman.com",
	integrations: [react(), sitemap()],
});

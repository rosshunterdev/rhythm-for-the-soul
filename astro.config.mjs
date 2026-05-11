// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Replace with live domain once deployed to Netlify
  site: 'https://www.rhythmforthesoul.co.nz',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});

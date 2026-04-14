// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// Tailwind v4 vía postcss.config.mjs (@tailwindcss/postcss)
export default defineConfig({
  // URL pública: canónicas, Open Graph y sitemap. Actualízala en producción.
  site: 'https://monkeymind.co',

  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-CO' },
      },
    }),
  ],
});

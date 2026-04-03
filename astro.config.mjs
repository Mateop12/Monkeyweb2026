// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
// Tailwind v4 vía postcss.config.mjs (@tailwindcss/postcss), no @tailwindcss/vite,
// para evitar TypeError "Cannot read properties of undefined (reading 'call')" en Vite 7 + Astro.
export default defineConfig({
  // URL pública del sitio (canonical, Open Graph). Cámbiala por tu dominio en producción.
  site: 'https://monkeymind.co',

  integrations: [react()],
});
// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Configuração principal do Astro.
// "site" é o endereço final do site (usado no sitemap, RSS e links canônicos).
export default defineConfig({
  site: 'https://proestruturas3d.com.br',
  // Gera páginas como /blog/index.html (URLs limpas, ideais para o GitHub Pages)
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [sitemap({ filter: (page) => !page.includes('/minha-conta') })],
});

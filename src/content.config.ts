/**
 * Definição das "coleções de conteúdo" lidas a partir de arquivos Markdown (.md).
 *  - blog:      src/content/blog/*.md       -> artigos e notícias
 *  - portfolio: src/content/portfolio/*.md  -> projetos do portfólio
 *
 * Para publicar um novo artigo, basta criar um novo arquivo .md em
 * src/content/blog/ com o cabeçalho (frontmatter) no mesmo formato dos exemplos.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.enum(['Engenharia', 'Cálculo Estrutural', 'Softwares', 'Notícias']),
    tags: z.array(z.string()).default([]),
    author: z.string().default('Eng. José Barbalho'),
    draft: z.boolean().default(false),
  }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/portfolio' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.string(),
    disciplines: z.array(z.string()),
    highlights: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    location: z.string().optional(),
    year: z.number().optional(),
    order: z.number().default(99),
  }),
});

export const collections = { blog, portfolio };

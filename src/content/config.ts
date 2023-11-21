import { defineCollection, z } from "astro:content";

const memo = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    license: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { memo };

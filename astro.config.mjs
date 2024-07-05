import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import pagefind from "astro-pagefind";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

import rehypeImg2pic from "astro-rehype-img2pic";

// https://astro.build/config
export default defineConfig({
  site: "https://nonsensememo.pages.dev",
  integrations: [mdx(), sitemap(), react(), tailwind(), pagefind(), icon(), rehypeImg2pic()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex]
  }
});
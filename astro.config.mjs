import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  site: "https://Nakanishi123.github.io",
  base: "/NonsenseMemo",
  integrations: [mdx(), sitemap(), react(), tailwind(), pagefind()],
});

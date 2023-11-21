import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_DESCRIPTION, SITE_TITLE, URL_BASE } from "../consts";

export async function GET(context) {
  const posts = await getCollection("memo");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map(post => ({
      ...post.data,
      link: `${URL_BASE}/memo/${post.slug}/`,
    })),
  });
}

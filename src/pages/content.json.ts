import { getCollection } from "astro:content";
import { URL_BASE } from "../consts";

export interface Content {
  title: string;
  link: string;
  pubDate: Date;
  content: string;
}

export async function GET() {
  const posts = await getCollection("memo");
  const postDetails: Content[] = posts.map(post => {
    return {
      title: post.data.title,
      link: `${URL_BASE}/memo/${post.slug}`,
      pubDate: post.data.pubDate,
      content: post.body,
    };
  });
  return new Response(JSON.stringify(postDetails));
}

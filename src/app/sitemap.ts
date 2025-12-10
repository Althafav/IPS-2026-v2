// app/sitemap.ts
import Globals, { EXHIBITORS_2025_URL, SITE_URL } from "@/modules/Globals";
import { slugify } from "@/modules/lib";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogsRes = await Globals.KontentClient.item("blog_page_2026")
    .withParameter("depth", "2")
    .toPromise();

  const blogsData = JSON.parse(JSON.stringify(blogsRes.item));

  const blogs = blogsData.blogitems?.value ?? [];

  const blogsUrls = blogs.map((item: any) => ({
    url: `${SITE_URL}blogs/${item.slug.value}`,
    lastModified: new Date(item.system.last_modified || Date.now()),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const newsRes = await Globals.KontentClient.item("news_page_2026")
    .withParameter("depth", "2")
    .toPromise();

  const newsData = JSON.parse(JSON.stringify(newsRes.item));

  const news = newsData.blogitems?.value ?? [];

  const newsUrls = news.map((item: any) => ({
    url: `${SITE_URL}news/${item.slug.value}`,
    lastModified: new Date(item.system.last_modified || Date.now()),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const exhibitorsRes = await fetch(EXHIBITORS_2025_URL, {
    next: { revalidate: 3600 },
  });

  let exhibitorsUrls: MetadataRoute.Sitemap = [];

  if (exhibitorsRes.ok) {
    const exhibitors = await exhibitorsRes.json();

    exhibitorsUrls = exhibitors
      .filter((e: any) => e?.company_name)
      .map((e: any) => ({
        url: `${SITE_URL}exhibitors-2025/${slugify(e.company_name)}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
      }));
  }

  const staticPages = [
    { path: `${SITE_URL}`, priority: 1, changeFrequency: "weekly" },
    { path: `${SITE_URL}about`, priority: 1, changeFrequency: "weekly" },
    {
      path: `${SITE_URL}book-your-stand`,
      priority: 1,
      changeFrequency: "weekly",
    },
    {
      path: `${SITE_URL}agenda`,
      priority: 1,
      changeFrequency: "weekly",
    },
    {
      path: `${SITE_URL}speakers`,
      priority: 1,
      changeFrequency: "weekly",
    },

    {
      path: `${SITE_URL}awards`,
      priority: 1,
      changeFrequency: "weekly",
    },

    {
      path: `${SITE_URL}register-interest`,
      priority: 1,
      changeFrequency: "weekly",
    },
    {
      path: `${SITE_URL}contact-us`,
      priority: 1,
      changeFrequency: "weekly",
    },

    {
      path: `${SITE_URL}event-information`,
      priority: 1,
      changeFrequency: "weekly",
    },

    {
      path: `${SITE_URL}ips-women`,
      priority: 1,
      changeFrequency: "weekly",
    },
    {
      path: `${SITE_URL}ips-proptech-hub`,
      priority: 1,
      changeFrequency: "weekly",
    },
    {
      path: `${SITE_URL}participating-sectors`,
      priority: 1,
      changeFrequency: "weekly",
    },

    {
      path: `${SITE_URL}why-exhibit`,
      priority: 1,
      changeFrequency: "weekly",
    },

    {
      path: `${SITE_URL}stand-builder`,
      priority: 1,
      changeFrequency: "weekly",
    },

    {
      path: `${SITE_URL}exclusive-travel-agent`,
      priority: 1,
      changeFrequency: "weekly",
    },
    {
      path: `${SITE_URL}gallery/photos`,
      priority: 1,
      changeFrequency: "weekly",
    },
  ].map((p) => ({
    url: `${p.path}`,
    lastModified: new Date(),
    changeFrequency:
      p.changeFrequency as MetadataRoute.Sitemap[0]["changeFrequency"],
    priority: p.priority,
  }));

  return [...staticPages, ...blogsUrls, ...newsUrls, ...exhibitorsUrls];
}

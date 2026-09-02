import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { members } from "@/lib/members";
import { publishedInsights } from "@/lib/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: site.url, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/services`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/members`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/portfolio`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/insights`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/contact`, lastModified, changeFrequency: "yearly", priority: 0.8 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const memberPages: MetadataRoute.Sitemap = members.map((m) => ({
    url: `${site.url}/members/${m.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const insightPages: MetadataRoute.Sitemap = publishedInsights.map((i) => ({
    url: `${site.url}/insights/${i.slug}`,
    lastModified: new Date(i.updated ?? i.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages, ...memberPages, ...insightPages];
}

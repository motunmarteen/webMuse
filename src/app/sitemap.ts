import type { MetadataRoute } from "next";

const BASE_URL = "https://www.webmuse.tech";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/privacy", "/terms", "/status", "/insights"];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.5,
  }));
}

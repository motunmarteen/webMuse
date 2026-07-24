import type { MetadataRoute } from "next";

const BASE_URL = "https://www.webmuse.tech";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/privacy", "/terms", "/status", "/insights", "/case-study", "/case-study/neyborhuud", "/case-study/sentinel-ai", "/case-study/novunt", "/case-study/career-assessment", "/career-path", "/partners"];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.5,
  }));
}

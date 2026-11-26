import type { MetadataRoute } from "next";
const base = "https://utilora.vercel.app";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/contact", "/privacy", "/terms", "/disclaimer"];
  return paths.map((path) => ({ url: base + path, lastModified: new Date(), changeFrequency: path ? "monthly" : "weekly", priority: path ? 0.5 : 1 }));
}

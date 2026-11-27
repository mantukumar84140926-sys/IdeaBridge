import type { MetadataRoute } from "next";

const base = "https://utilora-ten.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/disclaimer",
  ];

  return paths.map((path) => ({
    url: base + path,
    changeFrequency: path ? "monthly" : "weekly",
    priority: path ? 0.5 : 1,
  }));
}

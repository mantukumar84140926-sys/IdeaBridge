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

  const toolSlugs = ["word-counter","case-converter","remove-line-breaks","json-formatter","base64-encoder","url-encoder","percentage-calculator","bmi-calculator","password-generator","text-reverser","remove-duplicate-lines","sort-lines","url-slug-generator","html-entity-encoder","binary-text-converter","hex-text-converter","average-calculator","discount-calculator","tip-calculator","loan-payment-calculator","random-number-generator","age-calculator","date-difference-calculator"];
  const allPaths = [...paths, ...toolSlugs.map((slug) => "/tools/" + slug)];
  return allPaths.map((path) => ({
    url: base + path,
    changeFrequency: path ? "monthly" : "weekly",
    priority: path ? 0.5 : 1,
  }));
}

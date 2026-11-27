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

  const toolSlugs = ["word-counter","case-converter","remove-line-breaks","json-formatter","base64-encoder","url-encoder","percentage-calculator","bmi-calculator","password-generator","text-reverser","remove-duplicate-lines","sort-lines","url-slug-generator","html-entity-encoder","binary-text-converter","hex-text-converter","average-calculator","discount-calculator","tip-calculator","loan-payment-calculator","random-number-generator","age-calculator","date-difference-calculator","line-counter","word-frequency-counter","whitespace-cleaner","json-minifier","html-entity-decoder","xml-validator","simple-interest-calculator","compound-interest-calculator","sales-tax-calculator","uuid-generator","sentence-counter","paragraph-counter","duplicate-word-remover","character-frequency-counter","rgb-to-hex-converter","hex-to-rgb-converter","temperature-converter","unix-timestamp-converter","time-duration-calculator","percentage-change-calculator","ratio-simplifier","color-contrast-checker","random-list-picker","date-add-or-subtract-calculator","weekday-finder","days-in-month-calculator","number-base-converter","gcd-and-lcm-calculator","prime-number-checker","factorial-calculator","roman-numeral-converter","csv-to-json-converter","json-to-csv-converter","url-query-parser","regex-tester"];
  const allPaths = [...paths, ...toolSlugs.map((slug) => "/tools/" + slug)];
  return allPaths.map((path) => ({
    url: base + path,
    changeFrequency: path ? "monthly" : "weekly",
    priority: path ? 0.5 : 1,
  }));
}

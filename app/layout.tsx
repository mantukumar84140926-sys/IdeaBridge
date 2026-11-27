import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://utilora-ten.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Utilora — Free Online Tools That Just Work",
    template: "%s | Utilora",
  },
  description:
    "Free, easy-to-use online tools for text, developers, calculations and everyday tasks. Fast browser-based utilities with no sign-up required.",
  applicationName: "Utilora",
  keywords: [
    "free online tools",
    "text tools",
    "word counter",
    "JSON formatter",
    "Base64 encoder",
    "URL encoder",
    "percentage calculator",
    "password generator",
    "online utilities",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Utilora",
    title: "Utilora — Free Online Tools",
    description: "Simple, useful online tools. Free for everyone.",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Utilora — Free Online Tools",
    description: "Simple, useful online tools. Free for everyone.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

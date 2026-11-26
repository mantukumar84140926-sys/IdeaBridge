import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Utilora — Free Online Tools That Just Work",
  description: "A growing collection of fast, private and free online tools for text, developers, calculators and everyday tasks. No sign-up required.",
  metadataBase: new URL("https://utilora.vercel.app"),
  openGraph: { title: "Utilora — Free Online Tools", description: "Simple, useful tools. Free for everyone.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

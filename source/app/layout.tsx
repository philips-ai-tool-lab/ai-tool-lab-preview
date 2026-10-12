import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const siteOrigin = siteUrl ? new URL(siteUrl).origin : undefined;

export const metadata: Metadata = {
  metadataBase: siteOrigin ? new URL(siteOrigin) : undefined,
  title: "Philips AI Tool Lab",
  description: "Microsoft 365 Copilot 与 Enterprise ChatGPT 中文分步实战培训。",
  icons: { icon: `${basePath}/favicon.svg` },
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  openGraph: {
    title: "Philips AI Tool Lab",
    description: "从 Microsoft 365 Copilot 到 Enterprise ChatGPT，把 AI 工具变成可重复的工作方法。",
    images: [{ url: `${basePath}/og.png`, width: 1200, height: 630, alt: "Philips AI Tool Lab" }],
  },
  twitter: { card: "summary_large_image", images: [`${basePath}/og.png`] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

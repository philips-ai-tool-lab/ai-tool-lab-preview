import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.GITHUB_PAGES === "true";
const basePath = isGitHubPagesBuild
  ? process.env.NEXT_PUBLIC_BASE_PATH ?? "/philips-agent-builder-lab"
  : "";

const nextConfig: NextConfig = isGitHubPagesBuild
  ? {
      output: "export",
      trailingSlash: true,
      basePath,
      images: { unoptimized: true },
      typescript: { tsconfigPath: "./tsconfig.pages.json" },
    }
  : {};

export default nextConfig;

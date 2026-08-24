import type { NextConfig } from "next";

const basePath = process.env.GITHUB_ACTIONS ? "/reiwa-business-idea-zukan" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
};

export default nextConfig;

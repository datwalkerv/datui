import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  // datui resolves to its TypeScript source through tsconfig paths.
  transpilePackages: ["datui"],
};

export default config;

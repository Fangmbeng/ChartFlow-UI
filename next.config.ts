import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    GEMINI_API_SECRET: process.env.GEMINI_API_SECRET,
  },
};

export default nextConfig;

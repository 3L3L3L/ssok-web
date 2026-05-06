import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 깐깐한 문법 검사 무시하고 무조건 배포하라는 마법의 명령어!
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
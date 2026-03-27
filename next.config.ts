import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Fix workspace root detection for file tracing
  outputFileTracingRoot: path.join(__dirname, "./"),

  // External packages that should not be bundled
  serverExternalPackages: ["@prisma/client", "@neondatabase/serverless"],
};

export default nextConfig;

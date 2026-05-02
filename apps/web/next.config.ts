import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https" as const,
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https" as const,
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https" as const,
        hostname: "lvwyuvfeajstmeiuklfu.supabase.co",
      },
    ],
  },
};

export default withNextIntl(nextConfig);

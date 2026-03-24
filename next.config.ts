import type { NextConfig } from "next";

const supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BASE
    ? new URL(process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BASE).hostname
    : null;

const nextConfig: NextConfig = {
    /* config options here */
    reactStrictMode: true,
    images: {
        loader: "custom",
        loaderFile: "./imageKitLoader.ts",
        qualities: [75, 80],
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
            },
            ...(supabaseHostname
                ? [
                      {
                          protocol: "https" as const,
                          hostname: supabaseHostname,
                      },
                  ]
                : []),
            {
                protocol: "https",
                hostname: "ik.imagekit.io",
                pathname: "/27af9kigq/**",
            },
        ],
    },
};

export default nextConfig;

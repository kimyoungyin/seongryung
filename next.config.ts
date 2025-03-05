import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
            },
            {
                protocol: "https",
                hostname: (process.env.NEXT_PUBLIC_S3_HOSTNAME as string).split(
                    "/"
                )[2],
            },
        ],
    },
};

export default nextConfig;

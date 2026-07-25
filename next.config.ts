import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Configured for static HTML export to deploy on GitHub Pages
const nextConfig: NextConfig = {
    output: "export",
    images: {
        unoptimized: true,
    },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);

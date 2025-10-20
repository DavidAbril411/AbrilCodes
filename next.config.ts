import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Removed `output: 'export'` so API routes (like /api/contact) can work in production.
// If you need a fully static export again, you'll have to remove the email API route or move
// email sending to an external service (Formspree, Resend via webhook, etc.).
const nextConfig: NextConfig = {
  images: {
    // You can re-enable optimization defaults now if you want; keeping unoptimized true avoids layout shifts for SVG.
    unoptimized: true,
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);

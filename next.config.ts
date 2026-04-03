import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const securityHeaders = [
    // Prevent MIME type sniffing
    { key: "X-Content-Type-Options", value: "nosniff" },
    // Deny framing to prevent clickjacking
    { key: "X-Frame-Options", value: "DENY" },
    // Enable browser XSS filter
    { key: "X-XSS-Protection", value: "1; mode=block" },
    // Control referrer information
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    // Restrict browser feature access
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    // Content Security Policy — restrict resource origins
    {
        key: "Content-Security-Policy",
        value: [
            "default-src 'self'",
            // Next.js requires unsafe-eval for dev HMR; keep it for now but restrict origins
            "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: blob:",
            "font-src 'self' data:",
            // Allow fetching to MailerSend API from client (not needed server-side, but safe to allow)
            "connect-src 'self'",
            // Prevent this site from being embedded elsewhere
            "frame-ancestors 'none'",
        ].join("; "),
    },
];

// Removed `output: 'export'` so API routes (like /api/contact) can work in production.
// If you need a fully static export again, you'll have to remove the email API route or move
// email sending to an external service (Formspree, Resend via webhook, etc.).
const nextConfig: NextConfig = {
    images: {
        // You can re-enable optimization defaults now if you want; keeping unoptimized true avoids layout shifts for SVG.
        unoptimized: true,
    },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: securityHeaders,
            },
        ];
    },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);

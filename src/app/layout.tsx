import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "David Abril Perrig - Portfolio",
  description: "Personal portfolio of David Abril Perrig - Fullstack Developer",
};

export interface LayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let locale: (typeof routing.locales)[number] = routing.defaultLocale;

  try {
    const detectedLocale = await getLocale();
    if (routing.locales.includes(detectedLocale as (typeof routing.locales)[number])) {
      locale = detectedLocale as (typeof routing.locales)[number];
    }
  } catch {
    // If locale isn't available (e.g., unmatched route), fall back to default
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

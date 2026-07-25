import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import { getLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const displayFace = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display-face",
});

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
    if (
      routing.locales.includes(
        detectedLocale as (typeof routing.locales)[number]
      )
    ) {
      locale = detectedLocale as (typeof routing.locales)[number];
    }
  } catch {
    // If locale isn't available (e.g., unmatched route), fall back to default
  }

  return (
    <html lang={locale} className={`${inter.variable} ${displayFace.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}

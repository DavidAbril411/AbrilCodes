import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import { getLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const displayFace = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display-face",
});

// The root URL is a redirect stub, but it is the link people actually share.
// Without these tags a shared `abrilcodes.com` renders no preview card at all.
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({
    locale: routing.defaultLocale,
    namespace: "Meta",
  });

  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: "/",
      languages: {
        en: "/en",
        es: "/es",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      url: "/",
      siteName: "AbrilCodes",
      title: t("title"),
      description: t("description"),
      locale: "en_US",
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og.png"],
    },
  };
}

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

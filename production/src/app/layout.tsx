import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

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
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap"
        />
        <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}

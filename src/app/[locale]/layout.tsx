import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { AUTHOR, SITE_URL, SOCIAL } from "@/lib/site";

type Locale = (typeof routing.locales)[number];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// The studio is one engineer, so the Person and the ProfessionalService are the
// same operation seen from two angles: they reference each other by @id instead
// of describing a company with staff.
const PERSON_ID = `${SITE_URL}/#person`;
const STUDIO_ID = `${SITE_URL}/#studio`;

const AREA_SERVED: Record<Locale, string[]> = {
  en: ["Argentina", "United States", "Europe"],
  es: ["Argentina", "Estados Unidos", "Europa"],
};

function buildStructuredData(locale: Locale, description: string) {
  const url = `${SITE_URL}/${locale}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: AUTHOR.fullName,
        jobTitle: AUTHOR.jobTitle[locale],
        url,
        email: `mailto:${AUTHOR.email}`,
        sameAs: [SOCIAL.linkedin, SOCIAL.github],
        worksFor: { "@id": STUDIO_ID },
      },
      {
        "@type": "ProfessionalService",
        "@id": STUDIO_ID,
        name: "Abril Codes",
        url,
        description,
        areaServed: AREA_SERVED[locale],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Córdoba",
          addressCountry: "AR",
        },
        founder: { "@id": PERSON_ID },
      },
    ],
  };
}

// JSON.stringify leaves "<" untouched, so a translation containing "</script>"
// would close the tag early. The \u003c escape parses back to "<" inside a
// JSON string, so crawlers still read the same graph.
function serializeStructuredData(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        es: "/es",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      url: `/${locale}`,
      siteName: "AbrilCodes",
      title: t("title"),
      description: t("description"),
      locale: locale === "es" ? "es_AR" : "en_US",
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

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const isValidLocale = routing.locales.includes(locale as Locale);

  if (!isValidLocale) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages({ locale });
  const t = await getTranslations({ locale, namespace: "Meta" });
  const structuredData = buildStructuredData(locale as Locale, t("description"));

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(structuredData) }}
      />
      {children}
    </NextIntlClientProvider>
  );
}

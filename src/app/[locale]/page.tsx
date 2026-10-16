import { setRequestLocale } from "next-intl/server";
import AbrilSite from "@/components/v2/AbrilSite";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AbrilSite locale={locale} />;
}

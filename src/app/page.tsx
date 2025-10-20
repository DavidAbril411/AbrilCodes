import { redirect, routing } from "@/i18n/routing";

export default function RootPage() {
  redirect({ locale: routing.defaultLocale, href: { pathname: "/" } });
}

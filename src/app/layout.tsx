import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {getLocale} from "next-intl/server";
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
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

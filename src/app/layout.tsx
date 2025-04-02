import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "David Abril Perrig - Portfolio",
  description: "Personal portfolio of David Abril Perrig - Fullstack Developer",
};

export interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">   
      <body className={inter.className}>{children}</body>
    </html>
  );
}

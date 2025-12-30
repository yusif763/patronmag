import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "PatronMag - Firearms News & Information",
    template: "%s | PatronMag",
  },
  description: "Your trusted source for firearms news, reviews, and information. Covering pistols, rifles, shotguns, ammunition, reloading, optics, and more.",
  keywords: ["firearms", "guns", "pistol", "rifle", "shotgun", "ammunition", "reloading", "optics", "news"],
  authors: [{ name: "PatronMag" }],
  creator: "PatronMag",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "PatronMag",
    title: "PatronMag - Firearms News & Information",
    description: "Your trusted source for firearms news, reviews, and information.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PatronMag - Firearms News & Information",
    description: "Your trusted source for firearms news, reviews, and information.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

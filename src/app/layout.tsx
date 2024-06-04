import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import NavbarWrapper from "../components/navbar/NavbarHomes";
import { ViewTransitions } from "next-view-transitions";
import SessionWrapper from "@/components/SessionWrapper";
import {} from "flowbite";
import { ThemeModeScript } from "flowbite-react";
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import ContextAppProvider from "@/components/ContextApp";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Asep Haryana Saputra",
  description:
    "Website pribadi milik Asep Haryana Saputra,ini adalah halaman utama pada website ini",
  openGraph: {
    title: "Website pribadi milik Asep Haryana Saputra",
    description:
      "Website pribadi milik Asep Haryana Saputra,ini adalah halaman utama pada website ini",
    images: [
      {
        url: "https://i.imgur.com/DLHzyeA.png", // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: "https://i.imgur.com/DLHzyeA.png", // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    type: "article",
    url: "https://asepharyana.my.id/",
    siteName: "Website pribadi milik Asep Haryana Saputra",
    locale: "id_ID",
  },
  twitter: {
    card: "summary",
    site: "@asepharyana",
    title: "Website pribadi milik Asep Haryana Saputra",
    description:
      "Website pribadi milik Asep Haryana Saputra,ini adalah halaman utama pada website ini",
    images: [
      {
        url: "https://i.imgur.com/DLHzyeA.png", // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: "https://i.imgur.com/DLHzyeA.png", // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    creator: "@asepharyana71",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ContextAppProvider>
      <ViewTransitions>
        {process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID && ( // Conditionally render GoogleAnalytics
          <GoogleAnalytics
            gaId={process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}
          />
        )}
        <SessionWrapper>
          <html lang="en">
            <head>
              {ThemeModeScript && <ThemeModeScript />}
              {/* Conditionally render ThemeModeScript */}
            </head>
            <body>
              <Flowbite>
                <NavbarWrapper />
                <div className="m-auto max-h-full max-w-full px-3 pb-10 pt-20 dark:bg-gray-900">
                  {children}
                </div>
                <DarkThemeToggle className="fixed bottom-0 z-10" />
              </Flowbite>
            </body>
          </html>
        </SessionWrapper>
      </ViewTransitions>
    </ContextAppProvider>
  );
}

import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import { Montserrat } from "next/font/google";
import NavbarWrapper from "../components/navbar/NavbarHomes";
import { ViewTransitions } from "next-view-transitions";
import SessionWrapper from "@/components/SessionWrapper";
import {} from "flowbite";
import { ThemeModeScript } from "flowbite-react";
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import ContextAppProvider from "@/components/ContextApp";
const montserrat = Montserrat({ subsets: ["latin"] });
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Website pribadi milik Asep Haryana Saputra",
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
        <GoogleAnalytics
          gaId={`process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`}
        />
        <SessionWrapper>
          <Flowbite>
            <html lang="en">
              <head>
                <ThemeModeScript></ThemeModeScript>
              </head>
              <body className={montserrat.className}>
                <NavbarWrapper />
                <div className="mx-auto max-w-full px-3 pb-10 pt-20">
                  {children}
                </div>
                <DarkThemeToggle className="fixed bottom-0 z-10"></DarkThemeToggle>
              </body>
            </html>
          </Flowbite>
        </SessionWrapper>
      </ViewTransitions>
    </ContextAppProvider>
  );
}

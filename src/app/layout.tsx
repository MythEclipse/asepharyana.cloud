import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Montserrat } from "next/font/google";
import NavbarWrapper from "../components/navbar/NavbarHomes";
import { ViewTransitions } from "next-view-transitions";
import SessionWrapper from "@/components/SessionWrapper";
import {} from "flowbite";
import { createContext, useState } from "react";
import { ContextApp } from "@/components/ContextApp";
import { ThemeModeScript } from "flowbite-react";
import ContextAppProvider  from "@/components/ContextApp";
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Website pribadi milik Asep Haryana Saputra',
  description: 'Website pribadi milik Asep Haryana Saputra,ini adalah halaman utama pada website ini',
  openGraph: {
    title: 'Website pribadi milik Asep Haryana Saputra',
    description: 'Website pribadi milik Asep Haryana Saputra,ini adalah halaman utama pada website ini',
    images: [
      {
        url: 'https://imgur.com/DLHzyeA', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'https://imgur.com/DLHzyeA', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    type: 'article',
    url: 'https://asepharyana.my.id/',
    siteName: 'Website pribadi milik Asep Haryana Saputra',
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary',
    site: '@asepharyana',
    title: 'Website pribadi milik Asep Haryana Saputra',
    description: 'Website pribadi milik Asep Haryana Saputra,ini adalah halaman utama pada website ini',
    images: [
      {
        url: 'https://imgur.com/a/n1E3Yxm', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'https://imgur.com/a/n1E3Yxm', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    creator: '@asepharyana71',
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
        {/* <SessionWrapper> */}
        <html lang="en">
          <head>
            <ThemeModeScript></ThemeModeScript>
          </head>
          <body className={montserrat.className}>
            <NavbarWrapper />
            <div className="mx-auto max-w-full px-3 pb-10 pt-20">
              {children}
            </div>
          </body>
        </html>
        {/* </SessionWrapper> */}
      </ViewTransitions>
    </ContextAppProvider>
  );
}

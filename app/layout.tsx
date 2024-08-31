import type { Metadata } from 'next';
import React from 'react';
import './globals.css';
import NavbarWrapper from '../components/navbar/NavbarHomes';
import { ViewTransitions } from 'next-view-transitions';
import SessionWrapper from '../components/SessionWrapper';
import { ThemeModeScript } from 'flowbite-react';
import { DarkThemeToggle, Flowbite } from 'flowbite-react';
import ContextAppProvider from '../components/ContextApp';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
import type { CustomFlowbiteTheme } from 'flowbite-react';

const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary: 'bg-red-500 hover:bg-red-600'
    }
  }
};

export const metadata: Metadata = {
  title: 'Asep Haryana Saputra',
  description: 'Website pribadi milik Asep Haryana Saputra,ini adalah halaman utama pada website ini',
  keywords:'protofolio, nextjs, api, free, anime, manga',
  openGraph: {
    title: 'Website pribadi milik Asep Haryana Saputra',
    description: 'Website pribadi milik Asep Haryana Saputra,ini adalah halaman utama pada website ini',
    images: [
      {
        url: 'https://imgur.com/cuUbKXh', // Must be an absolute URL
        width: 800,
        height: 600
      },
      {
        url: 'https://imgur.com/cuUbKXh', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'My custom alt'
      }
    ],
    type: 'article',
    url: 'https://asepharyana.my.id/',
    siteName: 'Website pribadi milik Asep Haryana Saputra',
    locale: 'id_ID'
  },
  twitter: {
    card: 'summary',
    site: '@asepharyana',
    title: 'Website pribadi milik Asep Haryana Saputra',
    description: 'Website pribadi milik Asep Haryana Saputra,ini adalah halaman utama pada website ini',
    images: [
      {
        url: 'https://imgur.com/cuUbKXh', // Must be an absolute URL
        width: 800,
        height: 600
      },
      {
        url: 'https://imgur.com/cuUbKXh', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'My custom alt'
      }
    ],
    creator: '@asepharyana71'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ContextAppProvider>
      <ViewTransitions>
        <SessionWrapper>
          <html suppressHydrationWarning lang="id" className={inter.className}>
            <head>{ThemeModeScript && <ThemeModeScript />}</head>
            <body className="h-screen dark:bg-dark">
              <NavbarWrapper />
              <Flowbite theme={{ theme: customTheme }}>
                <div className="mt-5 max-w-full px-3 pb-10 pt-56 sm:px-6 lg:px-8">
                  {children}
                  <DarkThemeToggle className="fixed bottom-0 z-10" />
                </div>
              </Flowbite>
            </body>
          </html>
        </SessionWrapper>
      </ViewTransitions>
    </ContextAppProvider>
  );
}

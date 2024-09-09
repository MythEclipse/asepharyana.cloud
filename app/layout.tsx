import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavbarWrapper from '../components/navbar/NavbarHomes';
import SessionWrapper from '../components/SessionWrapper';
import ContextAppProvider from '../components/ContextApp';
import { ViewTransitions } from 'next-view-transitions';
import { ThemeModeScript, DarkThemeToggle, Flowbite } from 'flowbite-react';
import type { CustomFlowbiteTheme } from 'flowbite-react';
import { PRODUCTION } from '@/lib/url';

// Google font setup
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Custom Flowbite theme configuration
const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary: 'bg-red-500 hover:bg-red-600'
    }
  }
};

// Metadata configuration for the page
export const metadata: Metadata = {
  metadataBase: new URL(`${PRODUCTION}`),
  title: 'Asep Haryana Saputra',
  description: 'Website pribadi milik Asep Haryana Saputra, ini adalah halaman utama pada website ini',
  keywords: 'portfolio, nextjs, api, free, anime, manga',
  openGraph: {
    title: 'Website pribadi milik Asep Haryana Saputra',
    description: 'Website pribadi milik Asep Haryana Saputra, ini adalah halaman utama pada website ini',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600
      },
      {
        url: '/logo.png',
        width: 1800,
        height: 1600,
        alt: 'My custom alt'
      }
    ],
    type: 'article',
    url: `${PRODUCTION}`,
    siteName: 'Website pribadi milik Asep Haryana Saputra',
    locale: 'id_ID'
  },
  twitter: {
    card: 'summary',
    site: '@asepharyana',
    title: 'Website pribadi milik Asep Haryana Saputra',
    description:
      'Website pribadi milik Asep Haryana Saputra, berisi berbagai project seperti API, Anime, Manga, dan lainnya',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600
      },
      {
        url: '/logo.png',
        width: 1800,
        height: 1600,
        alt: 'My custom alt'
      }
    ],
    creator: '@asepharyana71'
  }
};

// RootLayout component
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContextAppProvider>
      <ViewTransitions>
        <SessionWrapper>
          <html suppressHydrationWarning lang="id" className={inter.className}>
            <head>
              {ThemeModeScript && <ThemeModeScript />}
              <link rel="canonical" href={`${PRODUCTION}`} />
            </head>
            <body className="h-screen dark:bg-dark">
              <NavbarWrapper />
              <Flowbite theme={{ theme: customTheme }}>
                <div className="mt-28 max-w-full px-0.5 pb-10 pt-38 sm:px-6 lg:px-8">
                  {children}
                  <DarkThemeToggle className="fixed bottom-0 left-0 z-10 m-4" aria-label="Toggle Dark Mode" />
                </div>
              </Flowbite>
            </body>
          </html>
        </SessionWrapper>
      </ViewTransitions>
    </ContextAppProvider>
  );
}

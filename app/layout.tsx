import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Flowbite } from 'flowbite-react';
import './globals.css';
import NavbarWrapper from '@/components/navbar/NavbarUtama';
// import SessionWrapper from '@/components/SessionWrapper';
// import ContextAppProvider from '@/components/ContextApp';
import { ViewTransitions } from 'next-view-transitions';
import { PRODUCTION } from '@/lib/url';
import { ThemeProvider } from '@/components/theme-provider';
import DarkThemeToggle from '@/components/DarkThemeToggle';
import { auth } from '@/lib/auth';
// Google font setup
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
export async function GET() {
  const session = await auth();
  const status = session ? 'Authenticated' : 'Not Authenticated';
  return { session, status };
}
// Metadata configuration for the page
export const metadata: Metadata = {
  metadataBase: new URL(`${PRODUCTION}`),
  title: 'Asep Haryana Saputra',
  description: 'Website pribadi milik Asep Haryana Saputra, ini adalah halaman utama pada website ini',
  keywords: 'portfolio, nextjs, api, free, anime, manga, asep, haryana, saputra, asep haryana, asep haryana saputra',
  openGraph: {
    title: 'Website pribadi milik Asep Haryana Saputra',
    description: 'Website pribadi milik Asep Haryana Saputra, ini adalah halaman utama pada website ini',
    images: [
      { url: '/logo.png', width: 800, height: 600 },
      { url: '/logo.png', width: 1800, height: 1600, alt: 'My custom alt' }
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
      { url: '/logo.png', width: 800, height: 600 },
      { url: '/logo.png', width: 1800, height: 1600, alt: 'My custom alt' }
    ],
    creator: '@asepharyana71'
  }
};

// RootLayout component
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { status, session } = await GET();
  return (
    <Flowbite>
      {/* <ContextAppProvider> */}
      <ViewTransitions>
        {/* <SessionWrapper> */}
        <html lang="id" className={inter.className} suppressHydrationWarning>
          <head>
            <link rel="canonical" href={`${PRODUCTION}`} />
            <link rel="manifest" href="/manifest.json" />
            <link rel="icon" href="/favicon.ico" />
          </head>
          <body className="h-screen bg-white dark:bg-black">
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <NavbarWrapper sessionData={session} statusData={status} />
              <div className="mt-28 max-w-full px-0.5 pb-10 pt-38 sm:px-6 lg:px-8">
                {children}
                <DarkThemeToggle className="fixed bottom-0 left-0 z-10 m-4" aria-label="Toggle Dark Mode" />
              </div>
            </ThemeProvider>
          </body>
        </html>
        {/* </SessionWrapper> */}
      </ViewTransitions>
      {/* </ContextAppProvider> */}
    </Flowbite>
  );
}

import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import React, { Suspense } from 'react';
import './globals.css';
import NavbarWrapper from '../components/navbar/NavbarHomes';
import { ViewTransitions } from 'next-view-transitions';
import SessionWrapper from '../components/SessionWrapper';
import { ThemeModeScript } from 'flowbite-react';
import { DarkThemeToggle, Flowbite } from 'flowbite-react';
import ContextAppProvider from '../components/ContextApp';
import { Theme } from '@radix-ui/themes';
import { Inter } from 'next/font/google';
import Providers from './providers'; // Import Providers
import Loading from '@/components/loading';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });


export const metadata: Metadata = {
  title: 'Asep Haryana Saputra',
  description: 'Website pribadi milik Asep Haryana Saputra,ini adalah halaman utama pada website ini',
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
            <head>
              {ThemeModeScript && <ThemeModeScript />}
            </head>
            <body className="h-screen dark:bg-dark">
              <Theme accentColor="blue" grayColor="gray" panelBackground="solid" radius="large">
                <NavbarWrapper />
                <Flowbite>
                  <Providers>
                    {' '}
                    {/* Wrap children with Providers */}
                    <div className="mt-5 max-w-full px-3 pb-10 pt-56 sm:px-6 lg:px-8">
                      <Suspense fallback={<Loading />}>{children}</Suspense>
                      <DarkThemeToggle className="fixed bottom-0 z-10" />
                    </div>
                  </Providers>
                </Flowbite>
              </Theme>
            </body>
          </html>
        </SessionWrapper>
      </ViewTransitions>
    </ContextAppProvider>
  );
}

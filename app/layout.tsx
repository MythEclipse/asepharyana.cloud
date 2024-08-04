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
import { GoogleAnalytics } from '@next/third-parties/google';
import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Theme } from '@radix-ui/themes';
import { Inter } from 'next/font/google';
import Providers from './providers'; // Import Providers
import Loading from '@/components/loading';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary: 'bg-lighta dark:bg-dark hover:bg-blue-600',
      secondary: 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700',
      danger: 'bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700'
    },
    size: {
      sm: 'px-2 py-1 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    }
  },
  card: {
    root: {
      base: 'bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden',
      children: 'p-4',
      horizontal: {
        on: 'flex-row',
        off: 'flex-col'
      },
      href: 'hover:underline'
    },
    img: {
      base: 'w-full h-auto object-cover'
    }
  },
  modal: {
    root: {
      base: 'fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50'
    },
    content: {
      base: 'bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6'
    },
    header: {
      base: 'border-b border-gray-200 dark:border-gray-700 pb-4 mb-4'
    },
    body: {
      base: 'mb-4'
    },
    footer: {
      base: 'border-t border-gray-200 dark:border-gray-700 pt-4 mt-4'
    }
  }
  // Tambahkan komponen lain yang ingin Anda kustomisasi di sini
};
// Tambahkan komponen lain yang ingin Anda kustomisasi di sini

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
        {process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID && ( // Conditionally render GoogleAnalytics
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID} />
        )}
        <SessionWrapper>
          <html suppressHydrationWarning lang="id" className={inter.className}>
            <head>
              {ThemeModeScript && <ThemeModeScript />}
              {/* Conditionally render ThemeModeScript */}
            </head>
            <body className="h-screen dark:bg-dark">
              <Theme accentColor="blue" grayColor="gray" panelBackground="solid" radius="large">
                <NavbarWrapper />
                <Flowbite theme={{ theme: customTheme }}>
                  <Providers>
                    {' '}
                    {/* Wrap children with Providers */}
                    <div className="mt-5 max-w-full px-3 pb-10 pt-56 sm:px-6 lg:px-8">
                    <Suspense fallback={<Loading />}>
                      {children}
                    </Suspense>
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

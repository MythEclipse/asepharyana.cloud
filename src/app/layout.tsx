import type { Metadata } from 'next'
import React from 'react'
import './globals.css'
import NavbarWrapper from '../components/navbar/NavbarHomes'
import { ViewTransitions } from 'next-view-transitions'
import SessionWrapper from '@/components/SessionWrapper'
import {} from 'flowbite'
import { ThemeModeScript } from 'flowbite-react'
import { DarkThemeToggle, Flowbite } from 'flowbite-react'
import ContextAppProvider from '@/components/ContextApp'
import { GoogleAnalytics } from '@next/third-parties/google'
import type { CustomFlowbiteTheme } from 'flowbite-react'

const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary: 'bg-blue-500 hover:bg-blue-600'
    }
  }
}
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
}
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ContextAppProvider>
      <ViewTransitions>
        {process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID && ( // Conditionally render GoogleAnalytics
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID} />
        )}
        <SessionWrapper>
          <html suppressHydrationWarning lang="id">
            <head>
              {ThemeModeScript && <ThemeModeScript />}
              {/* Conditionally render ThemeModeScript */}
            </head>
            <body className="h-screen dark:bg-gray-900">
              <NavbarWrapper />
              <Flowbite theme={{ theme: customTheme }}>
                <div className="mt-5 max-w-full px-3 pb-10 pt-20 sm:px-6 lg:px-8">
                  {children}
                  <DarkThemeToggle className="fixed bottom-0 z-10" />
                </div>
              </Flowbite>
            </body>
          </html>
        </SessionWrapper>
      </ViewTransitions>
    </ContextAppProvider>
  )
}

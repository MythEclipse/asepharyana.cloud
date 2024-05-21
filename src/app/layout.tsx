import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Montserrat } from "next/font/google";
import NavbarWrapper from "../components/navbar/NavbarHomes";
import { ViewTransitions } from "next-view-transitions";
import SessionWrapper from "@/components/SessionWrapper";
import {} from "flowbite";
import { Alert } from "flowbite-react";
import { createContext, useState } from "react";
import { ContextApp } from "@/components/ContextApp";
import ContextAppProvider  from "@/components/ContextApp";
const montserrat = Montserrat({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: 'My Page Title',
}

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

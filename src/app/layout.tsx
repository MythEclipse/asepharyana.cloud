'use client';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Navbar from "../components/navbar/NavbarHomes";
import { ViewTransitions } from "next-view-transitions";
import SessionWrapper from "@/components/SessionWrapper";
import {} from "flowbite";
import { Alert } from "flowbite-react";
import { createContext, useState } from "react";

const montserrat = Montserrat({ subsets: ["latin"] });

export const AppContext = createContext({} as any);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [lokasi, setLokasi] = useState("1");
  return (
    <AppContext.Provider value={{ lokasi, setLokasi }}>
      <ViewTransitions>
        {/* <SessionWrapper> */}
        <html lang="en">
          <body className={montserrat.className}>
            <Navbar />
            <div className="mx-auto max-w-full px-3 pb-10 pt-20">
              {children}
            </div>
          </body>
        </html>
        {/* </SessionWrapper> */}
      </ViewTransitions>
    </AppContext.Provider>
  );
}

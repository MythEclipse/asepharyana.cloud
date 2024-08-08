import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home'
};

export default function Home() {
  return (
    <section id="hero" className="pt-35 bg-lighta dark:bg-darkb lg:px-3 h-screen w-full">
      <div className="container">
        <div className="flex flex-wrap">
          <div className="w-full self-center px-2 lg:w-1/2">
            <h1 className="text-base font-semibold text-primary-600 lg:text-xl">
              Halo semua 👋,saya{' '}
              <span className="block text-4xl font-bold text-dark dark:text-gray-100 lg:text-5xl">
                Asep haryana saputra
              </span>
            </h1>
            <h2 className="mb-5 text-lg font-medium text-secondary lg:text-2xl">
              Saya adalah seorang <span className="text-dark dark:text-gray-100">Programmer</span>
            </h2>
            <p className="font-medium text-slate-400">Okelah</p>
            <link
              href="#"
              className="rounded-full bg-primary-600 px-8 py-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:opacity-80 hover:shadow-lg"
            />
          </div>
          <div className="w-full self-end px-4 pt-4 lg:w-1/2">
            <div className="relative pt-20 lg:right-0 lg:mt-0">
              <Image
                src="/profil.jpg"
                alt=""
                className="mx-auto size-80 max-h-80 max-w-80 rounded-full object-cover md:size-auto lg:size-auto"
                width="0"
                height="0"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import Instagram from '@/components/logo/Instagram';
import Facebook from '@/components/logo/Facebook';
import Linkedln from '@/components/logo/Linkedln';
import Discord from '@/components/logo/Discord';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Home'
};

export default function Home() {
  return (
  <>
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
    <section id="about" className="pb-32 pt-36 bg-lighta dark:bg-darkb">
    <div className="container">
      <div className="flex flex-wrap">
        <div className="mb-7 w-full px-4 lg:w-1/2">
          <h4 className="mb-3 text-lg font-bold uppercase text-primary-600">Tentang Saya</h4>
          <h2 className="mb-5 max-w-md text-3xl font-bold text-dark dark:text-gray-100">
            Saya adalah seorang programmer
          </h2>
          <p className="max-w-xl text-base font-medium text-secondary">
            Saya adalah seorang mahasiswa di Universitas Kuningan
          </p>
        </div>
        <div className="w-full px-4 lg:w-1/2">
          <h3 className="mb-4 text-2xl font-semibold text-dark dark:text-gray-100">Mari berteman</h3>
          <p className="mb-6 text-base font-medium text-secondary">
            Berikut adalah beberapa sosial media yang saya punya
          </p>
          <div className="flex items-center">
            <Link
              href="https://github.com/Asepharyana71"
              className="item-center flex size-9 justify-center rounded-full border border-slate-300 text-dark hover:border-primary-600 hover:bg-primary-600 hover:text-white dark:text-gray-100"
            >
              <Discord></Discord>
            </Link>
            <Link
              href="https://www.instagram.com/asepharyana18/"
              className="item-center flex size-9 justify-center rounded-full border border-slate-300 text-dark hover:border-primary-600 hover:bg-primary-600 hover:text-white dark:text-gray-100"
            >
              <Instagram></Instagram>
            </Link>
            <Link
              href="https://www.linkedin.com/in/asep-haryana-2014a5294/"
              className="item-center flex size-9 justify-center rounded-full border border-slate-300 text-dark hover:border-primary-600 hover:bg-primary-600 hover:text-white dark:text-gray-100"
            >
              <Linkedln></Linkedln>
            </Link>
            <Link
              href="https://www.facebook.com/asep.haryana.7355"
              className="item-center flex size-9 justify-center rounded-full border border-slate-300 text-dark hover:border-primary-600 hover:bg-primary-600 hover:text-white dark:text-gray-100"
            >
              <Facebook></Facebook>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
  </>
  );
}

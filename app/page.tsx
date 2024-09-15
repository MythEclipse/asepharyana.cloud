import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import Instagram from '@/components/logo/Instagram';
import Facebook from '@/components/logo/Facebook';
import Linkedln from '@/components/logo/LinkedIn';
import Discord from '@/components/logo/Discord';
import Link from 'next/link';
import Bg from '@/components/Bg';
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Home'
};

export default function Home() {
  const Judul = [
    {
      text: 'Asep',
      className: 'text-blue-500 dark:text-blue-500'
    },
    {
      text: 'Haryana',
      className: 'text-blue-500 dark:text-blue-500'
    },
    {
      text: 'Saputra',
      className: 'text-blue-500 dark:text-blue-500'
    }
  ];

  return (
    <main>
      <Bg>
        <section id="hero" className="pt-10 bg-lighta dark:bg-darkb lg:px-3 h-screen w-full">
          <div className="container px-6 mt-10">
            <div className="flex flex-wrap">
              <div className="w-full self-center px-2 lg:w-1/2">
                <h4 className="text-xl sm:text-3xl md:text-4xl font-semibold text-dark dark:text-lighta">
                  Halo semua 👋, saya{' '}
                  <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-dark dark:text-lighta">
                    <TypewriterEffectSmooth words={Judul}></TypewriterEffectSmooth>
                  </span>
                </h4>
                <h2 className="mb-5 text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-dark dark:text-lighta">Okelah</h2>
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
                <h4 className="mb-3 text-lg font-bold uppercase text-dark dark:text-lighta">Tentang Saya</h4>
                <h2 className="mb-5 max-w-md text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-lighta">
                  Saya adalah seorang programmer
                </h2>
                <p className="max-w-xl text-base sm:text-lg md:text-xl font-medium text-dark dark:text-lighta">
                  Saya adalah seorang mahasiswa di Universitas Kuningan
                </p>
              </div>
              <div className="w-full px-4 lg:w-1/2">
                <h3 className="mb-4 text-2xl font-semibold text-dark dark:text-lighta">Mari berteman</h3>
                <p className="mb-6 text-base sm:text-lg md:text-xl font-medium text-dark dark:text-lighta">
                  Berikut adalah beberapa sosial media yang saya punya
                </p>
                <div className="flex items-center">
                  <Link
                    href="https://github.com/Asepharyana71"
                    className="item-center flex size-9 justify-center rounded-full border border-slate-300 text-dark hover:border-primary-600 hover:bg-primary-600 hover:text-lighta dark:text-lighta"
                  >
                    <Discord />
                  </Link>
                  <Link
                    href="https://www.instagram.com/asepharyana18/"
                    className="item-center flex size-9 justify-center rounded-full border border-slate-300 text-dark hover:border-primary-600 hover:bg-primary-600 hover:text-lighta dark:text-lighta"
                  >
                    <Instagram />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/asepharyana/"
                    className="item-center flex size-9 justify-center rounded-full border border-slate-300 text-dark hover:border-primary-600 hover:bg-primary-600 hover:text-lighta dark:text-lighta"
                  >
                    <Linkedln />
                  </Link>
                  <Link
                    href="https://www.facebook.com/asepharyana/"
                    className="item-center flex size-9 justify-center rounded-full border border-slate-300 text-dark hover:border-primary-600 hover:bg-primary-600 hover:text-lighta dark:text-lighta"
                  >
                    <Facebook />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Bg>
    </main>
  );
}

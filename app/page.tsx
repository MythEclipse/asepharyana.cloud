"use client";

import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import Instagram from '@/components/logo/Instagram';
import Facebook from '@/components/logo/Facebook';
import LinkedIn from '@/components/logo/LinkedIn';
import Discord from '@/components/logo/Discord';
import Link from 'next/link';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

// Custom animation classes
const animationClasses = {
  fadeIn: 'animate-fadeIn',
  slideIn: 'animate-slideIn',
};

const Home = () => {
  const [isHeroVisible, heroRef] = useIntersectionObserver();
  const [isAboutVisible, aboutRef] = useIntersectionObserver();
  
  return (
    <main className="bg-lighta dark:bg-darkb">
      {/* Hero Section */}
      <section
        id="hero"
        ref={heroRef}
        className={`h-screen w-full pt-35 ${isHeroVisible ? animationClasses.fadeIn : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center justify-between h-full">
          <div className={`w-full lg:w-1/2 ${isHeroVisible ? animationClasses.fadeIn : ''} text-center lg:text-left`}>
            <h1 className="text-base font-semibold text-primary-600 lg:text-xl">
              Halo semua 👋, saya{' '}
              <span className="block text-4xl font-bold text-dark dark:text-gray-100 lg:text-5xl">
                Asep Haryana Saputra
              </span>
            </h1>
            <h2 className="mb-5 text-lg font-medium text-secondary lg:text-2xl text-dark dark:text-lime-300">
              Saya adalah seorang <span className="text-dark dark:text-gray-100">Programmer</span>
            </h2>
            <p className="font-medium text-slate-400">Okelah</p>
          </div>
          <div className={`w-full lg:w-1/2 ${isHeroVisible ? animationClasses.fadeIn : ''} flex justify-center lg:justify-end`}>
            <div className="relative pt-20">
              <Image
                src="/profil.jpg"
                alt="Profile Picture"
                className="mx-auto lg:mx-0 rounded-full object-cover"
                width={300}
                height={300}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className={`pb-32 pt-36 ${isAboutVisible ? animationClasses.slideIn : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap">
            <div className={`mb-7 w-full lg:w-1/2 ${isAboutVisible ? animationClasses.slideIn : ''}`}>
              <h4 className="mb-3 text-lg font-bold uppercase text-primary-600">Tentang Saya</h4>
              <h2 className="mb-5 max-w-md text-3xl font-bold text-dark dark:text-gray-100">
                Saya adalah seorang programmer
              </h2>
              <p className="max-w-xl text-base font-medium text-secondary">
                Saya adalah mahasiswa di Universitas Kuningan
              </p>
            </div>
            <div className={`w-full lg:w-1/2 ${isAboutVisible ? animationClasses.slideIn : ''}`}>
              <h3 className="mb-4 text-2xl font-semibold text-dark dark:text-gray-100">Mari Berteman</h3>
              <p className="mb-6 text-base font-medium text-secondary">
                Berikut adalah beberapa sosial media yang saya punya
              </p>
              <div className="flex space-x-4">
                <Link
                  href="https://github.com/Asepharyana71"
                  className="flex items-center justify-center w-12 h-12 rounded-full border border-slate-300 text-dark hover:border-primary-600 hover:bg-primary-600 hover:text-white dark:text-gray-100"
                >
                  <Discord />
                </Link>
                <Link
                  href="https://www.instagram.com/asepharyana18/"
                  className="flex items-center justify-center w-12 h-12 rounded-full border border-slate-300 text-dark hover:border-primary-600 hover:bg-primary-600 hover:text-white dark:text-gray-100"
                >
                  <Instagram />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/asep-haryana-2014a5294/"
                  className="flex items-center justify-center w-12 h-12 rounded-full border border-slate-300 text-dark hover:border-primary-600 hover:bg-primary-600 hover:text-white dark:text-gray-100"
                >
                  <LinkedIn />
                </Link>
                <Link
                  href="https://www.facebook.com/asep.haryana.7355"
                  className="flex items-center justify-center w-12 h-12 rounded-full border border-slate-300 text-dark hover:border-primary-600 hover:bg-primary-600 hover:text-white dark:text-gray-100"
                >
                  <Facebook />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

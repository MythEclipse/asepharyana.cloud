import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  return (
    <section id="hero" className="pt-35 lg:px-3">
      <div className="container">
        <div className="flex flex-wrap">
          <div className="w-full self-center px-2 lg:w-1/2">
            <h1 className="text-base font-semibold text-primary lg:text-xl">
              Halo semua 👋,saya{" "}
              <span className="block font-bold text-hitam text-4xl lg:text-5xl">
                Asep haryana saputra
              </span>
            </h1>
            <h2 className="font-medium text-slate-500 text-lg mb-5 lg:text-2xl">
              Saya adalah seorang{" "}
              <span className="text-hitam">Programmer</span>
            </h2>
            <p className="font-medium text-slate-400">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro,
              voluptas!
            </p>
            <link
              href="#"
              className="text-base font-semibold text-white bg-primary py-3 px-8 rounded-full hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out"
            />
          </div>
          <div className="w-full self-end px-4 lg:w-1/2 pt-4">
          <div className="relative mt-10 lg:mt-0 lg:right-0">
            <Image
              src="/profil.jpg"
              alt=""
               className="object-cover rounded-full mx-auto w-80 h-80 md:w-auto md:h-auto lg:h-auto lg:w-auto max-w-80 max-h-80 "
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

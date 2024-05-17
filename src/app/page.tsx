import React from "react";
import Image from "next/image";
import Link from "next/link";
import Box from "@/components/box/Box";
import BoxContainer from "@/components/box/BoxContainer";
import { useState } from "react";

export default function Home() {
  return (
    <>
      <section id="hero" className="pt-35 lg:px-3">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="w-full self-center px-2 lg:w-1/2">
              <h1 className="text-base font-semibold text-primary lg:text-xl">
                Halo semua 👋,saya{" "}
                <span className="block font-bold text-dark text-4xl lg:text-5xl">
                  Asep haryana saputra
                </span>
              </h1>
              <h2 className="font-medium text-secondary text-lg mb-5 lg:text-2xl">
                Saya adalah seorang{" "}
                <span className="text-dark">Programmer</span>
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
      <section id="about" className="pt-36 pb-32">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="w-full px-4 mb-7 lg:w-1/2">
              <h4 className="font-bold uppercase text-primary text-lg mb-3">
                Tentang Saya
              </h4>
              <h2 className="font-bold text-dark text-3xl mb-5 max-w-md">
                Saya adalah seorang programmer
              </h2>
              <p className="font-medium text-base text-secondary max-w-xl">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Dolore, mollitia tempora? Illum, ad inventore. Maxime obcaecati
                explicabo iste!
              </p>
            </div>
            <div className="w-full px-4 lg:w-1/2">
              <h3 className="font-semibold text-dark text-2xl mb-4">
                Mari berteman
              </h3>
              <p className="font-medium text-base text-secondary mb-6">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem,
                nemo voluptas temporibus eos nesciunt tenetur aut unde ab
                pariatur molestias soluta excepturi harum neque ipsum cum!
                Cumque iusto debitis fugit optio exercitationem quaerat nobis
                nostrum deserunt! Voluptas sapiente reprehenderit quisquam?
              </p>
              <div className="flex items-center ">
                <Link
                  href="https://github.com/Asepharyana71"
                  className="w-9 h-9 rounded-full flex justify-center item-center border text-dark border-slate-300 hover:border-primary hover:bg-primary hover:text-white"
                >
                  <svg
                    width="20"
                    viewBox="0 0 24 24"
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>github</title>
                    <path d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z" />
                  </svg>
                </Link>
                <Link
                  href="https://www.instagram.com/asepharyana18/"
                  className="w-9 h-9 rounded-full flex justify-center item-center border text-dark border-slate-300 hover:border-primary hover:bg-primary hover:text-white"
                >
                  <svg
                    fill="#000000"
                    width="20"
                    className="fill-current"
                    viewBox="0 0 32 32"
                    id="Camada_1"
                    version="1.1"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <g>
                      <path d="M22.3,8.4c-0.8,0-1.4,0.6-1.4,1.4c0,0.8,0.6,1.4,1.4,1.4c0.8,0,1.4-0.6,1.4-1.4C23.7,9,23.1,8.4,22.3,8.4z" />

                      <path d="M16,10.2c-3.3,0-5.9,2.7-5.9,5.9s2.7,5.9,5.9,5.9s5.9-2.7,5.9-5.9S19.3,10.2,16,10.2z M16,19.9c-2.1,0-3.8-1.7-3.8-3.8   c0-2.1,1.7-3.8,3.8-3.8c2.1,0,3.8,1.7,3.8,3.8C19.8,18.2,18.1,19.9,16,19.9z" />

                      <path d="M20.8,4h-9.5C7.2,4,4,7.2,4,11.2v9.5c0,4,3.2,7.2,7.2,7.2h9.5c4,0,7.2-3.2,7.2-7.2v-9.5C28,7.2,24.8,4,20.8,4z M25.7,20.8   c0,2.7-2.2,5-5,5h-9.5c-2.7,0-5-2.2-5-5v-9.5c0-2.7,2.2-5,5-5h9.5c2.7,0,5,2.2,5,5V20.8z" />
                    </g>
                  </svg>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/asep-haryana-2014a5294/"
                  className="w-9 h-9 rounded-full flex justify-center item-center border text-dark border-slate-300 hover:border-primary hover:bg-primary hover:text-white"
                >
                  <svg
                    fill="#000000"
                    width="20"
                    className="fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title />

                    <g id="Linkedln">
                      <path d="M26.49,30H5.5A3.35,3.35,0,0,1,3,29a3.35,3.35,0,0,1-1-2.48V5.5A3.35,3.35,0,0,1,3,3,3.35,3.35,0,0,1,5.5,2h21A3.35,3.35,0,0,1,29,3,3.35,3.35,0,0,1,30,5.5v21A3.52,3.52,0,0,1,26.49,30ZM9.11,11.39a2.22,2.22,0,0,0,1.6-.58,1.83,1.83,0,0,0,.6-1.38A2.09,2.09,0,0,0,10.68,8a2.14,2.14,0,0,0-1.51-.55A2.3,2.3,0,0,0,7.57,8,1.87,1.87,0,0,0,7,9.43a1.88,1.88,0,0,0,.57,1.38A2.1,2.1,0,0,0,9.11,11.39ZM11,13H7.19V24.54H11Zm13.85,4.94a5.49,5.49,0,0,0-1.24-4,4.22,4.22,0,0,0-3.15-1.27,3.44,3.44,0,0,0-2.34.66A6,6,0,0,0,17,14.64V13H13.19V24.54H17V17.59a.83.83,0,0,1,.1-.43,2.73,2.73,0,0,1,.7-1,1.81,1.81,0,0,1,1.28-.44,1.59,1.59,0,0,1,1.49.75,3.68,3.68,0,0,1,.44,1.9v6.15h3.85ZM17,14.7a.05.05,0,0,1,.06-.06v.06Z" />
                    </g>
                  </svg>
                </Link>
                <Link
                  href="https://www.facebook.com/asep.haryana.7355"
                  className="w-9 h-9 rounded-full flex justify-center item-center border text-dark border-slate-300 hover:border-primary hover:bg-primary hover:text-white"
                >
                  <svg
                    fill="#000000"
                    width="20"
                    className="fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2.03998C6.5 2.03998 2 6.52998 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.84998C10.44 7.33998 11.93 5.95998 14.22 5.95998C15.31 5.95998 16.45 6.14998 16.45 6.14998V8.61998H15.19C13.95 8.61998 13.56 9.38998 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.57C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.52998 17.5 2.03998 12 2.03998Z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="portfolio" className="pt-36 pb-16 bg-slate-200 ">
        <div className="container">
          <div className="w-full">
            <div className="max-w-xl mx-auto text-center mb-16">
              <h4 className="font-semibold text-lg text-primary mb-2">
                Portfolio
              </h4>
              <h2 className="font-bold text-dark text-3xl mb-4 ">
                Project terbaru
              </h2>
              <p className="font-medium text-md text-secondary">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia
                minus laborum quidem id eveniet molestias voluptas quos
                recusandae natus placeat!
              </p>
            </div>
          </div>
          <BoxContainer>
            <Box>
              <Image
                src="https://source.unsplash.com/600x300/?programing"
                alt="porto"
                className="object-cover w-full h-72"
                width="0"
                height="0"
                sizes="100vw"
              ></Image>
              <h3 className="font-semibold text-xl text-dark mt-5 m-3">
                project1
              </h3>
              <p className="font-medium text-base text-secondary m-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quisquam enim hic voluptates libero rerum ipsum excepturi
                ducimus inventore unde, veritatis reiciendis non aliquam quos
                optio fuga vero ut, eaque aperiam?
              </p>
            </Box>
            <Box>
              <Image
                src="https://source.unsplash.com/600x300/?programing"
                alt="porto"
                className="object-cover w-full h-72"
                width="0"
                height="0"
                sizes="100vw"
              ></Image>
              <h3 className="font-semibold text-xl text-dark mt-5 m-3">
                project1
              </h3>
              <p className="font-medium text-base text-secondary m-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quisquam enim hic voluptates libero rerum ipsum excepturi
                ducimus inventore unde, veritatis reiciendis non aliquam quos
                optio fuga vero ut, eaque aperiam?
              </p>
            </Box>
          </BoxContainer>
        </div>
      </section>
    </>
  );
}

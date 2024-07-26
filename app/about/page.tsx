import { Discord, Facebook, Instagram, Linkedln } from '@/components/logo/svg';
import Link from 'next/link';

export default function Home() {
  return (
    <section id="about" className="pb-32 pt-36 dark:bg-darkb">
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
  );
}

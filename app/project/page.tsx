import BoxContent from '@/components/box/BoxContent';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from 'flowbite-react';
export default function Page() {
  return (
    <div className="container mx-auto p-4">
      <div className="w-full">
        <div className="mx-auto mb-16 max-w-xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-dark dark:text-gray-100">Project terbaru</h2>
          <p className="text-md font-medium text-secondary">Berikut adalah kumpulan Project yang saya buat</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
        {/* <div>
          <BoxContent
            gambar="/Project1.png"
            href="/login"
            judul="Login Page"
            description="fungsi login dengan register yang berfungsi secara seharusnya"
          />
        </div> */}
        <div>
          <BoxContent gambar="/webAnime.png" href="/anime" judul="Anime" description="Anime" />
        </div>
        {/* <div>
          <BoxContent gambar="/Project1.png" href="/feedback" judul="crudtest" description="Crudtest" />
        </div> */}
      </div>
    </div>
  );
}

import TildCard from '@/components/TildCard';
import React from 'react';

export default function Page() {
  return (
    <div className="container mx-auto p-4">
      <div className="w-full">
        <div className="mx-auto mb-16 max-w-xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-dark dark:text-white">Project terbaru</h2>
          <p className="text-md font-medium text-secondary dark:text-white">
            Berikut adalah kumpulan Project yang saya buat
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
        <div>
          <TildCard title="Anime" description="Anime" imageUrl="/webAnime.png" linkUrl="/anime" />
        </div>
        <div>
          <TildCard title="Komik" description="Komik" imageUrl="/webKomik.png" linkUrl="/komik" />
        </div>
        <div>
          <TildCard title="Sosmed" description="Sosmed" imageUrl="/websosmed.png" linkUrl="/sosmed" />
        </div>
      </div>
    </div>
  );
}

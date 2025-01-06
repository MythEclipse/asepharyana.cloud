import React from 'react';
import Image from 'next/image';
import loadingGif from '@/public/loading.webp';

const Loading: React.FC = () => {
  return (
    <div className='fixed inset-0 flex justify-center items-center z-50'>
      <div className='rounded-full h-36 w-36'>
        <Image
          src={loadingGif}
          alt='Loading...'
          width={150}
          height={150}
          className='rounded-full'
          unoptimized
          priority
        />
      </div>
    </div>
  );
};

export default Loading;

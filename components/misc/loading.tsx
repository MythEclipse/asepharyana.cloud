import React from 'react';
import Image from 'next/image';
import loadingGif from '@/public/loading.gif';

const Loading: React.FC = () => {
  return (
    <div className='fixed inset-0 flex justify-center items-center z-29'>
      <div className='rounded-full' style={{ height: '150px', width: '150px' }}>
        <Image
          src={loadingGif}
          alt='loading'
          width={150}
          height={150}
          className='rounded-full'
          priority
          unoptimized
        />
      </div>
    </div>
  );
};

export default Loading;

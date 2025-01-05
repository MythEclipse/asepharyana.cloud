'use client';
import React, { useState } from 'react';

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      {!isPlaying ? (
        <div className='flex flex-col items-center'>
          <button
            onClick={handlePlay}
            className='px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg'
          >
            Play Video
          </button>
        </div>
      ) : (
        <iframe
          src={url}
          style={{ width: '80%', height: '80vh', border: 'none' }}
          allowFullScreen
        />
      )}
    </div>
  );
};

export default VideoPlayer;

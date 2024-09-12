'use client';

import Image from 'next/image';
import React from 'react';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import Link from 'next/link';

interface ThreeDCardProps {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
}

const ThreeDCard: React.FC<ThreeDCardProps> = ({ title, description, imageUrl, linkUrl }) => {
  return (
    <Link href={linkUrl} passHref>
      <CardContainer className="inter-var cursor-pointer">
        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[15rem] h-[25rem] rounded-xl p-4 border overflow-hidden">
          <CardItem translateZ="50" className="text-lg font-semibold text-neutral-600 dark:text-white truncate">
            {title}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-xs mt-2 overflow-hidden overflow-ellipsis whitespace-nowrap dark:text-neutral-300"
          >
            {description}
          </CardItem>
          <CardItem translateZ="100" className="w-full h-[60%] mt-2">
            <Image
              src={imageUrl}
              height="400"
              width="300"
              className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
        </CardBody>
      </CardContainer>
    </Link>
  );
};

export default ThreeDCard;

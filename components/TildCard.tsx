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
        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
          <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
            {title}
          </CardItem>
          <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
            {description}
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <Image
              src={imageUrl}
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
        </CardBody>
      </CardContainer>
    </Link>
  );
};

export default ThreeDCard;

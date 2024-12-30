import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { Card } from '../card/card';

// Define the type for the props
type BoxContentProps = {
  gambar: string;
  judul: string;
  description: string;
  href: string;
};

// Functional component
const BoxContent: React.FC<BoxContentProps> = ({ gambar, judul, description, href }) => {
  return (
    <Card className="m-4 p-4 rounded-lg shadow-lg dark:bg-darkb">
      <Image
        src={gambar}
        alt="porto"
        className="h-72 w-full object-cover rounded-lg"
        width="0"
        height="0"
        sizes="100vw"
      />
      <Link scroll href={href}>
        <h3 className="m-3 mt-5 text-xl font-semibold text-dark hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-600">
          {judul}
        </h3>
      </Link>
      <p className="m-3 text-base font-medium text-secondary dark:text-gray-400">{description}</p>
    </Card>
  );
};

export default BoxContent;

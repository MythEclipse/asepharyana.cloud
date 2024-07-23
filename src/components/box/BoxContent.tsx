import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import Box from './Box'

// Define the type for the props
type BoxContentProps = {
  gambar: string
  judul: string
  description: string
  href: string
}

// Functional component
const BoxContent: React.FC<BoxContentProps> = ({ gambar, judul, description, href }) => {
  return (
    <Box>
      <Image src={gambar} alt="porto" className="h-72 w-full object-cover" width="0" height="0" sizes="100vw" />
      <Link href={href} className="text-xl font-semibold text-dark dark:text-gray-100">
        <h3 className="m-3 mt-5 text-xl font-semibold text-dark hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-600">
          {judul}
        </h3>
      </Link>
      <p className="m-3 text-base font-medium text-secondary">{description}</p>
    </Box>
  )
}

export default BoxContent

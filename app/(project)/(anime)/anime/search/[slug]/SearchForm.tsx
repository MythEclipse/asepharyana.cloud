// components/SearchForm.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ButtonA from '@/components/ButtonA';

interface SearchFormProps {
  initialQuery: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ initialQuery }) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      router.push(`/anime/search/${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-6">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for anime..."
        className="w-64 rounded-none text-center px-6 py-3 text-blue-500 bg-transparent border border-blue-500 shadow-lg shadow-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
      />
      <ButtonA className='rounded-none'>Search</ButtonA>
    </form>
  );
};

export default SearchForm;

// components/SearchForm.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ButtonA from '@/components/button/ButtonA';

interface SearchFormProps {
  initialQuery: string;
  baseUrl: string;
  classname?: string;
  page?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ initialQuery, baseUrl, classname, page }) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`${baseUrl}/search/${encodeURIComponent(searchQuery.trim())}/${page || ''}`);
    }
  };

  return (
    <div className={classname || ''}>
      <form onSubmit={handleSearch} className="flex items-center space-x-4 mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for anime..."
          className="w-64 text-center px-6 py-3 text-blue-500 bg-transparent border border-blue-500 shadow-lg shadow-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        />
        <ButtonA type="submit" className="rounded-none">
          Search
        </ButtonA>
      </form>
    </div>
  );
};

export default SearchForm;

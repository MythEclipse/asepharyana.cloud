// app/anime/search/SearchComponent.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/anime/search/${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-6">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Search for anime..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchComponent;

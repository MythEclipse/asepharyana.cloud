import React from 'react';
import SearchComponent from '../../../components/Search';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SearchComponent />
      <div className="p-5">{children}</div>
    </>
  );
}

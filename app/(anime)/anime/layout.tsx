import { ReactNode } from 'react';
export default function Layout({ children, modal }: { children: ReactNode; modal: ReactNode }) {
  return (
    <>
      {children}
      <div className="mt-5 max-w-full px-3 pb-10 pt-56 sm:px-6 lg:px-8">{modal}</div>
    </>
  );
}

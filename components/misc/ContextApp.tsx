'use client';

import React, { createContext, useState, ReactNode } from 'react';

interface ContextAppType {
  lokasi: string;
  setLokasi: React.Dispatch<React.SetStateAction<string>>;
}

export const ContextApp = createContext<ContextAppType | undefined>(undefined);

const ContextAppProvider = ({ children }: { children: ReactNode }) => {
  const [lokasi, setLokasi] = useState('Jakarta');
  return (
    <ContextApp.Provider value={{ lokasi, setLokasi }}>
      {children}
    </ContextApp.Provider>
  );
};

export default ContextAppProvider;

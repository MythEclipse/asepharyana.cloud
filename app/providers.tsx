"use client";

import { QueryClientProvider } from 'react-query';
import queryClient from '../lib/queryClient';
import React from 'react';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default Providers;

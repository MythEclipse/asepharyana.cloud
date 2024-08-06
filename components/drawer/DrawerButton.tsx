// components/DrawerButton.tsx
'use client';

import React from 'react';
import { Button } from 'flowbite-react';
import { HiMenu } from 'react-icons/hi';

interface DrawerButtonProps {
  onOpen: () => void;
}

const DrawerButton: React.FC<DrawerButtonProps> = ({ onOpen }) => {
  return (
    <Button
      onClick={onOpen}
      color="blue"
      className="fixed bottom-4 right-4 z-50 p-3 rounded-full shadow-lg dark:bg-blue-500 dark:hover:bg-blue-600"
    >
      <HiMenu className="text-white" />
    </Button>
  );
};

export default DrawerButton;

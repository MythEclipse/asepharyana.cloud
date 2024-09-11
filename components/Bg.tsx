import React from 'react';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';

interface BackgroundBeamsWithCollisionDemoProps {
  children: React.ReactNode;
}

export default function BackgroundBeamsWithCollisionDemo({ children }: BackgroundBeamsWithCollisionDemoProps) {
  return <BackgroundBeamsWithCollision>{children}</BackgroundBeamsWithCollision>;
}

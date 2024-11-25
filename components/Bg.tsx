import React from 'react';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';

import { ReactNode } from 'react';

export default function BackgroundBeamsWithCollisionDemo({ children }: { children: ReactNode }) {
  return <BackgroundBeamsWithCollision>{children}</BackgroundBeamsWithCollision>;
}

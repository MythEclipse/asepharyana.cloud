import React from 'react';
import { FloatingDock } from '@/components/ui/floating-dock';

export default function FloatingDockDemo({ content }: any) {
  return <FloatingDock items={content} />;
}

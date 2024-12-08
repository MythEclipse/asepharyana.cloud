import React from 'react';
import { FloatingDock } from '@/components/ui/floating-dock';

interface FloatingDockDemoProps {
  content: Array<any>;
}

export default function FloatingDockDemo({ content }: FloatingDockDemoProps) {
  return <FloatingDock items={content} />;
}

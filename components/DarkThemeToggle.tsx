'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

interface ModeToggleProps {
  className?: string;
}

export default function ModeToggle({ className }: ModeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Ensure the component is mounted before rendering to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  // Avoid rendering until the component is mounted (client-side)
  if (!mounted) return null;

  return (
    <div className={className}>
      <Button variant="outline" size="icon" onClick={toggleTheme}>
        {resolvedTheme === 'dark' ? (
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}

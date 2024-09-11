import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Cek preferensi mode gelap dari media query
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handleMediaQueryChange = (e: { matches: boolean | ((prevState: boolean) => boolean) }) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
  }, []);

  return isDarkMode;
};

export default useDarkMode;

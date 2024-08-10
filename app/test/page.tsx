'use client';
import { useEffect, useState } from 'react';

const ScrapedPage = () => {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/anime');
        const result = await response.json();
        setHtmlContent(result.html);
      } catch (error) {
        console.error('Error fetching HTML content:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Scraped HTML Content</h1>
      <div dangerouslySetInnerHTML={{ __html: htmlContent || '<p>Loading...</p>' }} />
    </div>
  );
};

export default ScrapedPage;

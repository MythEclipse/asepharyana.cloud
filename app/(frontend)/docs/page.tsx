'use client';

import React, { useEffect, useState } from 'react';

export default function OpenApiDocsPage() {
  const [SwaggerUI, setSwaggerUI] = useState<null | React.ComponentType<any>>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('swagger-ui-react').then((mod) => {
        setSwaggerUI(mod.default as React.ComponentType<any>);
      });
    }
  }, []);

  if (!SwaggerUI) return <div>Loading...</div>;

  return <SwaggerUI url="https://asepharyana.cloud/OpenApi.yaml" displayOperationId />;
}

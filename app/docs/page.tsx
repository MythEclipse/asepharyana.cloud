export const metadata = {
  title: {
    default: 'Dokumentasi API',
    template: '%s - Dokumentasi API'
  },
  description: 'Dokumentasi API untuk digunakan secara gratis',
  keywords: 'nextjs, api, free'
};

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import './custom.css';
import OpenApiJson from '../api/docs/OpenApiJson';

export default function OpenApiDocsPage() {
  return <SwaggerUI spec={OpenApiJson} displayOperationId={true} />;
}

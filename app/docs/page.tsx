'use client';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import './custom.css';
import OpenApiJson from '../api/docs/OpenApiJson';

export default function OpenApiDocsPage() {
  return <SwaggerUI spec={OpenApiJson} displayOperationId={true} />;
}

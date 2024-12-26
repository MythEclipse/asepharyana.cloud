export const metadata = {
  title: {
    default: 'Dokumentasi API',
    template: '%s - Dokumentasi API'
  },
  description: 'Dokumentasi API untuk digunakan secara gratis',
  keywords: 'nextjs, api, free'
};
import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import './custom.css';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const filePath = path.join(process.cwd(), 'public', 'OpenApi.yaml');
const OpenApiYaml = fs.readFileSync(filePath, 'utf8');
const OpenApiJson = yaml.load(OpenApiYaml);

const openApiSpec = OpenApiJson as Record<string, unknown>;

export default function OpenApiDocsPage() {
  return <SwaggerUI spec={openApiSpec} displayOperationId={true} />;
}

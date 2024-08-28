import { generateOpenApi } from '@ts-rest/open-api';
import { contract } from './contract';

export const OpenAPIV1 = generateOpenApi(contract, {
  info: {
    title: 'Freefire',
    version: '9.9.9',
    description: 'api gratis'
  },
  servers: [
    {
      url: 'https://asepharyana.my.id',
      description: 'Production'
    }
  ]
});

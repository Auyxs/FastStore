import { createData, getData, updateData, deleteData } from '../controllers/dataController.js';
import { verifyJwt } from '../utils/jwt.js'; 

const keyParamSchema = {
  params: {
    type: 'object',
    required: ['key'],
    properties: {
      key: { type: 'string', minLength: 1 },
    },
  },
};

export const dataRoutes = async (fastify, options) => {
  fastify.addHook('preValidation', verifyJwt);

  fastify.post('/data', {
    schema: {
      body: {
        type: 'object',
        required: ['key', 'data'],
        properties: {
          key: { type: 'string', minLength: 1 },
          data: {
            type: 'string',
            minLength: 8, 
            pattern: '^[A-Za-z0-9+/=]*$', 
          },
        },
      },
    },
    handler: createData
  });

  fastify.get('/data/:key', {
    schema: keyParamSchema,
    handler: getData
  });

  fastify.patch('/data/:key', {
    schema: keyParamSchema,
    handler: updateData
  });

  fastify.delete('/data/:key', {
    schema: keyParamSchema,
    handler: deleteData
  });
};

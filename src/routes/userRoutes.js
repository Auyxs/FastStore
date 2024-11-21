import { registerUser, loginUser, deleteUser } from '../controllers/userController.js';
import { verifyJwt } from '../utils/jwt.js';

const userSchema = {
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 8 },
    },
  },
};

export const userRoutes = async (fastify, options) => {
  fastify.post('/register', {
    schema: userSchema,
    handler: registerUser
  });

  fastify.post('/login', {
    schema: userSchema,
    handler: loginUser
  });

  fastify.delete('/delete', {
    schema: {
      body: {
        type: 'null',
      },
    },
    preValidation: [verifyJwt],
    handler: deleteUser
  });
};

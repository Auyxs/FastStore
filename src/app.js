import Fastify from 'fastify';
import { userRoutes } from './routes/userRoutes.js';
import { dataRoutes } from './routes/dataRoutes.js';

const fastify = Fastify({
  logger: true
})

fastify.register(userRoutes);
fastify.register(dataRoutes);

const start = async () => {
  try {
    await fastify.listen( {port: 3000} );
    console.log('Server started at http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

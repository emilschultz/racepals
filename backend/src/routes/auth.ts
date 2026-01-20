import { FastifyInstance } from 'fastify';
import { createUser } from '../services/auth-service.js';

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/signup', async (request, reply) => {
    const { email, password, displayName } = request.body as {
      email: string;
      password: string;
      displayName: string;
    };

    try {
      const user = await createUser(email, password, displayName);
      return { user };
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  });
}
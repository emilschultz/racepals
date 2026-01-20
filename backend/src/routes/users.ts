import { FastifyInstance } from 'fastify';
import { authenticateUser } from '../middleware/auth.js';
import { getUser } from '../services/user-service.js';

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/me', { preHandler: authenticateUser }, async (request) => {
    const uid = (request as any).user.uid;
    const user = await getUser(uid);
    return { user };
  });
}
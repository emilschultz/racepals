import { FastifyRequest, FastifyReply } from 'fastify';
import { auth } from '../config/firebase.js';

export async function authenticateUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const authHeader = request.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.status(401).send({ error: 'Unauthorized' });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(token);
    
    // Attach user to request
    (request as any).user = decodedToken;
  } catch (error) {
    return reply.status(401).send({ error: 'Invalid token' });
  }
}
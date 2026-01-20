import { FastifyInstance } from 'fastify';
import { authenticateUser } from '../middleware/auth.js';
import { createGroup, getGroup, joinGroupByInviteCode } from '../services/group-service.js';

export default async function groupRoutes(fastify: FastifyInstance) {
  fastify.post('/', { preHandler: authenticateUser }, async (request) => {
    const { name, race } = request.body as { name: string; race: string };
    const uid = (request as any).user.uid;

    const group = await createGroup(name, race, uid);
    return { group };
  });

  fastify.get('/:id', { preHandler: authenticateUser }, async (request) => {
    const { id } = request.params as { id: string };
    const group = await getGroup(id);
    return { group };
  });

  fastify.post('/join', { preHandler: authenticateUser }, async (request, reply) => {
    const { inviteCode } = request.body as { inviteCode: string };
    const uid = (request as any).user.uid;

    const group = await joinGroupByInviteCode(inviteCode, uid);
    
    if (!group) {
      return reply.status(404).send({ error: 'Invalid invite code' });
    }

    return { group };
  });
}
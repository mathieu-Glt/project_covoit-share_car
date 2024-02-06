import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

function noFaviconHandler(req: FastifyRequest, reply: FastifyReply) {
  reply.code(404).send('');
}

const routeFavicon = (server: FastifyInstance<Server, IncomingMessage, ServerResponse>) => {
  server.get('/favicon.ico', noFaviconHandler);
};

export default routeFavicon;

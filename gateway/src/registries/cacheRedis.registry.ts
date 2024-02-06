import { FastifyRequestWithContext } from '@/definitions';
import { getEnv } from '@/utils/validateEnv';
import { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

const cacheRedisRegistry = (server: FastifyInstance<Server, IncomingMessage, ServerResponse>) => {
  server.register(require('@fastify/redis'), { host: getEnv<string>('REDIS_HOST', '127.0.0.1') });
  server.addHook('onRequest', async (request: FastifyRequestWithContext) => {
    request.redis = server.redis;
  });
};

export default cacheRedisRegistry;

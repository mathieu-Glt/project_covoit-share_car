import { getEnv } from '@/utils/validateEnv';
import { FastifyInstance } from 'fastify';
import { readFileSync } from 'fs';
import { Server, IncomingMessage, ServerResponse } from 'http';
import path from 'path';

/**
 * DOCS : https://github.com/fastify/fastify-jwt
 */
const jwtRegistry = (server: FastifyInstance<Server, IncomingMessage, ServerResponse>) => {
  server.register(require('@fastify/jwt'), {
    secret: getEnv<string>('JWT_ACCESS_SECRET', ''),
    decode: { complete: false },
    sign: {
      iss: getEnv<string>('JWT_ISS', 'api.alt.bzh'),
    },
    verify: { allowedIss: getEnv<string>('JWT_ISS', 'api.alt.bzh') },
    cookie: {
      cookieName: 'token',
      signed: false,
    },
  });

  server.register(require('@fastify/cookie'));
};

export default jwtRegistry;

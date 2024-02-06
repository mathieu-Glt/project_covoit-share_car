'use strict';
process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';
import { logger } from '@utils/logger';
import { getEnv } from '@utils/validateEnv';
import { fastify, FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import fastifyHttpProxy from '@fastify/http-proxy';
import { FastifyHttpProxyAlt, NatsProxyAlt, ProxyType, ServerProxyList } from './definitions';
import { NatsTransport } from './utils/nats/nats';
import jwtRegistry from './registries/jwt.registry';
import routeFavicon from './routes/favicon';
import { CACHE_DEFAULT_TTL } from './definitions/cache';

class App {
  public server: FastifyInstance<Server, IncomingMessage, ServerResponse>;
  public port: string | number;
  public env: string;
  public NatsServer = new NatsTransport();
  public verboseRoutes = [];

  constructor(routes: Array<ServerProxyList>) {
    this.server = fastify({
      logger: getEnv<string>('FASTIFY_LOGGER', "false") === "true" ? true : false,
      trustProxy: true
    });
    this.port = getEnv<number>('PORT', 3000);
    this.env = getEnv<string>('NODE_ENV', 'development');

    this.__registerDependencies();

    this.register(routes);
    this.server.register(require('@fastify/multipart'));

    this.listen();

    this.displayAllRoutes();
  }

  register(routes: Array<ServerProxyList>): void {
    routes.forEach(upstreamRoute => {
      upstreamRoute.routes.forEach(route => {
        switch (route.type) {
          case ProxyType.HTTP:
            this.__setVerboseHttpRoute(route);
            route.prefix = `${getEnv<string>('GATEWAY_PREFIX', '/api/v1/')}${route.prefix}`;
            this.server.register(fastifyHttpProxy, route);
            break;
          case ProxyType.NATS:
            this.__fastifyNatsRoute(route);
            this.__setVerboseNatsRoute(route);
            break;
        }
      });
    });
  }

  displayAllRoutes(): void {
    console.log('USE GLOBAL PREFIX: ', getEnv<string>('GATEWAY_PREFIX', '/api/v1/'))
    // console.table(this.verboseRoutes);
  }

  private __setVerboseHttpRoute(route: FastifyHttpProxyAlt): void {
    this.verboseRoutes.push({
      httpMethod: route.rules.split('-->')[0],
      middlewares: route.rules.split('-->')[1] == 'open' ? 'NO' : route.rules.split('-->')[1],
      comment: route.comment,
      origin: route.prefix,
      type: 'http',
      'rewrite/command': route.rewritePrefix,
    });
  }

  private __setVerboseNatsRoute(route: NatsProxyAlt): void {
    this.verboseRoutes.push({
      httpMethod: route.rules.split('-->')[0],
      middlewares: route.rules.split('-->')[1] == 'open' ? 'NO' : route.rules.split('-->')[1],
      comment: route.comment,
      origin: route.prefix,
      type: 'nats',
      'rewrite/command': route.command,
    });
  }

  private __fastifyNatsRoute(route: NatsProxyAlt) {
    this.server.route({
      method: route.httpMethods,
      url: `${getEnv<string>('GATEWAY_PREFIX', '/api/v1/')}${route.prefix}`,
      handler: this.NatsServer.processing,
      config: {
        command: route.command,
        cacheExpire: route.cacheExpire || CACHE_DEFAULT_TTL,
        postHandler: route?.postHandler,
        rawBody: route?.rawBody
      },
      preHandler: route.preHandler,
    });
  }

  private __registerDependencies() {
    this.server.register(require('@fastify/cors'), {
      origin: '*',
      exposeHeaders: ['Etag']
    });
    this.server.register(require('@fastify/helmet'), { global: true });
    //cacheRedisRegistry(this.server);
    jwtRegistry(this.server);
    routeFavicon(this.server);
    this.server.register(require('fastify-healthcheck'), { exposeUptime: getEnv<string>('NODE_ENV', 'development') ? true : false });
    this.server.register(require('fastify-raw-body'), {
      field: 'rawBody', // change the default request.rawBody property name
      global: false, // add the rawBody to every request. **Default true**
      encoding: 'utf8', // set it to false to set rawBody as a Buffer **Default utf8**
      runFirst: true, // get the body before any preParsing hook change/uncompress it. **Default false**
      routes: [] // array of routes, **`global`** will be ignored, wildcard routes not supported
    })
  }

  async listen() {
    try {
      await this.server.listen({ port: this.port as number, host: '0.0.0.0' });
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    } catch (error) {
      console.log("🚀 ~ file: app.ts ~ line 118 ~ App ~ listen ~ error", error)
    }

  }

  public getServer(): FastifyInstance<Server, IncomingMessage, ServerResponse> {
    return this.server;
  }
}

export default App;

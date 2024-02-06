import { FastifyHttpProxyAlt, FastifyRequestWithContext, NatsProxyAlt, ProxyType } from '@/definitions'
import { FastifyReply } from 'fastify'

export const MsAuthAdminRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
    {
        type: ProxyType.NATS,
        httpMethods: ['GET'],
        comment: 'Get all admin users by App',
        rules: 'GET-->open',
        prefix: 'usersAd',
        command: 'INDEX_ADMIN_BY_APP',
        //cacheExpire: CACHE_HOUR_TTL,
        // async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
        //   await applyMiddleware(
        //     request, reply,
        //[JwtAbilityMiddleware, ['read', 'admin']],
        //[cacheRedisMiddleware],
        //   )
        // },
    },
    {
        type: ProxyType.NATS,
        httpMethods: ['GET'],
        comment: 'get an admin by id',
        rules: 'GET-->open',
        prefix: 'usersAd/:id',
        command: 'GET_ADMIN_BY_ID',
        //cacheExpire: CACHE_HOUR_TTL,
        // async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
        //   await applyMiddleware(
        //     request, reply,
        //[JwtAbilityWithConditionsMiddleware, ['read', 'admin']],
        //[cacheRedisMiddleware],
        //   )
        // },
    },
    {
        type: ProxyType.NATS,
        httpMethods: ['POST'],
        comment: 'update an admin by id',
        rules: 'POST-->open',
        prefix: 'usersAd/:id',
        command: 'UPDATE_ADMIN',
        // async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
        //   await applyMiddleware(
        //     request, reply,
        //[JwtAbilityMiddleware, ['update', 'admin']}]
        //   )
        // },
    },
    {
        type: ProxyType.NATS,
        httpMethods: ['POST'],
        comment: 'update an admin by id',
        rules: 'POST-->open',
        prefix: 'usersAd/me',
        command: 'UPDATE_ADMIN_ME',
        // async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
        //   await applyMiddleware(
        //     request, reply,
        //     [JwtAbilityMiddleware, ['update', 'admin']]
        //   )
        // },
    },
    {
        type: ProxyType.NATS,
        httpMethods: ['POST'],
        comment: 'Create admin endpoint',
        rules: 'POST-->open',
        prefix: 'usersAd',
        command: 'CREATE_ADMIN',
        // async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
        /* await applyMiddleware(
          request, reply,
          [JwtAbilityMiddleware, ['create', 'admin']]
        ) */
        // },
    },
    {
        type: ProxyType.NATS,
        httpMethods: ['DELETE'],
        comment: 'delete an admin',
        rules: 'DELETE-->open',
        prefix: 'usersAd/:id',
        command: 'DELETE_ADMIN',
        // async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
        //   await applyMiddleware(
        //     request, reply,
        //     [JwtAbilityMiddleware, ['delete', 'admin']]
        //   )
        // },
    },
]

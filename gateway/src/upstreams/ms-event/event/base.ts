/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyHttpProxyAlt, FastifyRequestWithContext, NatsProxyAlt, ProxyType } from '@/definitions'
import { FastifyReply } from 'fastify'

import JwtMiddleware from '@/middlewares/Jwt.Middleware'

export const MsEventRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
  {
    //GET EVENT BY ID
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'get event by ID',
    rules: 'GET-->open',
    prefix: 'event/:id',
    command: 'GET_EVENT_BY_ID',
    // async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
    //   await JwtMiddleware(request, reply)
    //   _done()
    // },
  },
  {
    //GET LIST OF ALL EVENTS
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'show all events',
    rules: 'GET-->open',
    prefix: 'events',
    command: 'INDEX_EVENTS',
  },
  {
    //GET LIST OF ALL EVENTS BY GROUP
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'show all events by group ID ',
    rules: 'GET-->open',
    prefix: 'events/byGroup/:id',
    command: 'INDEX_EVENTS_BY_GROUP',
    // async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
    //   await JwtMiddleware(request, reply)
    //   _done()
    // },
  },
  {
    //GET LIST OF ALL EVENTS BY ASSO
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'show all events by asso ID ',
    rules: 'GET-->open',
    prefix: 'events/byAsso/:id',
    command: 'INDEX_EVENTS_BY_ASSO',
    // async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
    //   await JwtMiddleware(request, reply)
    //   _done()
    // },
  },
  {
    //GET LIST OF ALL EVENTS
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'show all events by USER ID ',
    rules: 'GET-->open',
    prefix: 'events/byUser/:id',
    command: 'INDEX_EVENTS_BY_USER',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
      await JwtMiddleware(request, reply)
      _done()
    },
  },

  { //CREATE NEW EVENT
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'create event',
    rules: 'POST-->open',
    prefix: 'event/create',
    command: 'CREATE_EVENT',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
      await JwtMiddleware(request, reply)
      _done()
    },
  },
  {
    //UPDATE EVENT BY ID
    type: ProxyType.NATS,
    httpMethods: ['PUT'],
    comment: 'update event by id',
    rules: 'PUT-->open',
    prefix: 'event/update/:id',
    command: 'UPDATE_EVENT',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
      await JwtMiddleware(request, reply)
      _done()
    },
  },
  { //DELETE EVENT BY ID
    type: ProxyType.NATS,
    httpMethods: ['DELETE'],
    comment: 'delete an event',
    rules: 'DELETE-->open',
    prefix: 'event/delete/:id',
    command: 'DELETE_EVENT',
    async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
      await JwtMiddleware(request, reply)
      _done()
    },
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'recup les events d un user par son role user',
    rules: 'GET-->open',
    prefix: 'event/role/user/:id',
    command: 'INDEX_EVENT_BY_ROLE_USER',
  },
  {
    // get all event admin
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'recup les event d un user par son role user admin',
    rules: 'GET-->open',
    prefix: 'event/role/admin/:id',
    command: 'INDEX_EVENT_BY_ROLE_ADMIN',
  },
]

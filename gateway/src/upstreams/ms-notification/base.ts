import { FastifyHttpProxyAlt, FastifyRequestWithContext, NatsProxyAlt, ProxyType } from '@/definitions'
import { FastifyReply } from 'fastify'
import config from 'config'

export const MsNotificationBasesRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'test notification',
    rules: 'POST-->open',
    prefix: 'email',
    command: 'SEND_EMAIL',
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'creation de compte notification',
    rules: 'POST-->open',
    prefix: 'email/creationAccount',
    command: 'SEND_EMAIL_CREATION_ACCOUNT',
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'evenement modifié notification',
    rules: 'POST-->open',
    prefix: 'email/eventEdited',
    command: 'SEND_EMAIL_EVENT_EDITED',
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'forgot password',
    rules: 'POST-->open',
    prefix: 'email/forgort-pw',
    command: 'SEND_EMAIL_FORGOT_PASSWORD',
  },
]

import { FastifyHttpProxyAlt, NatsProxyAlt } from '@/definitions'
import { MsEventRoutes } from './base'

export const EventRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
    ...MsEventRoutes
];


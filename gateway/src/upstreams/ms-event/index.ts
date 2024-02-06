import { FastifyHttpProxyAlt, NatsProxyAlt } from '@/definitions'
import { EventRoutes } from './event'
import { RequestRoutes } from './request'

export const MsEventRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
    ...EventRoutes,
    ...RequestRoutes
];


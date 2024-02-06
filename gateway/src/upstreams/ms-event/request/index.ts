import { FastifyHttpProxyAlt, NatsProxyAlt } from '@/definitions'
import { MsRequestRoutes } from './base'

export const RequestRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
    ...MsRequestRoutes
]

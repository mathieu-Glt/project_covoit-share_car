import { FastifyHttpProxyAlt, NatsProxyAlt } from '@/definitions'
import { MsAuthRoutes } from './base'

export const AuthenticationRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
    ...MsAuthRoutes
]

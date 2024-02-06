import { FastifyHttpProxyAlt, NatsProxyAlt } from '@/definitions'
import { MsAuthAdminRoutes } from './base'

export const AdminRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
    ...MsAuthAdminRoutes
]

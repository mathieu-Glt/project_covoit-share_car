import { FastifyHttpProxyAlt, NatsProxyAlt } from '@/definitions'
import { AuthenticationRoutes } from './auth'
import { AdminRoutes } from './admin'
import UserRoutes from './user'


export const MsAuthenticationRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
    ...UserRoutes,
    ...AuthenticationRoutes,
    ...AdminRoutes
];


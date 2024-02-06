import { FastifyHttpProxyAlt, NatsProxyAlt } from '@/definitions'
import { MsAuthUserRoutes } from './base'
const UserRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
    // ...UserAbilitiesRoutes,
    // ...UserRoleRoutes,
    // ...UserStatusRoutes,
    // ...UserPasswordRoutes,
    // ...UserMigrationRoutes,
    ...MsAuthUserRoutes,
    // ...UserClientRoutes,
]
export default UserRoutes

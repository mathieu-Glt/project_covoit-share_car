import { FastifyHttpProxyAlt, NatsProxyAlt } from '@/definitions'
import RelationRoutes from './relation'
import GroupRoutes from './group'
import AssociationRoutes from './asso'

export const MsAssoGroupeRelationRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
    ...AssociationRoutes,
    ...GroupRoutes,
    ...RelationRoutes
]

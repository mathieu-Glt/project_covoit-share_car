import { FastifyHttpProxyAlt, NatsProxyAlt } from '@/definitions'
import { MsRelationRoutes } from './base'

const RelationRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
    ...MsRelationRoutes
]

export default RelationRoutes

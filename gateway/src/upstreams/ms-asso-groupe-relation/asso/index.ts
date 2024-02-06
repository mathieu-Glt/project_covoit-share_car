import { FastifyHttpProxyAlt, NatsProxyAlt } from '@/definitions'
import { MsAssociationRoutes } from './base'

export const AssociationRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
    ...MsAssociationRoutes
]
export default AssociationRoutes

import { FastifyHttpProxyAlt, NatsProxyAlt } from '@/definitions'
import { MsGroupRoutes } from './base'

export const MsGroupe: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [...MsGroupRoutes]
export default MsGroupe

import { FastifyHttpProxyAlt, NatsProxyAlt } from '@/definitions';
import { MsNotificationBasesRoutes } from './base';

export const MsNotification: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
  ...MsNotificationBasesRoutes
];

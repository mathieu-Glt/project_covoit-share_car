/* eslint-disable prettier/prettier */
process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import validateEnv from '@utils/validateEnv';
import { MsNotification } from './upstreams/ms-notification';
import { MsAuthenticationRoutes } from './upstreams/ms-authentication'
import { MsEventRoutes } from './upstreams/ms-event'
import { MsAssoGroupeRelationRoutes } from './upstreams/ms-asso-groupe-relation'

validateEnv();

try {
  new App([
    { ms: 'ms-event', routes: MsEventRoutes },
    { ms: 'ms-notification', routes: MsNotification },
    { ms: 'ms-authentication', routes: MsAuthenticationRoutes },
    { ms: 'ms-asso-groupe-relation', routes: MsAssoGroupeRelationRoutes },

  ]);

} catch (e) {
  console.log(e)
}

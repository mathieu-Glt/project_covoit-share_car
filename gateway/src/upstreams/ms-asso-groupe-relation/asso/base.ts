import { FastifyHttpProxyAlt, NatsProxyAlt, ProxyType } from '@/definitions';

export const MsAssociationRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'recup une asso par son nom',
    rules: 'GET-->open',
    prefix: 'association/ByName/:name',
    command: 'GET_ASSOCIATION_BY_NAME',
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'recup all association',
    rules: 'GET-->open',
    prefix: 'associations',
    command: 'INDEX_ASSOCIATIONS',
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'recup une asso par son id',
    rules: 'GET-->open',
    prefix: 'association/:id',
    command: 'GET_ASSOCIATION_BY_ID',
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'recup plusieur asso par son id',
    rules: 'GET-->open',
    prefix: 'association/all/:id',
    command: 'GET_ALL_ASSOCIATION_BY_ID',
  },

  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'recup les asso d un user par son ID',
    rules: 'GET-->open',
    prefix: 'asso/user/:id',
    command: 'INDEX_ASSO_BY_USER',
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'recup les asso d un user par son role user',
    rules: 'GET-->open',
    prefix: 'asso/role/user/:id',
    command: 'INDEX_ASSO_BY_ROLE_USER',
  },
  {
    // get all associations admin
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'recup les asso d un user par son role user admin',
    rules: 'GET-->open',
    prefix: 'asso/role/admin/:id',
    command: 'INDEX_ASSO_BY_ROLE_ADMIN',
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['POST'],
    comment: 'creation asso rattaché à un user id',
    rules: 'POST-->open',
    prefix: 'association/create/byUser/:id',
    command: 'CREATE_ASSOCIATION',
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['PUT'],
    comment: 'modification d une asso',
    rules: 'PUT-->open',
    prefix: 'association/update/:id',
    command: 'UPDATE_ASSOCIATION',
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['DELETE'],
    comment: 'suppression d une association',
    rules: 'DELETE-->open',
    prefix: 'association/delete/:id',
    command: 'DELETE_ASSOCIATION',
  },

];

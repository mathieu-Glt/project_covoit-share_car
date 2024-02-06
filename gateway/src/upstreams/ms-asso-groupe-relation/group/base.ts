import { FastifyHttpProxyAlt, NatsProxyAlt, ProxyType } from '@/definitions'

export const MsGroupRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
    {
      type: ProxyType.NATS,
      httpMethods: ['GET'],
      comment: 'recup un groupe par son ID',
      rules: 'GET-->open',
      prefix: 'group/:id',
      command: 'GET_GROUP_BY_ID',
    },
    {
      type: ProxyType.NATS,
      httpMethods: ['GET'],
      comment: 'recup all group',
      rules: 'GET-->open',
      prefix: 'groups',
      command: 'INDEX_GROUPS',
    },
    {
      type: ProxyType.NATS,
      httpMethods: ['POST'],
      comment: 'création d un groupe',
      rules: 'POST-->open',
      prefix: 'group/create',
      command: 'CREATE_GROUP',
    },
    {
      //MODIFICATION D UN GROUPE
      type: ProxyType.NATS,
      httpMethods: ['PUT'],
      comment: 'update-group',
      rules: 'PUT-->open',
      prefix: 'group/update/:id',
      command: 'UPDATE_GROUP',
    },

    {
      type: ProxyType.NATS,
      httpMethods: ['DELETE'],
      comment: 'suppression d un groupe par son ID',
      rules: 'DELETE-->open',
      prefix: 'group/delete/:id',
      command: 'DELETE_GROUP',
    },

    {
      type: ProxyType.NATS,
      httpMethods: ['GET'],
      comment: 'récup tous les groupes ID d une asso',
      rules: 'GET-->open',
      prefix: 'groups/ByAsso/:id',
      command: 'GET_GROUPS_BY_ASSO_ID',
    },
    {
      type: ProxyType.NATS,
      httpMethods: ['GET'],
      comment: 'recupere tous les groupes auxquels appartient un user',
      rules: 'GET-->open',
      prefix: 'groups/ByAsso/ByUser/:id',
      command: 'GET_GROUPS_BY_USER_ID',
    },
    {
      type: ProxyType.NATS,
      httpMethods: ['POST'],
      comment: 'rajoute un enfant à un groupe',
      rules: 'POST-->open',
      prefix: 'group/addKid/byGroup/:id',
      command: 'ADD_KID_TO_GROUP',
    },
    {
      type: ProxyType.NATS,
      httpMethods: ['PUT'],
      comment: 'supprime un enfant d un groupe',
      rules: 'PUT-->open',
      prefix: 'group/removeKid/ByGroup/:id',
      command: 'REMOVE_KID_FROM_GROUP',
    },
    {
      type: ProxyType.NATS,
      httpMethods: ['GET'],
      comment: 'recup tous les noms des groupes participants à un event',
      rules: 'GET-->open',
      prefix: 'group/name/ByEvent/:id',
      command: 'GET_GROUPNAME_BY_EVENTID',
    },

    {
      type: ProxyType.NATS,
      httpMethods: ['GET'],
      comment: 'recup tous les noms6+id des groupes appartenant à une asso',
      rules: 'GET-->open',
      prefix: 'grouplist/ByAsso/:id',
      command: 'GET_GROUPDETAILS_BY_ASSO',
    },
]

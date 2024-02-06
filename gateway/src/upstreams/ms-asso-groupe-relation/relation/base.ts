import { FastifyHttpProxyAlt, FastifyRequestWithContext, NatsProxyAlt, ProxyType } from '@/definitions'
import { FastifyReply } from 'fastify'
import config from 'config'

export const MsRelationRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
    {
        // get relation by type
        type: ProxyType.NATS,
        httpMethods: ['GET'],
        comment: 'relation by type',
        rules: 'GET-->open',
        prefix: 'relation/ByType/:type',
        command: 'GET_RELATION_BY_TYPE',
    },
    {
        // get all relations
        type: ProxyType.NATS,
        httpMethods: ['GET'],
        comment: 'read all relations',
        rules: 'GET-->open',
        prefix: 'relations',
        command: 'INDEX_RELATIONS',
    },
    {
        // get by id relation
        type: ProxyType.NATS,
        httpMethods: ['GET'],
        comment: 'relation by id',
        rules: 'GET-->open',
        prefix: 'relation/:id',
        command: 'GET_RELATION_BY_ID',
    },
    {
        // create relation
        type: ProxyType.NATS,
        httpMethods: ['POST'],
        comment: 'create-relation',
        rules: 'POST-->open',
        prefix: 'relation/create',
        command: 'CREATE_RELATION',
    },
    {
        // update relation
        type: ProxyType.NATS,
        httpMethods: ['PUT'],
        comment: 'update-relation',
        rules: 'PUT-->open',
        prefix: 'relation/update/:id',
        command: 'UPDATE_RELATION',
    },
    {
        // delete relation
        type: ProxyType.NATS,
        httpMethods: ['DELETE'],
        comment: 'delete-relation',
        rules: 'DELETE-->open',
        prefix: 'relation/delete/:id',
        command: 'DELETE_RELATION',
    },

    {
        // get all relations
        type: ProxyType.NATS,
        httpMethods: ['GET'],
        comment: 'read all relations',
        rules: 'GET-->open',
        prefix: 'relations/ByAsso/:id',
        command: 'INDEX_RELATIONS_BY_ASSO',
    },

    {
        // get by USER id
        type: ProxyType.NATS,
        httpMethods: ['GET'],
        comment: 'relation by USER id',
        rules: 'GET-->open',
        prefix: 'relation/ByUser/:id',
        command: 'GET_RELATION_BY_USER',
    },

];

import { FastifyHttpProxyAlt, FastifyRequestWithContext, NatsProxyAlt, ProxyType } from '@/definitions'
import JwtMiddleware from '@/middlewares/Jwt.Middleware'
import { FastifyReply } from 'fastify'

export const MsRequestRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
    {
      //RECUPERATION D UNE ANNONCE(REQUEST) PAR SON ID
      type: ProxyType.NATS,
      httpMethods: ['GET'],
      comment: 'get request by ID',
      rules: 'GET-->open',
      prefix: 'request/:id',
      command: 'GET_REQUEST_BY_ID',
    },
    {
      //RECUPERATION DE TOUTES LES ANNONCES(REQUESTS) D UN USER
      type: ProxyType.NATS,
      httpMethods: ['GET'],
      comment: 'find all user requests',
      rules: 'GET-->open',
      prefix: 'requests/user/:id',
      command: 'REQUESTS_BY_USER_ID',
    },
    {
      //RECUP TTES LES ANNONCES PUBLIEES DANS UNE ASSO
      type: ProxyType.NATS,
      httpMethods: ['GET'],
      comment: 'get request by  asso ID',
      rules: 'GET-->open',
      prefix: 'requests/asso/:id',
      command: 'REQUESTS_BY_ASSO',
    },
    {
      //RECUP TTES LES ANNONCES PUBLIEES DANS UN EVENT
      type: ProxyType.NATS,
      httpMethods: ['GET'],
      comment: 'get request by event ID',
      rules: 'GET-->open',
      prefix: 'requests/event/:id',
      command: 'REQUESTS_BY_EVENT',
    },
    {
      //RECUP LA LISTE DE TTES LES ANNONCES DU SITE
      type: ProxyType.NATS,
      httpMethods: ['GET'],
      comment: 'show all requests',
      rules: 'GET-->open',
      prefix: 'requests',
      command: 'INDEX_REQUESTS',
    },
    {
      //CREATION D UNE NOUVELLE ANNONCE(REQUEST) SUR UN EVENT
      type: ProxyType.NATS,
      httpMethods: ['POST'],
      comment: 'create request',
      rules: 'POST-->open',
      prefix: 'request/create/:id',
      command: 'CREATE_REQUEST',
      async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
        // console.log(request);
        await JwtMiddleware(request, reply)
        _done()
    },

    },
    {
      //MODIFICATION D UNE ANNONCE(REQUEST)
      type: ProxyType.NATS,
      httpMethods: ['PUT'],
      comment: 'update request by id',
      rules: 'PUT-->open',
      prefix: 'request/update/:id',
      command: 'UPDATE_REQUEST',
      async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
        // console.log(request);
        await JwtMiddleware(request, reply)
        _done()
    },
    },
    {
      //SUPPRESSION D UNE ANNONCE(REQUEST)
      type: ProxyType.NATS,
      httpMethods: ['DELETE'],
      comment: 'delete an request',
      rules: 'DELETE-->open',
      prefix: 'request/delete/:id',
      command: 'DELETE_REQUEST',
    },
    {
      //CREATE EXCHANGE BY REQUEST ID A verifier !!!!
      type: ProxyType.NATS,
      httpMethods: ['POST'],
      comment: 'post exchange request id',
      rules: 'POST-->open',
      prefix: 'create/exchange/request/:id',
      command: 'CREATE_RESPONSE_REQUEST_ID',
    },
     {//REPONSE A UNE ANNONCE PUBLIEE
      type: ProxyType.NATS,
      httpMethods: ['POST'],
      comment: ' create an exchange on a request ',
      rules: 'POST-->open',
      prefix: 'exchange/create/:id',
      command: 'CREATE_EXCHANGE_TO_REQUEST_ID',
    },

    {//RECUPERATION DES REPONSES AUX ANNONCES QU UN USER A FAITE PAR SON ID
      type: ProxyType.NATS,
      httpMethods: ['GET'],
      comment: 'get exchange by user id ',
      rules: 'GET-->open',
      prefix: 'exchange/byUser/:id',
      command: 'EXCHANGE_BY_USER',
    },
    // A verifier !!!!
    {// RECUPERATION DE TTES LES EXCHANGES EFFECTUEES SUR UNE ANNONCE(REQUEST)
      type: ProxyType.NATS,
      httpMethods: ['GET'],
      comment: 'get exchanges by request ID',
      rules: 'GET-->open',
      prefix: 'exchange/byRequest/:id',
      command: 'EXCHANGES_BY_REQUEST',
    },
    {// RECUPERATION D UN EXCHANGE  PAR SON ID
      type: ProxyType.NATS,
      httpMethods: ['GET'],
      comment: 'get exchange by its ID',
      rules: 'GET-->open',
      prefix: 'exchange/:id',
      command: 'EXCHANGE_REQUEST_BY_ID',
    },


    {//RECUPERATION DES ANNONCES AUXQUELLES UN USER A REPONDU PAR SON USER ID
      type: ProxyType.NATS,
      httpMethods: ['GET'],
      comment: 'get requests by exchange by user',
      rules: 'GET-->open',
      prefix: 'requests/byExchange/ByUser/:id',
      command: 'REQUESTS_BY_EXCHANGE_BY_USER',
    },
    {//POST : REPONSE A UN EXCHANGE SUR UNE ANNONCE PUBLIEE
      type: ProxyType.NATS,
      httpMethods: ['POST'],
      comment: 'reply to exchange request',
      rules: 'POST-->open',
      prefix: 'create/exchange/reply/ByExchange/:id', // EXCHANGE ID
      command: 'REPLY_TO_EXCHANGE',
    },
    {//RECUP DE L ANNONCE A PARTIR D UN EXCHANGE ID
      type: ProxyType.NATS,
      httpMethods: ['GET'],
      comment: 'get request by exchange ID ',
      rules: 'GET-->open',
      prefix: 'request/byExchange/:id',
      command: 'GET_REQUEST_BY_EXCHANGE',
  },
     {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'recup les requests d un user par son type propose',
    rules: 'GET-->open',
    prefix: 'request/type/propose/user/:id',
    command: 'INDEX_REQUEST_BY_TYPE_PROPOSE',
  },
  {
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'recup les requests d un user par son type demande',
    rules: 'GET-->open',
    prefix: 'request/type/demande/user/:id',
    command: 'INDEX_REQUEST_BY_TYPE_DEMANDE',
  },
]

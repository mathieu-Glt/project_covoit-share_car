/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyHttpProxyAlt, FastifyRequestWithContext, NatsProxyAlt, ProxyType } from '@/definitions';
import { FastifyReply } from 'fastify';
import JwtMiddleware from '@/middlewares/Jwt.Middleware'
import JwtRefreshMiddleware from '@/middlewares/Jwt.refresh.Middleware';

export const MsAuthRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [

    { // SIGNIN
        type: ProxyType.NATS,
        httpMethods: ['POST'],
        comment: 'connection de l utilisateur',
        rules: 'POST-->open',
        prefix: 'auth/login',
        command: 'LOGIN',
    },
    {
        // LOGOUT
        type: ProxyType.NATS,
        httpMethods: ['GET'],
        comment: 'logout',
        rules: 'GET-->open',
        prefix: 'auth/logout',
        command: 'LOGOUT',
        async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
            // console.log(request);
            await JwtMiddleware(request, reply)
            _done()
        },
    },
    {
        //CREATION PROFILE PARENT ADMIN
        type: ProxyType.NATS,
        httpMethods: ['POST'],
        comment: 'nouvelle inscription d un parent admin',
        rules: 'POST-->open',
        prefix: 'auth/register',
        command: 'REGISTER_PARENT_ADMIN',
    },

    {
      // PARENT ADMIN POUR CREER UNE ASSO
      type: ProxyType.NATS,
      httpMethods: ['GET'],
      comment: 'form parent creation asso',
      rules: 'GET-->open',
      prefix: 'auth/create-asso/:token',
      command: 'CONFIRM_PROFILE_PARENT_ADMIN',
      // async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
      //   // console.log(request);
      //   await JwtMiddleware(request, reply);
      //   _done();
      // },
    },
    {
        //RENVOI EMAIL LORS OUBLI PASSWORD
        type: ProxyType.NATS,
        httpMethods: ['POST'],
        comment: 'forgot password',
        rules: 'POST-->open',
        prefix: 'auth/forgot-password',
        command: 'FORGOT_PASSWORD',
    },
    { // COMMANDE CHECK KEY TOKEN NEW PASSWORD
        type: ProxyType.NATS,
        httpMethods: ['POST'],
        comment: 'forgot password',
        rules: 'POST-->open',
        prefix: 'auth/new-password/:token',
        command: 'NEW_PASSWORD',
    },
    { // COMMANDE CREATE NEW PASSWORD
        type: ProxyType.NATS,
        httpMethods: ['PUT'],
        comment: 'forgot password',
        rules: 'POST-->open',
        prefix: 'auth/newpassword/:userId',
        command: 'NEW_PASSWORD_USER',
    },

    // et si le token est périmé coté front ? le middleware JwtMiddleware trouvera l'user qd même ?
    {
        // REFRESH TOKEN
        type: ProxyType.NATS,
        httpMethods: ['GET'],
        comment: 'refresh-token',
        rules: 'POST-->open',
        prefix: 'auth/refresh-token',
        command: 'REFRESHTOKEN',
        async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
          await JwtMiddleware(request, reply)
            _done()
        },
    },
    {
        //VERIFY TOKEN IN EMAIL LINK
        type: ProxyType.NATS,
        httpMethods: ['GET'],
        comment: 'verify token',
        rules: 'GET-->open',
        prefix: 'auth/verify-email/:token',
        command: 'VERIFY_EMAIL_TOKEN',
    },

    {
        // CONFIRM PARENT MEMBERSHIP
        type: ProxyType.NATS,
        httpMethods: ['GET'],
        comment: 'form parent confirm profile',
        rules: 'GET-->open',
        prefix: 'auth/confirm-profile/:token',
        command: 'CONFIRM_PROFILE_PARENT_USER',
        // async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
        //   // console.log(request);
        //   await JwtMiddleware(request, reply);
        //   _done();
        // },
    },

    {
      //RETRIEVE AUTH TOKEN BY TOKEN PROVIDED
      type: ProxyType.NATS,
      httpMethods: ['GET'],
      comment: 'get auth token from token received',
      rules: 'GET-->open',
      prefix: 'auth/token/:token',
      command: 'AUTHTOKEN_BY_TOKEN',
    },

    {
    //RETRIEVE AUTH TOKEN BY TOKEN PROVIDED
    type: ProxyType.NATS,
    httpMethods: ['GET'],
    comment: 'verify that user exists',
    rules: 'GET-->open',
    prefix: 'auth/verif/user/:id',
    command: 'USER_EXISTS',
    },
]

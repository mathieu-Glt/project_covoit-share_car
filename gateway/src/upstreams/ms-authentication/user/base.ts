/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyHttpProxyAlt, FastifyRequestWithContext, NatsProxyAlt, ProxyType } from '@/definitions'
import { FastifyReply } from 'fastify'
import JwtMiddleware from '@/middlewares/Jwt.Middleware'

export const MsAuthUserRoutes: Array<FastifyHttpProxyAlt | NatsProxyAlt> = [
    {
      // GET USER BY ID
      type: ProxyType.NATS,
      httpMethods: ['GET'],
      comment: 'get one user by id',
      rules: 'GET-->open',
      prefix: 'user/:id',
      command: 'GET_USER_BY_ID',
        // async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
        //   await JwtMiddleware(request, reply)
        //   _done()
        // }
    },
   {
      // GET USER BY EMAIL(params)
      type: ProxyType.NATS,
      httpMethods: ['GET'],
      comment: 'get one user by email',
      rules: 'GET-->open',
      prefix: 'user/byEmail/:email',
      command: 'GET_USER_BY_EMAIL',
        // async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
        //   await JwtMiddleware(request, reply);
        //   _done();
        // }
    },
    // {
    //   // SHOW ALL USERS
    //   type: ProxyType.NATS,
    //   httpMethods: ['GET'],
    //   comment: 'show all users',
    //   rules: 'GET-->open',
    //   prefix: 'users',
    //   command: 'INDEX_USERS',
    // },
    {// SHOW ALL USERS BY ASSOCIATION
        type: ProxyType.NATS,
        httpMethods: ['GET'],
        comment: 'show all users by asso ID',
        rules: 'GET-->open',
        prefix: 'users/byAsso/:id',
        command: 'INDEX_USERS_PARENTS_BY_ASSO',
          // async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
          //   await JwtMiddleware(request, reply)
          //   _done()
          // }
    },
    {// SHOW ALL USERS BY ASSOCIATION - TYPE KID
        type: ProxyType.NATS,
        httpMethods: ['GET'],
        comment: 'show all KIDS by asso ID',
        rules: 'GET-->open',
        prefix: 'users/kid/byAsso/:id',
        command: 'INDEX_USERS_KID_BY_ASSO',
          // async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
          //   await JwtMiddleware(request, reply)
          //   _done()
          // }
    },
    {
      //USER INDEX BY GROUP ID
      type: ProxyType.NATS,
      httpMethods: ['GET'],
      comment: 'show all users by group id',
      rules: 'GET-->open',
      prefix: 'users/ByGroup/:id',
      command: 'INDEX_USERS_BY_GROUP',
        // async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
        //   await JwtMiddleware(request, reply)
        //   _done()
        // },
    },
    {// CREATE USER
      type: ProxyType.NATS,
      httpMethods: ['POST'],
      comment: 'create user',
      rules: 'POST-->open',
      prefix: 'users/create',
      command: 'CREATE_USERS',
    },
    {// SHOW USER CONNECTED
      type: ProxyType.NATS,
      httpMethods: ['GET'],
      comment: "show user's data connected",
      rules: 'GET-->open',
      prefix: 'user/show/me',
      command: 'SHOW_ME',
        async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
          await JwtMiddleware(request, reply);
          _done();
        },
    },
    {
      // USER EDITE PROFIL
      type: ProxyType.NATS,
      httpMethods: ['PUT'],
      comment: 'update the user connected',
      rules: 'PUT-->open',
      prefix: 'user/update/me',
      command: 'UPDATE_ME',
        async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
          await JwtMiddleware(request, reply);
          _done();
        },
    },
    {
      // ADMIN EDITE USER
      type: ProxyType.NATS,
      httpMethods: ['PUT'],
      comment: 'update a user by id',
      rules: 'PUT-->open',
      prefix: 'user/update/:id',
      command: 'UPDATE_USER',
        async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
          await JwtMiddleware(request, reply)
        }
    },
    {
      // ADMIN EDITE USER
      type: ProxyType.NATS,
      httpMethods: ['PUT'],
      comment: 'update a user by id',
      rules: 'PUT-->open',
      prefix: 'userAdmin/update/:id',
      command: 'UPDATE_USER_ADMIN',
        async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
          await JwtMiddleware(request, reply)
        }
    },

    { // UPDATE ASSO ROLE USER
        type: ProxyType.NATS,
        httpMethods: ['PUT'],
        comment: 'update a user by id',
        rules: 'PUT-->open',
        prefix: 'user/update/role/:id',
        command: 'UPDATE_USER_ASSO_ROLE',
          // async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
          //   await JwtMiddleware(request, reply)
          //   console.log("je passe par le middle")
          // }
    },
    {// CREATE USER
        type: ProxyType.NATS,
        httpMethods: ['POST'],
        comment: 'email token creation account',
        rules: 'POST-->open',
        prefix: 'email/creation-account',
        command: 'VALIDATE_CREATION_ACCOUNT',
    },
    {
      // DELETE USER
      type: ProxyType.NATS,
      httpMethods: ['DELETE'],
      comment: 'delete a user',
      rules: 'DELETE-->open',
      prefix: 'user/delete/:id',
      command: 'DELETE_USER',
        // async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
        //   await JwtMiddleware(request, reply)
        //   _done()
        // }
    },
    { // UPDATE AND EDITE PARENT PROFIL
      type: ProxyType.NATS,
      httpMethods: ['POST'],
      comment: 'complete the parent profile',
      rules: 'POST-->open',
      prefix: 'user/update-profile/:id',
      command: 'UPDATE_PARENT_PROFILE',
        // async preHandler(request: FastifyRequestWithContext, reply: FastifyReply, _done) {
        //   await JwtMiddleware(request, reply)
        //   _done()
        // }
    },
    {
      //GET KIDS NAME +ID WITH GROUP ID
      type: ProxyType.NATS,
      httpMethods: ['GET'],
      comment: 'get all kids name+id by group id',
      rules: 'GET-->open',
      prefix: 'user/Kidname/ByGroup/:id',
      command: 'GET_KIDNAMES_BY_GROUP',
    },
    {
      //GET KIDS NAME +ID WITH GROUP ID
      type: ProxyType.NATS,
      httpMethods: ['GET'],
      comment: 'get all associations name+id by user id',
      rules: 'GET-->open',
      prefix: 'user/AssociationsName/ByUser/:id',
      command: 'GET_ASSOCIATIONS_NAMES_BY_USER',
    },

]

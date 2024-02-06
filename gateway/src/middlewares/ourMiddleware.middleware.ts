import config from 'config'
import { FastifyRequest, FastifyReply } from 'fastify'
import { verify } from 'jsonwebtoken'

const OurtestMiddleware = (req: FastifyRequest, reply: FastifyReply): Boolean => {
    console.log("req.headers", req.headers)
    const { authorization } = req.headers


    if (authorization) {
        const [authType, token] = authorization.trim().split(' ')
        const verifyToken = verify(token, config.get('JWT_SECRET_KEY'))
        if (verifyToken) {
            pushUser(req, verifyToken, reply)

            return true
        }
    }
    reply.code(401).send({ name: 'Unauthorized', message: 'Missing or wrong JsonWebToken', statusCode: 401, time: Date.now() })
}

const pushUser = (req: FastifyRequest, jwtObject, reply: FastifyReply): void => {
    if (typeof jwtObject.user != 'undefined') {
        //verify status deactivated of the user
        if (jwtObject.user.status === 99) {
            reply.code(401).send({ name: 'Unauthorized', message: 'Missing or wrong JsonWebToken', statusCode: 401, time: Date.now() })
        }
        req.headers['x-gate-user'] = JSON.stringify(jwtObject.user)
    }
}

export default OurtestMiddleware
// import config from 'config';
// import { FastifyRequest, FastifyReply } from 'fastify';
// import { verify } from 'jsonwebtoken';

// const JwtMiddleware = (req: FastifyRequest, reply: FastifyReply): Boolean => {
//   const { authorization } = req.headers;

//   if (authorization) {
//     const [authType, token] = authorization.trim().split(' ');
//     const verifyToken = verify(token, config.get('secretKey'));
//     if (verifyToken) {
//       pushUser(req, verifyToken, reply);

//       return true;
//     }
//   }
//   reply.code(401).send({ name: 'Unauthorized', message: 'Missing or wrong JsonWebToken', statusCode: 401, time: Date.now() });
// };

// const pushUser = (req: FastifyRequest, jwtObject, reply: FastifyReply): void => {
//   if (typeof jwtObject.user != 'undefined') {
//     //verify status deactivated of the user
//     if (jwtObject.user.status === 99) {
//       reply.code(401).send({ name: 'Unauthorized', message: 'Missing or wrong JsonWebToken', statusCode: 401, time: Date.now() });
//     }
//     req.headers['x-gate-user'] = JSON.stringify(jwtObject.user);
//   }
// };

// export default JwtMiddleware;

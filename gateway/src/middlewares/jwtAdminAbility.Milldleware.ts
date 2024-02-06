import { DecodePayloadType, FastifyRequestWithContext } from '@/definitions';
import { AbilityMiddlewareType } from '@/definitions/ability';
import { getCache, permissionExist } from '@/utils/middleware';
import { unauthorizedPayload } from '@/utils/response';
import { FastifyReply } from 'fastify';

const JwtAdminAbilityMiddleware = async (ability: AbilityMiddlewareType, req: FastifyRequestWithContext, reply: FastifyReply) => {

    const decode: DecodePayloadType = await req.jwtVerify();

    if (!decode) {
        reply.code(401).send(unauthorizedPayload('Unauthorized - Missing or wrong JsonWebToken', 'NJTW-G-01'))
        return false;
    }

    const cache = await getCache(`${decode.id}${decode.internalId}`, req, reply)

    if (cache) {
        req.user = cache.user;

        // PATH en attente correction ms-log
        req.user.user = { source: req.user.source };
        req.context.app = {
            appId: cache.app.id,
            clientId: null,
            type: cache.app.type
        }

        return true;
    }
    reply.code(401).send(unauthorizedPayload(`Unauthorized - Cache Not found - request user to sign-in`, 'NPF-G-03'));
    return false;


};


export default JwtAdminAbilityMiddleware;

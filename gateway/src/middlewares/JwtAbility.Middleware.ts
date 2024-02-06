import { DecodePayloadType, FastifyRequestWithContext } from '@/definitions';
import { AbilityMiddlewareType } from '@/definitions/ability';
import { getCache, permissionExist } from '@/utils/middleware';
import { unauthorizedPayload } from '@/utils/response';
import { FastifyReply } from 'fastify';

const JwtAbilityMiddleware = async (ability: AbilityMiddlewareType, req: FastifyRequestWithContext, reply: FastifyReply) => {

  const decode: DecodePayloadType = await req.jwtVerify();

  if (!decode) {
    reply.code(401).send(unauthorizedPayload('Unauthorized - Missing or wrong JsonWebToken', 'NJTW-G-01'))
    return false;
  }

  const cache = await getCache(`${decode.id}${decode.internalId}`, req, reply)

  if (cache) {
    // console.log("🚀 ~ file: JwtAbility.Middleware.ts:19 ~ JwtAbilityMiddleware ~ cache:", cache)
    req.user = cache.user;

    // PATH en attente correction ms-log
    req.user.user = { source: req.user.source };

    const [clientApp] = cache.clients.filter(c => c.id == decode.tokenId);
    if (clientApp) {
      req.context.app = {
        appId: clientApp.appId,
        clientId: clientApp.clientId
      }
      return true;
    }
    reply.code(401).send(unauthorizedPayload(`Unauthorized - No clientApp found`, 'NPF-G-02'));
  } else {
    reply.code(401).send(unauthorizedPayload(`Unauthorized - Cache Not found - request user to sign-in`, 'NPF-G-03'));
  }

  return false;

  // for (const v of clientApp.permissions) {
  //   if (v[1] === ability[1]) {
  //     console.log('subject ok ');
  //     if (v[0] === ability[0]) {
  //       console.log('verbe ok')
  //     }
  //   }
  // }

  //console.log("🚀 ~ file: JwtAbility.Middleware.ts:33 ~ JwtAbilityMiddleware ~ t:", permissionExist(clientApp.permissions, ability[0], ability[1]))
  // req.context.config.ability = ability;
  // if (!permissionExist(cache.permissions, ability[0], ability[1])) {
  //   reply.code(401).send(unauthorizedPayload(`Unauthorized - Not Allow for this action, expected [${ability[0]},${ability[1]}]`, 'NPF-G-01'));
  //   return false;
  // }

};


export default JwtAbilityMiddleware;

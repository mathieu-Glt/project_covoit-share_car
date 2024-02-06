import { FastifyRequestWithContext, orderClientInterface, SignPayload } from '@/definitions';
import { PermissionsType } from '@/definitions/ability';
import { CACHE_SESSION_NAME, SESSION_EXPIRATION } from '@/definitions/cache';
import { addMinutes } from '@/utils/date';
import { FastifyReply } from 'fastify';
import { nanoid } from 'nanoid';
const JwApplyPostHandlerUser = async (req: FastifyRequestWithContext, reply: FastifyReply) => {

  const { tokenPayload, cachePayload } = getPayload(req.context.response, req.ips)
  const expireToken = addMinutes(SESSION_EXPIRATION);
  tokenPayload.clients = await Promise.all(
    tokenPayload.clients.map(async (client) => {
      return {
        ...client,
        //@ts-ignore
        token: await reply.jwtSign({ id: tokenPayload.user.id,internalId: cachePayload.internalId, tokenId: client.id, clientId: client.clientId, appId: client.appId, ips: req.ips }, { expiresIn: "1 day" })
      }
    })
  );
  await req.redis.set(`${CACHE_SESSION_NAME}${cachePayload.id}${cachePayload.internalId}`, JSON.stringify(cachePayload), 'PXAT', addMinutes(SESSION_EXPIRATION).getTime())

  // reply.setCookie('tokens', token, {
  //   domain: 'localhost',
  //   path: '/',
  //   secure: false, // send cookie over HTTPS only
  //   httpOnly: true,
  //   sameSite: true // alternative CSRF protection
  // })


  return {
    //token,
    expireToken,
    ...tokenPayload
  };
};


const setPermissions = (permissions): PermissionsType => {
  return permissions.map((el: any) => {
    return [el.action, el.subject.name]
  })
}

const getPayload = (responseContext: any, ipRemote: string[]): SignPayload => {
  const clients = orderClient(responseContext.clientUsers)
  const  internalId = nanoid(8);
  return {
    tokenPayload: {
      user: {
        id: responseContext.id,
        source: 'user',
        email: responseContext.email,
        //@ts-ignore
        firstname: responseContext.extras.firstname,
        lastname: responseContext.extras.lastname
      },
      clients
    },
    cachePayload: {
      id: responseContext.id,
      internalId,
      user: {
        id: responseContext.id,
        source: 'user',
        email: responseContext.email,
        firstname: responseContext.extras.firstname,
        lastname: responseContext.extras.lastname
      },
      clients,
      ipRemote
    }
  }
}

const orderClient = (clients: []): Array<orderClientInterface> => {
  return clients.map((c: any) => {
    return {
      id: nanoid(6),
      clientId: c.client.id,
      appId: c.client.appId,
      name: c.client.name,
      type: c.type,
      roleId: c.role.id,
      permissions: setPermissions(c.role.permissions)
    }
  })


}


export default JwApplyPostHandlerUser;

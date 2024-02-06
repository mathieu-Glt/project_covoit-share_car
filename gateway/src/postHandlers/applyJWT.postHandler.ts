import { FastifyRequestWithContext,  SignPayload } from '@/definitions';
import { PermissionsType } from '@/definitions/ability';
import { CACHE_SESSION_NAME, SESSION_EXPIRATION } from '@/definitions/cache';
import { addMinutes } from '@/utils/date';
import { FastifyReply } from 'fastify';

const JwApplyPostHandler = async (req: FastifyRequestWithContext, reply: FastifyReply) => {

  const { tokenPayload, cachePayload } = getPayload(req.context.response, req.ips)
  const token = await reply.jwtSign(tokenPayload, { expiresIn: "15m" })
  await req.redis.set(`${CACHE_SESSION_NAME}${cachePayload.id}`, JSON.stringify(cachePayload), 'PXAT', addMinutes(SESSION_EXPIRATION).getTime())

  reply.setCookie('token', token, {
      domain: 'localhost',
      path: '/',
      secure: false, // send cookie over HTTPS only
      httpOnly: true,
      sameSite: true // alternative CSRF protection
    })

  return {
    token,
    expireToken: addMinutes(SESSION_EXPIRATION),
    user: req.context.response
  };
};


const setPermissions = (permissions): PermissionsType => {
console.log("🚀 ~ file: applyJWT.postHandler.ts ~ line 30 ~ setPermissions ~ permissions", permissions)
  return permissions.map((el:any) => {
    return { action: el.action, subject: el.subject.name }
})
}

const getPayload = (responseContext: any, ipRemote: string[]): SignPayload => {
console.log("🚀 ~ file: applyJWT.postHandler.ts ~ line 37 ~ getPayload ~ responseContext", responseContext)

  return {
    tokenPayload: {
      id: responseContext.id,
      role: responseContext.role.name,
      user: {
        id: responseContext.id,
        source: 'admin',
        email: responseContext.email,
        status: responseContext.status
      },
    },
    cachePayload: {
      internalId: '132',
      id: responseContext.id,
      role: responseContext.role.name,
      permissions: setPermissions(responseContext.role.permissions),
      ipRemote,
    }
  }
}


export default JwApplyPostHandler;

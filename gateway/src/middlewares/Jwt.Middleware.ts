import { DecodePayloadType, FastifyRequestWithContext } from '@/definitions'
import { FastifyReply } from 'fastify'
import { CACHE_SESSION_NAME } from '@/definitions/cache'

const JwtMiddleware = async (req: FastifyRequestWithContext, reply: FastifyReply) => {
  console.log("🚀 ~ JwtMiddleware ~ req:", req.headers.authorization)
  // jeton du front ds les headers
  // const accessToken = req.headers.authorization
  
  // console.log("🚀 ~ file: Jwt.Middleware.ts:7 ~ JwtMiddleware ~ accessToken:", accessToken)
  const decode: DecodePayloadType = await req.jwtVerify()
  console.log("🚀 ~ file: Jwt.Middleware.ts:10 ~ JwtMiddleware ~ decode:", decode)
  // const decode: DecodePayloadType = await req.jwtVerify(token, accessToken)
  if (!decode) reply.code(401).send({ statusCode: 401, time: Date.now(), errors: { message: 'Unauthorized - Missing or wrong JsonWebToken', code: 'NJTW-G-01' } })
  console.log("message as message")

  //await cacheExist(decode.id, req, reply)
  req.headers['x-gate-user'] = JSON.stringify(decode)

  return true

}


const cacheExist = async (key: string, req: FastifyRequestWithContext, reply: FastifyReply): Promise<boolean> => {
  const cache = await req.redis.get(`${CACHE_SESSION_NAME}${key}`)
  if (!cache) reply.code(401).send({ statusCode: 401, time: Date.now(), errors: { message: 'Unauthorized - JsonWebToken issue please signin again', code: 'NC-G-01' } })
  return true
}




export default JwtMiddleware
